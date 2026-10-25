# Studio Tour enrichment, batch 1

## Owner request

> start on the first 20; enriched

## What changed

Twelve of the first twenty imported 2026 Studio Tour records now have original profile text and sourced practice details: a short biography, one or two profile paragraphs, and — where the artist publishes them — a practice name, education, affiliations, public works or a news link. The tour map remains the evidence for 2026 participation; each artist's own site is now the primary source for everything else.

All twelve remain `status: draft`. Nothing is published, and no artist was contacted.

**Enriched:** Alexandra Cespedes, Judith Perry, David Jacobs, Roxann Murray, Alice Di Certo, Kyle Dillehay, Bobbie Specker, Tro Robinson, Lucia Harrison, Mark Hudak, Hadiya Finley, Cass Brown.

**Not enriched (8 of the 20):**

| Artist | Why |
| --- | --- |
| Kirsten Sparenborg | Her site rate-limits automated requests (HTTP 429 on every attempt, including a headless browser). |
| Mark Hoppmann | His site returns 403 to automated requests, including a headless browser. |
| Terry A Bader, Grace Rex, Deborah Ranniger, Liz Pulos, Deborah Greenwood, Pamela Leatherman | No website in the tour listing and no other published source found, so there is nothing to write an original profile from. |

These eight stay as they were: draft records with name, mediums, links where available and 2026 participation.

## Evidence

| Artist | Primary source | Fields added |
| --- | --- | --- |
| Alexandra Cespedes | [AleClayLab: about](https://aleclaylab.com/about) | Practice name, short bio, profile |
| Judith Perry | [About the artist](https://judithperryart.com/about.html), [home](https://judithperryart.com/) | Short bio, profile, education, affiliations (Hawaii Watercolor Society, Women Painters of Washington) |
| David Jacobs | [Home](https://www.david-jacobs-photography.com/), [Field Notes](https://www.david-jacobs-photography.com/fieldnotes) | Short bio, profile, news link |
| Roxann Murray | [Home](https://www.atouchofwanderlust.com/), [CV](https://www.atouchofwanderlust.com/resume) | Short bio, profile, education (UW Tacoma, 2009) |
| Alice Di Certo | [About](https://alicedicerto.weebly.com/about.html) | Short bio, profile, education, affiliation (Tacoma Community College) |
| Kyle Dillehay | [Bio](https://kyledillehay.com/bio) | Short bio, profile |
| Bobbie Specker | [About](https://www.bobbiespeckerceramics.com/about) | Practice name, short bio, profile |
| Tro Robinson | [About](https://www.rhythmcoaststudio.com/about) | Practice name, short bio, profile |
| Lucia Harrison | [Home](https://luciaharrison.com/), [resume](https://img-cache.oppcdn.com/fixed/21900/resume.pdf) | Short bio, profile, public work (Point Defiance native-plant panels) |
| Mark Hudak | [Meet us](https://throwingmudgallery.com/meet-us/) | Short bio, profile, affiliation (Throwing Mud Gallery) |
| Hadiya Finley | [Story](https://www.barefootbird.com/the_story) | Short bio, profile |
| Cass Brown | [About me](https://www.grayillu.com/contact) | Practice name, short bio, profile, education (SCAD, 2017), affiliations (Copper Wolf, Proctor Art Gallery) |

Checked October 24, 2026. Secondary sources: none — every added fact comes from the artist's own site or CV.

## Judgment calls and omissions

- **Original text only.** Every short bio and profile paragraph is written from the source, not copied from it. Hadiya Finley's published statement is personal and names a family member's illness; the record keeps only her practice — bronze and mixed-media figures, assemblage, study with George Herms.
- **Tacoma claims stay with the tour source.** Where a site does not say Tacoma, the `Tacoma connection` claim stays with the 2026 tour map rather than being inferred from an area code, a gallery or a mailing address.
- **No practice names by default.** Only where the site itself brands the practice: AleClayLab, Bobbie Specker Ceramics, Rhythm Coast Studio, Graybeal Illustrations.
- **No neighborhoods or visit policies.** None of the twelve states a Tacoma area, and the tour weekend is over.
- **Education without invented credentials.** Judith Perry's four listed schools carry no degree or year; only what her page publishes is recorded. Alice Di Certo's unfinished MFA is not recorded as a degree.
- **Lucia Harrison's public work** is the 2003–04 native-plant interpretive panels at Point Defiance Park. The resume gives a range, so `year` is omitted.
- **Languages and spelling.** Profiles use American spelling. Names are the tour listing's, except Jo Storey in the import batch.

## Unresolved items

- **Publication** of these twelve (or any of the 100 drafts) is still the owner's call.
- **Eight of the first twenty** remain unenriched: six have no published source, two block automated access. The two blocked sites could be read manually and written up later.
- **The remaining 80 drafts** are untouched.

## Verification

- `npm run validate`: pass, 106 entries.
- `npm test`: 17 pass.
- `git diff --check`: pass.
- Runtime: Node 25.9.0 locally; CI targets Node 24. No dependency change.
