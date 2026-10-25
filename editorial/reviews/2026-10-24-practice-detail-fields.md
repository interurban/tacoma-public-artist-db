# Practice detail fields: education, awards, affiliations and public work

## Owner request

> what do you think about the data we're able to capture on artists; anything you might add that's easily sourced via web searching

Followed by:

> make these changes

The proposal behind this change named six fields drawn from pages the artists already publish: a practice name, education, awards, affiliations, publicly sited works and a news link. It also proposed generalizing social links, structuring selected work and adding an artist-confirmation field; those were already covered or deferred (see below).

## What changed

Version 1 gains six optional fields: `practice_name`, `education`, `awards`, `affiliations`, `public_works` and `news_url`, plus the controlled `award_kind` vocabulary (`award`, `grant`, `residency`, `fellowship`, `scholarship`). The validator requires primary evidence naming each field in `supports`, keeps years out of the future, restricts `practice_name`, `education`, `awards` and `public_works` to artist entries, and leaves `affiliations` and `news_url` valid on any record. Data model, agent guide, contribution guide and README describe the fields and their limits. One regression case covers evidence, year, shape, artist-only and address boundaries.

Both records are populated where the artists publish the facts. Jessica Spring gains `practice_name` and one temporary public work. Dionne Bonner gains `practice_name`, two degrees, four recognitions, four public works and a news link. Existing `mediums`, `focus_tags`, `profile`, `social_links`, check dates and publication status are unchanged; the additions are additive version 1, the same way `profile` and `social_links` were added.

## Evidence

| Fact | Primary source | Check |
| --- | --- | --- |
| `practice_name`: Springtide Press, founded 1999 in Tacoma | [Springtide Press printshop](https://springtidepress.com/printshop/) | Read October 24, 2026. |
| `public_works`: “You’ll Heal Tacoma”, Stanley Playfield, 2020, temporary | [Springtide Press portfolio](https://springtidepress.com/portfolio/) | Read October 24, 2026. Project page names the site and the September 12–20, 2020 installation. |
| `practice_name`: Dionne Bonner Art & Design | [Artist's about page](https://www.dionnebonner.com/about/), [homepage](https://www.dionnebonner.com/) | Read October 24, 2026. Page title and footer publish the practice name. |
| `education`: BA Media Arts and Community Archives, The Evergreen State College, 2021; AA Graphic Design and Painting, The Art Institute of Seattle, 1993 | [Artist's about page](https://www.dionnebonner.com/about/) | Read October 24, 2026. Education section. |
| `awards`: Jane’s Fellowship, The Russell Family Foundation; Merit Scholarship and Certificate of Merit, The Art Institute of Seattle, 1992; Certificate of Appreciation, The African American Museum, 1995 | [Artist's about page](https://www.dionnebonner.com/about/) | Read October 24, 2026. Awards/Certificates and Volunteering sections. |
| `public_works`: South Tacoma Library Mural, 2023; Lateral Force, Tollefson Plaza; Interconnections, Hilltop, 2021; In Loving Memory, Eastside Community Center | [Artist's about page](https://www.dionnebonner.com/about/), [public art page](https://www.dionnebonner.com/public-art/) | Read October 24, 2026. Integrated Public Art list. |
| `news_url`: the artist's blog | [Blog](https://www.dionnebonner.com/blog/) | Read October 24, 2026. Loads as a dated post list; the link appears in the site navigation. |
| Field shapes, evidence rules and vocabulary | Existing schema, validator, tests and data model; Ajv 2020-12 usage already in the repository | Reviewed October 24, 2026. |
| Secondary sources | None | No directory roundup, press mention or search snippet supplied a recorded fact. |

## Judgment calls and omissions

- **No duplicate fields.** Structured selected work already exists as `profile.selected_work` (#3), and general social links already exist as `social_links` (#4). Both were merged before this change, so the proposal's selected-work and social-link items are dropped rather than duplicated.
- **Deferred, not implemented:** `artist_confirmed_on`/`submitted_by`. Artist confirmation is not a web source, and the evidence model has no honest way to record a private attestation yet. That needs a separate owner decision about what a confirmation means, who records it and how it is reviewed. Nothing in this change claims artist confirmation.
- **Left absent:** Jessica Spring's education, awards and affiliations. Her site's proprietor page renders no readable text and no other first-party page publishes them, so the fields stay omitted rather than being filled from interviews or other directories. The same applies to Dionne Bonner's affiliations: her CV's volunteering and board entries are not art relationships and were not stretched into that field.
- **Years omitted rather than guessed.** “Jane’s Fellowship” is published as 2019–2020, so `year` is absent. *Lateral Force* is published as 2021–2022 and *In Loving Memory* has conflicting catalog (2020), artist-history (2021) and dedication (2022) dates recorded in the earlier profile review, so neither carries a year. South Tacoma Library Mural (2023) and Interconnections (2021) do.
- **Temporary work is labelled, not hidden.** *You’ll Heal Tacoma* was a two-week 2020 installation at Stanley Playfield and carries `temporary: true`. The portfolio text is written before the installation; the owner should drop the entry if they want only permanently sited work. The data model now says consumers must not present a temporary or ended work as currently on view, but the website does not render `public_works` yet, so no page claims it is visitable.
- **`place` can be a named area.** *Interconnections* is documented as a mural in the Hilltop neighborhood, so its `place` is “Hilltop”; a street address is not published and would not be stored even if it were. The data model therefore allows a named public area, while still forbidding a studio or home address.
- **Dionne Bonner's 2018 temporary projects** (*Fill In The Blanks* at the Hilltop Street Fair, *Inhabited 2.0* in Salishan, *Paint the Street*) are left out of this first pass: they were one-time festival displays and community projects rather than integrated public art, and including them would record historical events as places. They remain documented on her public art page.
- **Only degree-level education.** Dionne Bonner's 2000, 2001 and 2011 certificates are published, but the record keeps the two degrees: a profile field is not a résumé, and the certificates add re-checking cost without changing who she is or what visitors can plan.
- **Recognitions stay as published.** The four awards are exactly the items under her published Awards/Certificates heading; no grant, residency or press prize was inferred from exhibition history.
- **Public work is not location.** `public_works.place` records the artwork's public site only. No studio, home, address or coordinate was added, and the schema still forbids `public_address` and `location_public: true` on artist records.
- **No volatile facts.** No exhibition schedule, price, availability, class date or current hours were added. `news_url` points at the artist's own blog instead, matching the data model's guidance.
- **No images, quotes or copied biography.** All new values are short factual fields. No artwork, headshot, statement or contact detail is added, and the rights position for imagery is unchanged.

## Unresolved items

- The owner should confirm the two policy choices this change makes: that a practice/studio name, education, awards, affiliations, public site works and a news link belong in the shared data model, and that `temporary` is the right marker for ended installations.
- The Tacoma IRL website snapshot still pins `193f3f7` and renders none of these fields. Directory cards and detail pages need a follow-up website change after this merges; the detail-pages branch is the natural place, and it currently pins the earlier profile commit.
- Whether to record artist attestation, and how, remains open (above).
- No artist was contacted, and no artist has confirmed or endorsed their record. Nothing here changes publication status.

## Verification

- `npm run validate`: pass, two entries.
- `npm run validate -- --base origin/main`: pass; no entry removal, rename, demotion or date rollback.
- `npm test`: 17 pass, including the new practice-detail case.
- `git diff --check`: pass.
- Runtime: Node 25.9.0 locally; `.nvmrc` and CI target Node 24. No dependency or lockfile change.
