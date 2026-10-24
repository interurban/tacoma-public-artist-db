# Artist biography and selected-work fields

## Owner request

> I'd like each artist to also have a page with more details; think like an SEO expert and AI-EO expert

## What changed

Optional version-1 `profile` fields keep the richer biography, selected works and actual editorial revision date in the same public JSON file that artists and their agents already maintain. Existing records remain valid without the optional object. Validation checks plain text, primary evidence, matched work-source URLs and dates. The two current artists illustrate the new fields. The companion Tacoma IRL PR will consume this exact proposed revision; merge this data PR before that website change or its next data sync.

## Evidence

| Artist / claim | Primary source checked October 24, 2026 | Supported additions |
| --- | --- | --- |
| Jessica Spring | [Springtide printshop](https://springtidepress.com/printshop/) | Tacoma printshop, wood/metal type, handmade paper, history/typography themes, small editions and arranged visits/workshops. |
| Jessica Spring | [Springtide portfolio](https://springtidepress.com/portfolio/) | Sukoshi (2025), Yoshi Nakagawa collaboration, 100-copy edition; One Liners (2023), 238 metal typefaces, 150-copy edition. |
| Dionne Bonner | [Artist history](https://www.dionnebonner.com/about/) | Painting/portraiture, Hilltop Stories and family/neighborhood connections, Art Institute of Seattle and Evergreen studies. |
| Dionne Bonner | [Artist homepage](https://www.dionnebonner.com/) | Black Lives Matter Mural Project (2022), Tollefson Plaza, Tacoma artist team and community design process. |
| Dionne Bonner | [Parks Tacoma: In Loving Memory](https://www.parkstacoma.gov/youthmemorial/) | Eastside Community Center memorial and interviews/workshops with the community. |
| Secondary sources | None used | Search results supplied leads only; no secondary claims enter records. |

## Judgments, omissions and unresolved items

- This is a profile-model feature with two representative records, rather than an ordinary artist correction. Schema, validator and sample content are coupled so the owner can review the new contract in one pass. No vocabulary, license, identity, status or privacy policy changes.
- Descriptions are original factual summaries. No copied artist statement, quote, claim of a visit, artist confirmation, artwork or photograph is included. Current publication status reflects the owner's earlier explicit approval of these two entries; these new edits remain proposed in this PR until review.
- A work's year is optional. Parks Tacoma's memorial catalog lists 2020, the artist's history lists 2021, and the institution's separate dedication announcement is dated 2022. Those are not interchangeable creation dates; In Loving Memory has no year in the selected-work data. South Tacoma Library's 2023 artist-history entry versus 2024 institutional reporting was not used to assign a new work date or make a new timing claim.
- `profile.updated_at` is the day the original biography/work summaries were substantively written, not the artist's career date, website publication date, source-check date or retrieval timestamp. Syncing must not advance it. Source checks were repeated today, so the already-current October 24 check dates remain accurate.
- The full raw file remains public under CC0, including profile text. Source-page rights are separate; no image license or endorsement is implied.
- Website fields and index controls are implemented in the companion site PR. This data PR alone does not add or deploy artist pages. No merge or publication of the proposed expansion is performed here.

## Verification

Run the Node 24 validator, all regression cases, the base-history check, Markdown links and whitespace checks. The PR records actual local and CI results. Existing source checks and stable IDs remain intact.
