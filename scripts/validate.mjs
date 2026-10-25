import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { basename, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export const root = fileURLToPath(new URL('../', import.meta.url));
const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
ajv.addSchema(await readJSON(join(root, 'schema/vocabularies.json')));
const validateSchema = ajv.compile(await readJSON(join(root, 'schema/entry.schema.json')));
export const pacificToday = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const part = key => parts.find(p => p.type === key).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
};

export function validateEntry(entry, filename, today = pacificToday()) {
  if (!validateSchema(entry)) {
    return validateSchema.errors.map(error => `${error.instancePath || '/'} ${error.message} ${JSON.stringify(error.params)}`);
  }
  const errors = [];
  if (basename(filename) !== `${entry.slug}.json`) errors.push('/slug must match the filename');
  if (entry.last_verified > today) errors.push('/last_verified cannot be in the future (Pacific date)');
  for (const [i, source] of entry.sources.entries()) {
    if (source.checked_on > today) errors.push(`/sources/${i}/checked_on cannot be in the future`);
  }
  // last_verified is a complete record check, not the date one field was edited.
  if (entry.sources.some(source => source.checked_on < entry.last_verified)) {
    errors.push('/last_verified cannot be newer than any supporting source check; recheck every source first');
  }
  const inspectURLs = value => {
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      const url = new URL(value);
      if (url.username || url.password) errors.push('URLs must not contain credentials');
      if (url.search) errors.push('URLs must not contain query parameters; use a public canonical URL');
      if (url.hostname === 'localhost' || url.hostname.endsWith('.local') || url.hostname.includes(':') || /^[\d.]+$/.test(url.hostname)) {
        errors.push('URLs must use public hostnames');
      }
    } else if (Array.isArray(value)) value.forEach(inspectURLs);
    else if (value && typeof value === 'object') Object.values(value).forEach(inspectURLs);
  };
  inspectURLs(entry);
  if (entry.status === 'published' && !entry.sources.some(s => s.kind === 'primary')) {
    errors.push('/sources published entries need a primary source');
  }
  if (entry.type === 'artist' && entry.mediums.length === 0) errors.push('/mediums artists need at least one confirmed medium');
  if (entry.type !== 'artist' && (entry.space_slugs?.length ?? 0) > 0) errors.push('/space_slugs is only for artist entries');
  if (entry.social_links) {
    if (!entry.sources.some(s => s.kind === 'primary' && s.supports.includes('social_links'))) errors.push('/social_links needs primary evidence');
    const socialURLs = [entry.instagram, ...entry.social_links.map(link => link.url)].filter(Boolean);
    const normalizedSocialURLs = socialURLs.map(value => {
      const url = new URL(value);
      url.pathname = url.pathname.replace(/\/+$/, '');
      return url.href;
    });
    if (new Set(normalizedSocialURLs).size !== normalizedSocialURLs.length) errors.push('/instagram and /social_links must not duplicate a URL');
  }
  if (entry.profile) {
    if (entry.type !== 'artist') errors.push('/profile is only for artist entries');
    if (entry.profile.updated_at > today) errors.push('/profile/updated_at cannot be in the future');
    if (!entry.sources.some(s => s.kind === 'primary' && s.supports.includes('profile.biography'))) errors.push('/profile/biography needs primary evidence');
    for (const [i, work] of (entry.profile.selected_work ?? []).entries()) {
      if (!entry.sources.some(s => s.kind === 'primary' && s.url === work.url && s.supports.includes('profile.selected_work'))) errors.push(`/profile/selected_work/${i} needs matching primary evidence`);
    }
  }
  if (entry.public_address && !entry.sources.some(s => s.kind === 'primary' && s.url === entry.public_address.source_url && s.supports.includes('public_address'))) {
    errors.push('/public_address needs a matching primary source supporting public_address');
  }
  // Practice detail fields describe the artist, not the artist's location or current availability.
  for (const field of ['practice_name', 'education', 'awards', 'affiliations', 'public_works', 'news_url']) {
    if (entry[field] !== undefined && !entry.sources.some(s => s.kind === 'primary' && s.supports.includes(field))) errors.push(`/${field} needs primary evidence`);
  }
  if (entry.type !== 'artist') {
    for (const field of ['practice_name', 'education', 'awards', 'public_works']) {
      if (entry[field] !== undefined) errors.push(`/${field} is only for artist entries`);
    }
  }
  const currentYear = Number(today.slice(0, 4));
  for (const [field, items] of [['education', entry.education], ['awards', entry.awards], ['public_works', entry.public_works]]) {
    for (const [index, item] of (items ?? []).entries()) {
      if (item.year !== undefined && item.year > currentYear) errors.push(`/${field}/${index}/year cannot be in the future`);
    }
  }
  return errors;
}

