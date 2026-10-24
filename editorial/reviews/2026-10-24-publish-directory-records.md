# Publish the two initial directory records

## Owner request

> Publish both records in the directory

This was James's explicit response to whether Jessica Spring and Dionne Bonner should stay preview-only or become public records in the requested Tacoma IRL `/art/db/` directory. This authorizes publishing the two data records so the site can consume them using its normal status filter. The website implementation remains a separate Tacoma IRL pull request.

## Change and evidence

Only `status` changes from `draft` to `published` on the existing stable artist files. README and data-model documentation identify the owner-approved publication state. Source facts, URLs, unknown neighborhoods, source-check dates, slugs and CC0 license are preserved.

| Record | Primary evidence | What it supports |
| --- | --- | --- |
| Jessica Spring | [Official printshop page](https://springtidepress.com/printshop/), [official portfolio](https://springtidepress.com/portfolio/) | Tacoma practice, letterpress/book arts, arranged visits and workshops. Checked October 24, 2026; full field mapping stays in the record. |
| Dionne Bonner | [Official artist history](https://www.dionnebonner.com/about/), [official site](https://www.dionnebonner.com/) | Tacoma paintings and public murals, historical 2018 tour participation. Checked October 24, 2026; full field mapping stays in the record. |
| Publication | Owner's explicit instruction above | Authorizes publication of these two records. It does not assert that either artist personally consented or endorsed the directory. |
| Secondary sources | None | No new factual claims or copied biographies. |

## Judgment and omissions

The owner explicitly chose source-based public inclusion for these two entries, overriding the initial seed plan to await artist confirmation. No artist confirmation is invented. Future records retain the ordinary draft/review workflow. No street addresses, personal contact information, images or guessed access policies are added. The original seed review remains the history of their draft preparation.

## Verification

`npm run verify`, `npm run validate -- --base origin/main` and `git diff --check` are required before merge. The PR records final checks and the resulting revision, which the website pins during its explicit data sync. No Tacoma IRL website merge or deployment is performed by this data publication change.
