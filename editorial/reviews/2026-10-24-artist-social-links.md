# Official social links for published artist records

## User request

> what else could we feature in the artist profile? I don't think "interests" is the right term, let's add their social links. what else based on what we can populate into our db? also remove the last updated at the bottom

## What changed

Jessica Spring's published record now has explicit Instagram and Tumblr entries in the new `social_links` field. The printshop page on Springtide Press's official site links to both. No social profile link was visible in the fetched text/navigation of Dionne Bonner's official homepage, so her record is unchanged. The data model, contributor guidance, schema, and validator now describe and enforce evidence for explicit social links. `instagram` remains supported for compatibility with existing consumers. The companion website change handles the profile wording and footer request.

## Evidence

| Artist / field | Primary source checked October 24, 2026 | Evidence and use |
| --- | --- | --- |
| Jessica Spring / `social_links` | [Springtide Press: printshop](https://springtidepress.com/printshop/) | The official site's Follow footer links to Instagram at `https://instagram.com/springtidepress` and [Springtide Press on Tumblr](https://springtidepress.tumblr.com/). Stored both under explicit platform labels. Both social hosts failed direct fetch, so only the official outbound links were verified. |
| Dionne Bonner / social fields | [Dionne Bonner Art & Design: homepage](https://www.dionnebonner.com/) | The fetched official homepage's exposed text and navigation contained no social profile URL. No account was guessed and no link was added. The site's protected content/footer may hide icon-only links from text extraction, so no social account could be verified from this inspection. |
| Secondary sources | None | No secondary sources used. |

## Judgment calls and unresolved items

- We chose a new explicit `social_links` field to separate artist identity links from portfolio, shop, and source links. It retains legacy `instagram` compatibility and forbids duplicate account URLs across those fields. This is an implementation choice, not a user-directed schema change.
- The requester's relationship to either artist is unknown; this is a contributor update, not a self-submission or artist-confirmed update.
- The official-site outbound links establish the linked account URLs, but the social accounts themselves could not be inspected because both hosts failed direct fetch.
- No status, `last_verified`, `profile.updated_at`, biography, source-check date, or identity field was changed. The Springtide source row already had the current check date.
- Dionne's record can be updated if an official site page exposes a verifiable social-profile link.

## Verification

- `PATH=/tmp/tirl-node24/node_modules/.bin:$PATH npm run verify` — passed (record validation and all regression tests).
- `PATH=/tmp/tirl-node24/node_modules/.bin:$PATH npm run validate -- --base origin/main` — passed against the updated `origin/main` at `c9f123b43ef74420620ece01b32b72696c5a8466`.
- `git diff --check` — passed.
