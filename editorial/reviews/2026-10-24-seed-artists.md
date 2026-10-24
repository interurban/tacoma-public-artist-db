# Repository design and first two artist drafts

## Owner request

> start with the repo design; create a new public repo called Tacoma Public Artist DB and add in two artists, build out the readme and agents instrucitons so people can ask their agent to update

The owner also selected **CC0 for data**; code/documentation use MIT.

## What changed

A separate public data repository, named `tacoma-public-artist-db`, with one JSON file per artist/space, versioned JSON Schema, controlled vocabularies, a validator, CI, contribution instructions, an agent prompt, an agent operating guide, a PR template and code-owner routing. Jessica Spring and Dionne Bonner are the first two draft records. This does not implement the full [PRD](https://github.com/interurban/tacoma-irl-astro/issues/152) or change Tacoma IRL's website.

## Evidence

| Entry / decision | Primary source | Supports / check |
| --- | --- | --- |
| Jessica Spring | [Springtide Press portfolio](https://springtidepress.com/portfolio/) | Name, letterpress and artist books; checked October 24, 2026. “One Liners” identifies Jessica Spring as printer; “Sukoshi” names her typesetting work. |
| Jessica Spring | [Springtide Press printshop](https://springtidepress.com/printshop/) | Tacoma location; letterpress, bookmaking and relief-printing practice; checked October 24, 2026. |
| Dionne Bonner | [Artist's about page](https://www.dionnebonner.com/about/) | Painting, Tacoma public mural practice, South Tacoma Library and Tollefson Plaza projects; checked October 24, 2026. |
| Dionne Bonner | [Artist's homepage](https://www.dionnebonner.com/) | Website ownership/context and named public art projects; checked October 24, 2026. |
| Data license | Owner's selection in this conversation; [CC0 legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en) | CC0 data; scope excludes rights in external sites and imagery. |
| Schema validation | [Ajv JSON Schema documentation](https://ajv.js.org/json-schema.html) | Separate 2020-12 validator import and standard schema keywords; consulted October 24, 2026. |
| Secondary sources | None used in records | Discovery results were not copied into artist records. |

## Judgment calls

- Two artists with readable first-party sources demonstrate different mediums. Their short descriptions are original factual summaries, not copied statements. No artist claims endorsement or a firsthand visit.
- The current request authorizes a public repo with two entries. It does not supply artist listing permission; both records stay draft and that limitation is explicit in README and this note. Draft data is nevertheless public on GitHub.
- `neighborhood` is null for both artists, and Dionne's visit policy is null. Jessica's printshop page explicitly invites individual/small-group visitors to arrange a tour, supporting `by-appointment`. Historic tour participation and public artwork locations cannot establish current studio access or neighborhood. `last_verified` records today's source review, not direct contact or consent.
- Artist street addresses are excluded entirely; a future confirmed public studio uses a separate space record. No photos, social handles, emails, phone numbers or home locations are added.
- Eight broad Tacoma areas form an initial vocabulary, rather than attempting to settle every informal district boundary. Neither artist is assigned an area without evidence.
- Published records require primary evidence and maintainer permission review. CI validates structure and history; separate GitHub branch protection requires review and passing checks, with the owner retaining administrator bypass.

## Left out

- The City Studio Tour dataset and its media were not imported or relicensed. The first-party summaries stand on their own.
- Jessica Spring's `/about/` URL was not accessible through the research tool; the printshop and portfolio pages supplied the facts actually used.
- No code or content in the Tacoma IRL repository is changed. There is no site deployment, application backend, web intake form, automated confirmation mail, exact-location map or monthly report.
- No messages were sent to either artist. Their listing permissions and preferred public neighborhood remain unresolved; Dionne's current studio access is also unconfirmed.

## Verification and hosting

- Public repository created: [interurban/tacoma-public-artist-db](https://github.com/interurban/tacoma-public-artist-db), default branch `main`. The initial commit contains the project description and approved licenses. The full design and seeds are submitted together for review on `feat/repository-foundation`.
- `npm ci --ignore-scripts`: pass using the generated lockfile; 6 packages installed, audit reported no known vulnerabilities at setup.
- `npm run verify`: pass, both real entries validate and all 14 regression cases pass. Tests cover date boundaries, unknown access, address restrictions, source evidence, relationship visibility and identity retention. Test inputs are synthetic and stay outside the data directory; tests do not freeze the number or publication state of real records.
- `npm run validate -- --base origin/main`: pass. The same base comparison runs on GitHub PRs.
- `git diff --check`: pass. Markdown relative links checked locally. No image assets or private contact details were added.
- Local runtime: Node 25.9.0; the committed `.nvmrc` and GitHub workflow target Node 24. Target-runtime CI evidence and branch-protection settings are recorded below after the PR runs.
- The first local schema compile exposed Ajv strict-mode requirements; explicit string types and conditional address-property definitions resolved them. The final suite above passed. Network downloads and Node child-process checks required running outside the local sandbox; no access token was printed or committed.

No website Workers Builds check is expected: this is a standalone data repository using its own GitHub Actions workflow. There is no site build or website deployment to verify.

## Hosted setup

- [PR #1](https://github.com/interurban/tacoma-public-artist-db/pull/1) contains the full foundation and both artist drafts. It is left open for owner review; nothing is merged or promoted.
- `main` protection was applied and read back successfully: strict/up-to-date `Validate data` status, one approval, code-owner review, stale-review dismissal and resolved conversations. Force pushes and deletion are disabled. Administrator enforcement remains off, intentionally retaining James's bypass in this single-maintainer repository; agents are forbidden from using it without explicit merge authorization.
- `CODEOWNERS` is in the foundation PR and begins supplying code-owner matching after it reaches `main`. The initial owner-authored PR cannot receive a self-approval; a future owner-authorized merge would need the administrator bypass or an independent reviewer. No additional reviewer was invented or assigned.
- [Initial GitHub Actions run](https://github.com/interurban/tacoma-public-artist-db/actions/runs/40121642621): passed on Node 24.21.0 / npm 11.19.0. Logs confirm both entries validated, all 14 tests passed and the real PR-base history check passed. That run warned about the old runtime used by action v4; the final workflow pins the current official Node 24 actions by immutable commit: [checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) and [setup-node v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0). Final-head CI is checked on the PR after that workflow update.

## Follow-up: inspect two real artist records

> okay now put two artists in the db so i can see how its structured. research 2 well known/documented via their webpage tacoma ppl

The two researched drafts were already in the setup branch; the unmerged PR explains why they were absent from the default branch. The follow-up retains those two artists and stable slugs, reopens every cited official page, and fills in additional supported structure without adding duplicate records.

| Entry | Primary evidence rechecked October 24, 2026 | Structured addition |
| --- | --- | --- |
| Jessica Spring | [Printshop: Shop Visits and Workshops](https://springtidepress.com/printshop/); [portfolio](https://springtidepress.com/portfolio/) | The operator invites individual/small-group visitors to make arrangements for a tour, supporting `visit_policy: by-appointment`; workshops can be arranged, supporting the `workshops` focus tag. Adds labeled portfolio and studio information links. No walk-in availability or specific appointment is claimed. |
| Dionne Bonner | [Artist about/history](https://www.dionnebonner.com/about/); [homepage](https://www.dionnebonner.com/) | Adds the artist biography/history link and `studio_tour_years: [2018]` from the explicitly dated Tacoma Studio Tours wood-print-transfer demonstration. The year is historical participation, not current access or a future tour commitment. |
| Secondary sources | None used | Both entries stand on the artists' own webpages. |

The README now explains the field order and points directly to both JSON records. Source evidence is linked per field; neither record contains an address, guessed neighborhood or copied biography. Source and full-record check dates remain October 24 because the recheck happened the same day. Both statuses remain draft; merging repository files does not assert artist consent or publish profiles on Tacoma IRL.

The owner explicitly authorized the repository merge: **“Yes, merge setup PR #1.”** The final local validation of both enriched records, all 14 regression cases, PR-base history check and `git diff --check` passed. The final-head GitHub check and merge result are recorded on PR #1. This authorization applies to merging the data repository, not changing either artist's draft status or deploying the Tacoma IRL website.
