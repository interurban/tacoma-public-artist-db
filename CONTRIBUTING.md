# Add or update an entry

You can contribute through GitHub's browser editor or ask a coding agent to do it. Every change is proposed in a pull request and reviewed by James (`@interurban`). Being listed and proposing a correction are free.

## Before you start

Search [artists/](artists/) for the name and website. Update the existing file if there is one. The filename and `slug` stay the same even when an artist changes their display name. Choose a descriptive lowercase, hyphenated slug only for a genuinely new entry; it must be unique across artists and spaces.

Read [AGENTS.md](AGENTS.md) if an agent is doing the work and [docs/data-model.md](docs/data-model.md) for field definitions. There is no account registration, “claim profile” process or automated listing update. Submission through GitHub proposes a change; it does not publish one automatically.

## In your browser

1. Sign in to GitHub and open the existing JSON file. Select the pencil button. For a new record, use **Add file → Create new file** under `artists/`, copying the shape of a seed record and replacing its facts and sources.
2. Change only the relevant fields. JSON strings use double quotes. Use `null` for unconfirmed neighborhood/visit policy and omit optional unconfirmed fields. New entries use `status: "draft"` and `archived: false`.
3. Add the official public source for each change to `sources`. For social profiles, use only URLs linked from the artist's official site; prefer `social_links` with a platform label, never guess handles, and add `social_links` to the source's `supports`. Avoid duplicating an existing `instagram` URL. The same rule applies to `practice_name`, `education`, `awards`, `affiliations`, `public_works` and `news_url`: add the field name to the source's `supports`, omit anything the artist or institution does not publish, and omit a year when a source gives a range or two sources disagree. A `public_works.place` is the artwork's public site, not the artist's studio, and a temporary or ended work carries `temporary: true`. Do not copy someone else's biography; write a brief factual description in your own words. Use the date you actually checked the page for `checked_on`. Advance `last_verified` only when you rechecked the full entry.
4. Choose **Propose changes** and **Create pull request**. GitHub may create a fork first. Fill in the evidence table and state whether you are the artist/operator or another contributor. A reviewer will follow up if anything is missing.

No GitHub account? Email public corrections and their source links to [hello@tacomairl.com](mailto:hello@tacomairl.com). An agent must not send that email for you unless you explicitly ask it to. There is no promised response time or automatic email confirmation.

## With an agent or local checkout

Give your agent the [README prompt](README.md#ask-your-agent), the artist's name, official source URLs and what needs changing. An agent should read the repo instructions before it edits anything.

If you have write access:

```sh
git clone https://github.com/interurban/tacoma-public-artist-db.git
cd tacoma-public-artist-db
git fetch origin
git switch -c update/artist-name origin/main
```

Without write access, fork through GitHub first and clone your fork. Configure the original as `upstream`, fetch it, and branch from `upstream/main` so you start from current data. Push the topic branch to your fork and open the PR against the original repository's `main` branch. Use Node 24 and run:

```sh
npm ci --ignore-scripts
npm run verify
git diff --check
```

Also run `npm run validate -- --base origin/main` for a direct checkout, or `--base upstream/main` for a fork. Stage only the changed entry and any necessary review note. Inspect the staged diff before committing. Never commit tokens, `.env` files, private messages or personal contact information.

## Evidence and consent

Primary sources are the artist's own site, the space operator's site or the responsible public institution's page. Secondary coverage can add context, but published records need primary evidence. A source must explicitly support the fact; attendance at an old studio tour does not establish current opening hours or public access.

`last_verified` means a source check, not artist approval. New seed entries remain draft until James has reviewed the facts and confirmed listing permission with the artist/operator. Evidence of consent can be acknowledged in the PR without publishing the correspondence or private contact information. Self-submissions are reviewed too; do not treat an agent's assertion of identity as proof.

Contribute only data you may dedicate under CC0, and code/docs you may license under MIT. Keep source URLs, but do not copy protected site descriptions or imagery. No images are supported in this first schema. All draft records and review notes are public, including through Git history.

## Review and merge

The `Validate data` job checks all entries on PRs and `main` pushes. It uses read-only permissions and does not access secrets or deploy anything. It also compares entries with the PR base to catch deleted/renamed records, demotion of published entries and backwards verification dates. Fix validation errors before asking for merge.

James reviews the sources, rights, neighborhood assignment, address/public-space evidence and any listing permission. Automated checks cannot prove these facts. Only James approves changing `status` from `draft` to `published`. Once published, retirement uses `archived: true`, preserving the identifier and any future URL. Privacy removal is a separate maintainer process, because archiving cannot erase public history.

`main` branch protection requires an up-to-date `Validate data` check, one approving review, code-owner review and resolved conversations. New commits dismiss stale approvals; force pushes and branch deletion are blocked. `CODEOWNERS` identifies James and takes effect once the foundation PR lands on `main`. The owner retains GitHub's administrator bypass so a single maintainer can handle their own changes; agents must never use that bypass to merge without the owner's explicit authorization. No bot auto-merges are configured. The [setup review](editorial/reviews/2026-10-24-seed-artists.md) records the settings checked on October 24, 2026.

Keep schema, vocabulary and workflow changes separate from ordinary artist updates. New vocabulary terms need a reason and maintainer review. New fields need updated documentation, validation and useful regression tests. Unknown information is a reason to leave a blank, not add a guessed term.

If facts are disputed, explain the discrepancy with public evidence in the PR. If the dispute involves personal information or a sensitive removal request, email James privately instead of opening a public issue. No response-time guarantee is made.
