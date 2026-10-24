# Official social links for published artist records

## Owner request

> Add verified social links for the two published artists. Use existing `instagram` and `other_links` fields, no schema changes: `instagram` for official Instagram account, `other_links` with labels like Tumblr/Facebook for other artist-owned social profile URLs. Fetch latest main/create new topic branch first, read AGENTS/CONTRIBUTING/data model. Research each official website with web tool; use only outbound official links, never guess handles. Spring https://springtidepress.com/printshop/ explicitly links Tumblr and Instagram in Follow footer. Dionne https://www.dionnebonner.com/ may have socials as icons. If no verifiable link for Dionne, omit and report. For URLs blocked by social host, cite verified official outbound link, state couldn't inspect account. Preserve statuses, dates/profile.updated_at unless substantively editing biography; partial source checks don't move last_verified. Add review note quoting current user request, evidence by field, original author relationship unknown/contributor. Update data-model/AGENTS brief instructions for socials using existing fields if useful, not schema. Run existing verify/history/whitespace, commit/push and OPEN PR, do not merge. Use Node24 /tmp/tirl-node24/node_modules/.bin PATH. Report exact proposed commit to pin website. Current user also asks fields we can populate; report grounded suggestions from primary pages, don't add unrelated data.

## What changed

Jessica Spring's published record now has explicit Instagram and Tumblr entries in the new `social_links` field. The homepage on Springtide Press's official site links to both. No social profile link was found on Dionne Bonner's official homepage, so her record is unchanged. The data model, contributor guidance, schema, and validator now describe and enforce evidence for explicit social links. `instagram` remains supported for compatibility with existing consumers.

## Evidence

| Artist / field | Primary source checked October 24, 2026 | Evidence and use |
| --- | --- | --- |
| Jessica Spring / `social_links` | [Springtide Press: printshop](https://springtidepress.com/printshop/) | The official site's Follow footer links to Instagram at `https://instagram.com/springtidepress` and [Springtide Press on Tumblr](https://springtidepress.tumblr.com/). Stored both under explicit platform labels. Both social hosts failed direct fetch, so only the official outbound links were verified. |
| Dionne Bonner / social fields | [Dionne Bonner Art & Design: homepage](https://www.dionnebonner.com/) | The fetched official homepage's exposed text and navigation contained no social profile URL. No account was guessed and no link was added. The site's protected content/footer may hide icon-only links from text extraction, so no social account could be verified from this inspection. |
| Secondary sources | None | No secondary sources used. |

## Judgment calls and unresolved items

- The owner updated the implementation contract during this task to use an additive explicit `social_links` field, retaining legacy `instagram` compatibility and forbidding duplicate account URLs across those fields. This supersedes the original request's no-schema-change approach.
- The requester's relationship to either artist is unknown; this is a contributor update, not a self-submission or artist-confirmed update.
- The official-site outbound links establish the linked account URLs, but the social accounts themselves could not be inspected because both hosts failed direct fetch.
- No status, `last_verified`, `profile.updated_at`, biography, source-check date, or identity field was changed. The Springtide source row already had the current check date.
- Dionne's record can be updated if an official site page exposes a verifiable social-profile link.

## Verification

- `PATH=/tmp/tirl-node24/node_modules/.bin:$PATH npm run verify` — passed (record validation and all regression tests).
- `PATH=/tmp/tirl-node24/node_modules/.bin:$PATH npm run validate -- --base origin/main` — passed against the updated `origin/main` at `c9f123b43ef74420620ece01b32b72696c5a8466`.
- `git diff --check` — passed.