export function validateRelationships(entries) {
  const errors = [];
  const bySlug = new Map(entries.map(e => [e.slug, e]));
  if (bySlug.size !== entries.length) errors.push('duplicate slugs');
  for (const entry of entries) {
    for (const slug of entry.space_slugs ?? []) {
      const space = bySlug.get(slug);
      if (!space || space.type === 'artist') errors.push(`${entry.slug}: /space_slugs/${slug} must reference an existing space`);
      else if (entry.status === 'published' && !entry.archived && (space.status !== 'published' || space.archived)) {
        errors.push(`${entry.slug}: /space_slugs/${slug} must reference a published, active space`);
      }
    }
  }
  return errors;
}

export function validateHistory(previousEntries, entries) {
  const errors = [];
  const current = new Map(entries.map(e => [e.slug, e]));
  for (const old of previousEntries) {
    const entry = current.get(old.slug);
    if (!entry) errors.push(`${old.slug}: retain the file and slug; use archived: true instead of deleting or renaming`);
    else {
      if (old.status === 'published' && entry.status !== 'published') errors.push(`${old.slug}: retain published status; archive instead`);
      if (entry.last_verified < old.last_verified) errors.push(`${old.slug}: last_verified must not move backwards`);
      if (old.profile && entry.profile && entry.profile.updated_at < old.profile.updated_at) errors.push(`${old.slug}: profile.updated_at must not move backwards`);
    }
  }
  return errors;
}

export async function loadEntries(directory = join(root, 'artists')) {
  const files = (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
  const entries = [];
  const errors = [];
  for (const file of files) {
    if (!file.isFile() || !file.name.endsWith('.json')) {
      errors.push(`artists/${file.name}: expected one JSON file per entry; directories and symlinks are not allowed`);
      continue;
    }
    try {
      const entry = await readJSON(join(directory, file.name));
      const issues = validateEntry(entry, file.name);
      errors.push(...issues.map(error => `artists/${file.name}: ${error}`));
      if (issues.length === 0) entries.push(entry);
    } catch (error) {
      errors.push(`artists/${file.name}: ${error.message}`);
    }
  }
  if (files.length === 0) errors.push('artists/: no entries found');
  return { entries, errors };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== '--base' || !/^[a-zA-Z0-9][a-zA-Z0-9_./-]*$/.test(args[1]))) {
    throw new Error('Usage: npm run validate -- [--base origin/main]');
  }
  const { entries, errors } = await loadEntries();
  errors.push(...validateRelationships(entries));
  if (args[0] === '--base') {
    const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
    const files = git(['ls-tree', '-r', '--name-only', args[1], '--', 'artists/']).trim().split('\n').filter(Boolean);
    const previous = files.map(file => JSON.parse(git(['show', `${args[1]}:${file}`])));
    errors.push(...validateHistory(previous, entries));
  }
  if (errors.length) {
    process.stderr.write(`${errors.join('\n')}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`Validated ${entries.length} entries, vocabularies, source dates and relationships.\n`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(error => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
