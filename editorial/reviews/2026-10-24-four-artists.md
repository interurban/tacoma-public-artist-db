# Simpler README and four more artists

## Owner request

> make the readme very simple; consider most artists won't understand. take my name out of it; references to test data etc. basically just say it's a work in progress , you can email us with updates and if we've got anything wrong we'll fixit. simplify the agent instructions and put it at the very bottom; then add 4 more artists

## What changed

`README.md` is rewritten for artists rather than developers. It now says what the list is, that it is a work in progress, how to email a correction or request a listing, what is listed and what is never listed, and how the data may be reused. The owner's name, the schema/CI/test walkthrough, the file tree, the downstream contract and the “first two entries” section are gone. The shortened agent prompt is the last section; its heading stays “Ask your agent” so the existing `README.md#ask-your-agent` link in [CONTRIBUTING.md](../CONTRIBUTING.md) still resolves.

Four new records: Mary Mann, Curtis Ashby, Marit Berg and Devin Lawrence Reynolds. The owner approved publishing all four on October 24, 2026, so each record carries `status: published`; the facts were checked against the artists' own pages that day. Each cites only the artist's own site. Two already carry sourced education, awards, affiliations or public works, so the practice-detail fields have more than two examples.

## Evidence

| Entry / fact | Primary source | Supports |
| --- | --- | --- |
| Mary Mann: Tacoma-based painter and muralist; education; TAIP grant; public murals | [About](https://www.marymannpainter.com/about-7), [teaching artist](https://www.marymannpainter.com/teaching-artist), [murals](https://www.marymannpainter.com/public-art) | Name, painting, Tacoma connection, two degrees, grant, Instagram, five public works with places and years. Checked October 24, 2026. |
| Curtis Ashby: Tacoma muralist, illustrator and designer; grants; resume murals; affiliations | [About](https://www.curtisashbyart.com/about-me), [resume](https://www.curtisashbyart.com/artist-resume), [blog](https://www.curtisashbyart.com/blog) | Name, illustration/painting, Tacoma connection, two affiliations, grant, community award, five murals, news link, Instagram and Facebook. Checked October 24, 2026. |
| Marit Berg: printmaking and painting; taught in TCC's printmaking department | [About](https://www.maritberg.com/about) | Name, both mediums, Tacoma connection, biography. Checked October 24, 2026. |
| Devin Lawrence Reynolds: Tacoma painter, still life/floral/figures | [About the artist](https://www.devinlawrencereynolds.com/about-the-artist) | Name, painting, Tacoma (the page footer gives Tacoma, WA), biography, Instagram. Checked October 24, 2026. |
| Which artists to look at | 2026 Tacoma Studio Tour listing in the companion website repository | Discovery lead only. No tour listing, address or schedule is cited, imported or relicensed. |
| Secondary sources | None | No roundup, interview, press story or search snippet supplied a recorded fact. |

## Judgment calls and omissions

- **Publication is the owner's decision, not artist consent.** The owner approved publishing all four. Owner approval is not artist confirmation or endorsement: no artist was contacted, and no listing permission was obtained. Publication remains distinct from the owners of the linked sites, whose content and images this repository does not license.
- **Tacoma connection for Marit Berg** rests on her own statement that she took a position in Tacoma Community College's printmaking department. That is a documented Tacoma practice (teaching), not a claim that she lives in Tacoma. It is the weakest Tacoma link of the four and the first thing to drop if the maintainer prefers residence or a Tacoma studio as the test.
- **No neighborhoods or visit policies.** None of the four publishes a Tacoma area or studio-visit policy, so both stay `null` rather than being guessed.
- **Public-work selection.** Mary Mann's 1995 Stadium District mural is left out because her own page says a building was later constructed in front of it. A 2024 Environmental Services mural is left out because the page gives no site name, only “Tacoma”. Curtis Ashby's resume gives cities and years; the five Tacoma-area projects are kept and the Puyallup/Sumner/Port Orchard/University Place entries are not, since this directory is Tacoma.
- **Years omitted rather than guessed.** Curtis Ashby's two TAIP grants are published as date ranges (2021–2022 and 2025–2026), so the single grant entry has no `year`; Mary Mann's TAIP grant is published without a year.
- **Social links only where linked.** Every account stored was linked from the artist's own page. Marit Berg has no confirmed account, so no social link is stored.
- **No copied biographies.** All four bios and profile paragraphs are original summaries of the cited pages, not copied artist statements. Mary Mann's and Curtis Ashby's profile paragraphs reuse only the facts their pages state.
- **No images, addresses, phone numbers, emails or ZIP codes.** Devin Lawrence Reynolds' page footer gives a ZIP code; only the city is recorded, as the Tacoma connection.
- **No studio-tour years.** The tour listing was a discovery lead, not a licensed source for this repository, so `studio_tour_years` is omitted even though these artists appeared in 2026.

## Unresolved items

- The README now sends artists to email rather than GitHub. `CONTRIBUTING.md` and `AGENTS.md` still name the owner as reviewer; the owner asked for the name to be removed from the README only, so those files are unchanged.
- The README no longer links the data model or the downstream contract. Those remain in `docs/data-model.md` and are still linked from `CONTRIBUTING.md`.

## Verification

- `npm run validate`: pass, six entries.
- `npm run validate -- --base origin/main`: pass; four additions, no removal, rename, demotion or date rollback.
- `npm test`: 17 pass.
- `git diff --check`: pass.
- Runtime: Node 25.9.0 locally; `.nvmrc` and CI target Node 24. No dependency change.
