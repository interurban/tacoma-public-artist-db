# 2026 Studio Tour artist import

## Owner request

> import all 2026 studio tour artists to the DB; yes the email works.

## What changed

One hundred draft artist records from the official 2026 Tacoma Studio Tour listing, plus six medium terms the listing needs: `fashion`, `film`, `installation`, `music`, `performance` and `writing`. The five existing records that appeared in the 2026 tour (Jessica Spring, Mary Mann, Curtis Ashby, Marit Berg, Devin Lawrence Reynolds) gained `studio_tour_years: [2026]` and the tour source.

Nothing is published. Every imported record is `status: draft`, `location_public: false`, and owned by the same publication review as any other record.

## Evidence

| Fact | Source | Check |
| --- | --- | --- |
| The 120 participants, their mediums, websites and social accounts | [Tacoma Arts Month: 2026 Studio Tour map](https://experience.arcgis.com/experience/e0352e9b15244722b4695c7cfcf0a8c4/) | Read October 24, 2026. The public map is backed by the City's ArcGIS feature service, which returned the same 120 names and medium strings on the same day. |
| The 2026 edition dates, October 17–18 | [Tacoma Studio Tour](https://tacomaartsmonth.org/tacoma-studio-tour/) | Read October 24, 2026. |
| “Jo Storey”, not the listing's “Jo Story” | [Iconic Northwest: Jo Storey, Fine Art](https://www.iconicnorthwest.com/shop/jo-storey) | Read October 24, 2026. The gallery page publishes the artist's name and her shop. |
| Secondary sources | None | No roundup, press story or search snippet supplied a recorded fact. |

## Medium mapping

The listing's `media` strings are newline- or slash-separated. Each part maps to one controlled term; repeated terms collapse.

| Listing value | Recorded medium |
| --- | --- |
| Ceramics, Pottery | `ceramics` |
| Drawing, Painting, Mixed Media, Photography, Jewelry, Printmaking, Sculpture, Glass | same term |
| Fiber Art, Textiles | `fiber` |
| Metalsmithing | `metal` |
| Furniture | `wood` |
| Digital Art, New Media, Technology-Based Art | `digital-art` |
| Creative Writing, Poetry, Literary Arts | `writing` |
| Music | `music` |
| Performance | `performance` |
| Film, Video | `film` |
| Installation | `installation` |
| Fashion | `fashion` |

## Imported and excluded

- **Imported:** 100 people and named duos (including “Jeff Libby and Adrienne Wicks”, “Nicole Riso & Tammi Hilton”, “Maggie Stang and Emma Wonsil” and “Craig and Crimson Cross”). Practice-style display names the tour publishes as artists (“Art Eye Choke”, “EITHER/OR”, “Hidden Destiny Glass”, “Joyful”) are kept as their submitted names.
- **Already in the repository, so not duplicated:** Jessica Spring, Mary Mann, Curtis Ashby, Marit Berg, Devin Lawrence Reynolds.
- **Not imported — organisations, venues and schools:** Annie Wright Schools, TygerWolf Tattoo, 1443 Films, Remakery, Write253, Craftopia, Northwest College of Art + Design, Tacomarama Community Street Band, Tacoma Photo Center, Hilltop Artists, Artco Framing & Gallery, Tacoma Weavers Guild, Real Art Tacoma, KBTC Public Television, Recess Studio. These are spaces or groups rather than people; adding them as `studio`/`gallery`/`other` records with their public addresses is a separate change.

## Judgment calls and omissions

- **Drafts, not publication.** The request was to import them to the database. None is published or listed on tacomairl.com; that still needs the owner's word, and no artist was contacted.
- **No biographies.** The listing contains artist statements, but copying them would breach both the repository's “write original text” rule and the artists' own rights. Records carry name, mediums, official links, tour year and evidence only. No filler biography was written to fill the gap.
- **No neighborhoods or visit policies.** The listing does not state an area, and the tour weekend is over, so both stay `null` rather than being derived from a studio address.
- **No practice names or addresses.** `studioName`/`groupStudio` mix artists' practices with shared buildings and shop names, so they are not imported as `practice_name`. Tour studio addresses are not imported; artists never carry addresses.
- **Links normalised, not invented.** Bare URLs gained `https://`; query strings were stripped to the canonical page; Facebook links that only work with `?id=` parameters were dropped rather than guessed. Every stored account was published by the listing or, for Jo Storey, her gallery page.
- **One spelling correction.** The tour listing says “Jo Story”; her gallery page says “Jo Storey”. The record uses the gallery spelling and cites it, and the tour source no longer claims `name` for that entry.
- **Six vocabulary additions.** `fashion`, `film`, `installation`, `music`, `performance` and `writing` were needed to describe the tour truthfully. They are additive to the existing medium enum; no existing term changed.

## Unresolved items

- **Publication** of any or all of the 100 drafts.
- **Organisations** above could become space records, which needs public-address evidence and a decision about whether the directory should list studios and schools alongside artists.
- **Per-artist verification.** These records rest on the official listing, not each artist's own site. Enriching them with bios, practice details and neighborhood evidence is follow-up work, as is checking the 39 records without a website.
- **Neighborhoods** remain empty for every artist in the repository, so the directory's neighborhood filter still has no options.

## Verification

- `npm run validate`: pass, 106 entries.
- `npm run validate -- --base origin/main`: pass.
- `npm test`: 17 pass.
- `git diff --check`: pass.
- Runtime: Node 25.9.0 locally; CI targets Node 24. No dependency change.
