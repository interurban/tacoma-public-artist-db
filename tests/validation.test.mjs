import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root, validateEntry, validateRelationships, validateHistory, loadEntries, pacificToday } from '../scripts/validate.mjs';

// Synthetic validator input only; not an artist listing or a claim of research.
// Keep regression cases independent of contributors' real records and check dates.
const seed = {
  schema_version: 1,
  name: 'Schema test input',
  slug: 'schema-test-input',
  type: 'artist',
  status: 'draft',
  archived: false,
  mediums: ['painting'],
  neighborhood: null,
  visit_policy: null,
  location_public: false,
  last_verified: '2026-10-24',
  sources: [{ url: 'https://example.org/', label: 'Synthetic test evidence', kind: 'primary', supports: ['name', 'mediums'], checked_on: '2026-10-24' }]
};
const today = '2026-10-24';
const changed = patch => ({ ...structuredClone(seed), ...patch });
const errors = entry => validateEntry(entry, `${entry.slug}.json`, today);

test('all repository records validate without fixing their count or publication state', async () => {
  const { entries, errors: issues } = await loadEntries();
  assert.deepEqual(issues, []);
  assert.ok(entries.length > 0);
});

test('unknown access stays distinct from a confirmed closed-to-public policy', () => {
  assert.deepEqual(errors(changed({ visit_policy: null })), []);
  assert.deepEqual(errors(changed({ visit_policy: 'not-open-to-public' })), []);
  assert.ok(errors(changed({ visit_policy: 'probably-open' })).some(e => e.includes('/visit_policy')));
});

test('artist records reject street addresses even if someone marks them public', () => {
  const address = { street: 'Example only', city: 'Tacoma', region: 'WA', postal_code: '98402', country: 'US', source_url: 'https://example.org/' };
  for (const location_public of [false, true]) {
    assert.ok(errors(changed({ location_public, public_address: address })).length > 0);
  }
  assert.ok(errors(changed({ address: 'Do not store this' })).some(e => e.includes('additional')));
  assert.ok(errors(changed({ email: 'private@example.org' })).some(e => e.includes('additional')));
});

test('a public space address needs explicit primary evidence and a public flag', () => {
  const space = changed({ type: 'studio', location_public: true });
  assert.ok(errors(space).some(e => e.includes('public_address')));
  space.public_address = { street: 'Example only', city: 'Tacoma', region: 'WA', postal_code: '98402', country: 'US', source_url: seed.sources[0].url };
  assert.ok(errors(space).some(e => e.includes('matching primary source')));
  space.sources[0].supports.push('public_address');
  assert.deepEqual(errors(space), []);
  space.location_public = false;
  assert.ok(errors(space).length > 0);
});

test('dates reject impossible and future days and cannot fake a full-record refresh', () => {
  assert.ok(errors(changed({ last_verified: '2026-02-30' })).length > 0);
  assert.ok(errors(changed({ last_verified: '2026-10-25' })).some(e => e.includes('future')));
  const futureSource = changed({});
  futureSource.sources[0].checked_on = '2026-10-25';
  assert.ok(errors(futureSource).some(e => e.includes('future')));
  const oldSource = changed({});
  oldSource.sources[0].checked_on = '2026-10-23';
  assert.ok(errors(oldSource).some(e => e.includes('recheck every source')));
  assert.deepEqual(errors(changed({ last_verified: '2026-10-23' })), []);
});

test('Pacific source dates handle UTC midnight and daylight saving boundaries', () => {
  assert.equal(pacificToday(new Date('2026-10-25T00:30:00Z')), '2026-10-24');
  assert.equal(pacificToday(new Date('2026-11-01T08:30:00Z')), '2026-11-01');
  assert.equal(pacificToday(new Date('2026-11-01T09:30:00Z')), '2026-11-01');
});

test('vocabularies, plain-text limits and artist medium requirements are enforced', () => {
  for (const patch of [{ mediums: ['telepathy'] }, { neighborhood: 'seattle' }, { focus_tags: ['viral'] }, { short_bio: '<script>alert(1)</script>' }, { short_bio: 'x'.repeat(301) }, { mediums: [] }]) {
    assert.ok(errors(changed(patch)).length > 0);
  }
  assert.deepEqual(errors(changed({ type: 'gallery', mediums: [] })), []);
});

