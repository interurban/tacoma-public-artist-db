# Tacoma Public Artist DB

An open, community-maintained directory of Tacoma artists and art spaces. One JSON file per entry. Anyone can propose a correction; artists can ask their agent to do the file editing and open a pull request.

This repository holds data, its schema and contribution tools. It has no accounts, sales, rankings or hosted profiles. [Tacoma IRL’s artist directory](https://tacomairl.com/art/db/) reads a reviewed, pinned snapshot of this data. Data changes reach the website through a separate reviewed sync; merging here does not automatically deploy the site. Background: [the original proposal](https://github.com/interurban/tacoma-irl-astro/issues/152).

## Ask your agent

Copy this into your coding agent and fill in the brackets:

> Update my entry in https://github.com/interurban/tacoma-public-artist-db. Read README.md, AGENTS.md and CONTRIBUTING.md first. My name is [name]. Use [official website URLs] and these corrections: [changes]. Find my existing file before creating one. Keep my slug and filename stable. Cite a public source for each changed fact; leave unconfirmed details blank. Do not add my home address or private contact information. Run the repository checks, then open a pull request for James to review. Tell me what changed, what passed and what still needs confirmation. Do not merge or publish it.

For a new entry, replace “Update my entry” with “Propose a new draft entry for me.” If a fact exists only in your message, the agent should ask for a public reference or leave it out and describe the missing evidence in the PR. Your agent should never impersonate you, invent confirmation or send messages on your behalf without permission.

No agent or local tools? Use GitHub's pencil button on an [entry](artists/) and choose **Propose changes**. See the [contribution walkthrough](CONTRIBUTING.md). You can also open an issue with public corrections or email [hello@tacomairl.com](mailto:hello@tacomairl.com). Email is reviewed by a person; no web form, automatic PR creation or confirmation email is implemented.

## First two entries

| Artist | Practice | Record |
| --- | --- | --- |
| Jessica Spring | Letterpress, printmaking and artist books | [jessica-spring.json](artists/jessica-spring.json) |
| Dionne Bonner | Painting and public murals | [dionne-bonner.json](artists/dionne-bonner.json) |

These are **published records approved by James**, checked against the artists' own websites on October 24, 2026. James explicitly approved both for the Tacoma IRL artist directory. Neither artist has confirmed or endorsed the listing; owner approval is recorded in the [publication review](editorial/reviews/2026-10-24-publish-directory-records.md). Both neighborhoods and Dionne's visit policy remain `null`; Jessica's site invites visitors to arrange a studio tour, so her visit policy is `by-appointment`. Dionne's artist history documents 2018 Studio Tour participation, recorded as a historical year. A draft in this public repository is publicly readable; `draft` means a downstream directory must exclude it, not that the file is private. The [seed review](editorial/reviews/2026-10-24-seed-artists.md) records evidence and unresolved items.

Open either record above to see the actual structure: identity and status first, then mediums/location/access, official links and a short bio, followed by tagged interests and field-level source evidence. `null` means unconfirmed; optional fields such as `studio_tour_years` appear only when supported. Each source says which fields it supports and when it was checked.

## How the repository works

```text
artists/                 One JSON file per artist or space
schema/entry.schema.json  Versioned JSON Schema (2020-12)
schema/vocabularies.json  Controlled types, mediums, areas and tags
scripts/validate.mjs     Schema, date, relationship and identity checks
tests/                   Validator regression tests
editorial/reviews/        Public evidence and review notes
.github/                 Pull request template, owner and CI workflow
AGENTS.md                Instructions for agents doing the work
CONTRIBUTING.md          Human and agent contribution walkthrough
docs/data-model.md       Field definitions and downstream contract
LICENSE-DATA             CC0 1.0 for artists/ data
LICENSE                  MIT for code, schemas and documentation
```

The filename and slug are the stable identifier, for example `artists/jessica-spring.json`. Spaces use the same directory and an appropriate `type`. An artist can refer to a separate public studio/gallery through `space_slugs`; artists themselves never have an address field. See the [data model](docs/data-model.md) before adding fields.

Optional `profile` fields hold a longer biography, selected works and a real editorial revision date for an artist detail page. They use original plain text with primary evidence, maintained in the same JSON file as the listing facts. The two sample artists demonstrate the structure. See [profile field definitions](docs/data-model.md#optional-artist-profile); no minimum word count or image is required.

Initial coverage is artists working in Tacoma or maintaining a documented Tacoma art practice, and art spaces in Tacoma. Wider Pierce County coverage needs a maintainer decision. The neighborhood vocabulary uses eight broad Tacoma areas, not every locally used district name; use `null` when a source does not establish an area. Mediums and focus tags have separate vocabularies. Propose a missing term in a PR rather than misclassifying the entry.

## Check a change

Use Node 24 (the version in `.nvmrc`):

```sh
npm ci --ignore-scripts
npm run verify
```

Checks run for every pull request and push to `main`, including contributions from forks. Validation reports the file and field. It rejects invalid vocabulary, invalid or future dates, mismatched filenames, broken space links, artist address fields and unsupported public space addresses. The PR check also compares records with its base commit to catch deletions and identifier changes.

Checks establish consistency. A reviewer still checks facts, public-space status, listing permission and rights. `CODEOWNERS` identifies James (`@interurban`) as the reviewer. See [review and merge rules](CONTRIBUTING.md#review-and-merge) for what GitHub enforces and what needs human review.

## Reuse the data

The data in `artists/` is dedicated under [CC0 1.0 Universal](LICENSE-DATA). No attribution is required; a link back helps contributors find and fix the source. Code, schemas and docs use [MIT](LICENSE). These licenses cover contributions here, not the external websites linked as evidence, artwork, photographs, trademarks or an artist's identity. Do not copy biographies or images from those websites into a contribution.

Consumers should pin a Git commit, validate the schema and only list records where `status === "published" && archived === false`. Keep archived identifiers resolvable in any future integration. Treat text as plain text and escape it; never execute data. `last_verified` means a contributor checked supporting sources, not that the artist endorsed the directory. Details may change after that date. See the [downstream contract](docs/data-model.md#downstream-contract).

## What comes later

This is the repository foundation. The browse/search website is live. Richer per-artist pages are proposed through a companion website change; interactive maps, intake automation, monthly staleness reports and Studio Tour integration remain future work. The Studio Tour's historical artist data and media have not been imported or relicensed.