test('links reject executable schemes, credentials, private hosts and query strings', () => {
  for (const website of ['javascript:alert(1)', 'https://user:secret@example.org/', 'http://localhost/', 'http://127.0.0.1/', 'https://example.org/?token=secret']) {
    assert.ok(errors(changed({ website })).length > 0, website);
  }
});

test('published entries need primary evidence', () => {
  const entry = changed({ status: 'published' });
  entry.sources.forEach(source => { source.kind = 'secondary'; });
  assert.ok(errors(entry).some(e => e.includes('primary source')));
});

test('optional profiles require original plain text, real dates and primary evidence for selected work', () => {
  const entry = changed({ profile: { biography: ['Synthetic biography, not a real artist statement.'], updated_at: today, selected_work: [{ title: 'Synthetic work', summary: 'Synthetic test summary.', url: 'https://example.org/' }] } });
  assert.ok(errors(entry).some(e => e.includes('biography needs primary evidence')));
  entry.sources[0].supports.push('profile.biography');
  assert.ok(errors(entry).some(e => e.includes('selected_work')));
  entry.sources[0].supports.push('profile.selected_work');
  assert.deepEqual(errors(entry), []);
  entry.profile.biography = ['<p>Not plain text</p>'];
  assert.ok(errors(entry).length > 0);
  entry.profile.biography = ['Synthetic biography.'];
  entry.profile.updated_at = '2026-10-25';
  assert.ok(errors(entry).some(e => e.includes('future')));
  entry.profile.updated_at = today;
  entry.profile.selected_work[0].url = 'https://example.org/unconfirmed';
  assert.ok(errors(entry).some(e => e.includes('matching primary')));
  entry.profile.selected_work = [];
  assert.deepEqual(errors(entry), []);
});

test('filenames stay aligned with slugs', () => {
  assert.ok(validateEntry(seed, 'someone-else.json', today).some(e => e.includes('filename')));
});

test('space links cannot point to missing entries or other artists', () => {
  assert.ok(validateRelationships([changed({ space_slugs: ['missing'] })]).length > 0);
  assert.ok(validateRelationships([changed({ space_slugs: [seed.slug] })]).length > 0);
  assert.ok(validateRelationships([seed, seed]).some(e => e.includes('duplicate')));
});

test('published active artists cannot expose draft or archived spaces', () => {
  const artist = changed({ status: 'published', space_slugs: ['public-studio'] });
  const space = changed({ type: 'studio', slug: 'public-studio' });
  assert.ok(validateRelationships([artist, space]).length > 0);
  space.status = 'published';
  assert.deepEqual(validateRelationships([artist, space]), []);
  space.archived = true;
  assert.ok(validateRelationships([artist, space]).length > 0);
});

test('history prevents deletions, slug changes, published demotion and date rollback', () => {
  assert.ok(validateHistory([seed], []).length > 0);
  assert.ok(validateHistory([seed], [changed({ slug: 'new-slug' })]).length > 0);
  const published = changed({ status: 'published' });
  assert.ok(validateHistory([published], [seed]).length > 0);
  assert.ok(validateHistory([seed], [changed({ last_verified: '2026-10-23' })]).length > 0);
  assert.deepEqual(validateHistory([published], [{ ...published, archived: true }]), []);
  assert.deepEqual(validateHistory([seed], [changed({ name: 'New display name' })]), []);
});

test('malformed files and symlinked records fail validation instead of being skipped', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'artist-validation-'));
  try {
    await writeFile(join(directory, 'broken.json'), '{bad json');
    await symlink(join(root, 'artists/jessica-spring.json'), join(directory, 'linked.json'));
    const { errors: issues } = await loadEntries(directory);
    assert.ok(issues.some(e => e.includes('broken.json')));
    assert.ok(issues.some(e => e.includes('linked.json') && e.includes('symlinks')));
  } finally {
    await rm(directory, { recursive: true });
  }
});
