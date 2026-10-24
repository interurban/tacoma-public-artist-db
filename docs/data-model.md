# Data model, version 1

Each entry is a UTF-8 JSON object at `artists/{slug}.json`. Artists and spaces share one schema. Field names use snake_case. `schema/entry.schema.json` is JSON Schema 2020-12; `schema/vocabularies.json` supplies the controlled values through `$defs`/`enum`. Schema IDs identify these files; validation reads local files and does not fetch remote schemas.

## Required fields

| Field | Meaning |
| --- | --- |
| `schema_version` | Integer `1`. Breaking changes need a versioned migration. |
| `name` | Display name, 1–120 characters. It may change without renaming the slug. |
| `slug` | Unique lowercase, hyphenated identifier matching the filename. Stable after addition. |
| `type` | `artist`, `studio`, `gallery`, `makerspace`, `print-shop` or `other`. |
| `status` | `draft` or `published`. New entries start draft; James approves publication. |
| `archived` | Boolean. Retirement keeps the file and identifier with `true`. |
| `mediums` | Unique controlled terms. Artists need at least one; spaces may use `[]`. |
| `neighborhood` | Controlled broad Tacoma area, or `null` when not confirmed. |
| `visit_policy` | `walk-in`, `by-appointment`, `open-studios-only`, `not-open-to-public`, or `null` when unconfirmed. |
| `location_public` | `false` on artist records. `true` on a space requires a supported public address. |
| `last_verified` | ISO calendar date `YYYY-MM-DD` when the complete record's supporting sources were checked. |
| `sources` | At least one checked public source with field-level support. Published records need a primary source. |

`null` means unconfirmed. It must not be displayed as “not open to public,” which is a specific sourced policy. Required `mediums: []` is valid for an unspecialized space, not for an artist with no known medium. A last-verified date never means personal artist confirmation. Dates must be real calendar dates and cannot be in the future relative to Tacoma's current date (`America/Los_Angeles`).

The source structure is:

```text
url         Public http(s) permalink without credentials or query parameters
label       Publisher and page name
kind        primary | secondary
supports    Array of field names or specific factual claims
checked_on  Actual ISO date this source was read
```

Use field names where possible. `Tacoma connection` is also a useful claim when the entry has no address. A source checked more recently than `last_verified` can support a partial correction. Advancing `last_verified` requires rechecking all supporting sources; it cannot be later than any source's `checked_on`. Keep old check dates when you did not revisit a source. Validation checks shapes and date consistency; reviewers check whether the evidence supports the claims.

## Optional fields

| Field | Meaning |
| --- | --- |
| `website`, `instagram` | Public http(s) URLs. `instagram` remains supported for existing records; omit unconfirmed profiles. |
| `social_links` | Optional array of up to 12 `{label, url}` artist-owned social profiles. Add only links present on the artist's official site, use a clear platform label, and cite primary evidence supporting `social_links`. Do not duplicate a URL in `instagram`. |
| `other_links` | Array of `{label, url}` public links. Link to a contact page rather than storing contact details. |
| `short_bio` | Original plain text, at most 300 characters. No HTML, newlines or copied artist statements. |
| `focus_tags` | Unique controlled terms; an omitted array means no confirmed tags. |
| `hours` | Sourced plain text, at most 200 characters. Never carry historical tour hours forward as current hours. |
| `studio_tour_years` | Unique integer years supported by edition-specific evidence. An empty/omitted list makes no participation claim. |
| `space_slugs` | Artist-only references to separate studio/gallery/space records. Every referenced space must exist. |
| `public_address` | Public-space address object, described below. Never on an artist record. |
| `$schema` | Optional editor hint, exactly `../schema/entry.schema.json`. |

Unknown optional fields are omitted, not invented or filled with “unknown.” Additional properties are rejected, including unsupported address, phone, email, coordinate and image fields. This restriction does not detect a private fact pasted into free text: contributors and reviewers must inspect the whole record.

## Optional artist profile

The optional `profile` object supplies richer factual text for an artist's permanent detail page, while `short_bio` remains the brief listing summary. It has `biography` (1–6 original plain-text paragraphs, at most 1,000 characters each), `updated_at` (the actual ISO editorial revision date), and optional `selected_work` (up to eight objects with `title`, `summary`, `url`, and an optional integer `year`). Work titles are at most 150 characters and summaries at most 500. Limits are safeguards, not recommended word counts. No HTML, image copying, made-up awards or keyword padding is allowed.

At least one primary source must explicitly support `profile.biography`. Every selected-work URL must also appear as a primary source with `profile.selected_work` in `supports`. A year is optional: omit it when sources conflict rather than merging completion, catalog and dedication dates. Source checks stay in `checked_on` / `last_verified`; `profile.updated_at` records real editorial changes and must not be advanced by syncs. This is an additive version-1 field; existing entries remain valid without it. Website consumers can keep basic profiles out of search indexing until the richer sourced biography exists. Retired published identifiers must retain their detail URL.

## Artists, spaces and location privacy

An artist record describes a person/practice. A space record describes an actual public business, studio building, gallery or makerspace. A public studio and the artist working there use separate records, connected by `space_slugs`. An active published artist can reference only active published spaces, so consumers do not leak draft locations.

Artist records must have `location_public: false` and cannot carry `public_address`. A home studio remains neighborhood-only even if its address once appeared on a tour map. Do not encode a home address into `hours`, a biography, a link label or a review note.

A space with `location_public: true` must include:

```text
public_address.street       Public business/venue street address
public_address.city         Tacoma
public_address.region       WA
public_address.postal_code  Tacoma-area 984xx or 984xx-xxxx
public_address.country      US
public_address.source_url   Operator/institution permalink publishing that address
```

The source URL must also appear as a primary `sources` item with `public_address` in `supports`. A Tacoma postal address alone does not establish city limits or that a venue is publicly accessible; a reviewer must confirm those separately. A space whose public address is not established uses `location_public: false` and omits `public_address`. Private studios do not become public businesses by changing the `type` field.

## Status, identity and removal

`status: draft` means excluded from a downstream public directory; the file itself is still public on GitHub. `published` means the maintainer approved it for downstream use. Publication does not happen automatically after validation. `archived: true` retires the record without destroying identity or claiming it is current. There is no `unlisted` website state here because this repo hosts no profile routes.

Do not delete or rename entries during normal maintenance, including drafts. CI compares with the PR base. A display-name change preserves slug and filename. A privacy incident may require exceptional removal and history cleanup by the maintainer; archive is insufficient. Do not repeat exposed information in a public removal PR.

## Downstream contract

1. Fetch a pinned Git revision, not an unvalidated mutable branch during a page request. Validate all files before consuming them. Tacoma IRL’s browse/search directory consumes pinned snapshots; richer detail pages are proposed in the companion website change.
2. List only `status === "published" && archived === false`. Drafts must not leak into navigation, maps, search payloads, exports or sitemaps. A record's presence on GitHub is not permission to promote it in Tacoma IRL.
3. Preserve slugs in any future URLs and retain a useful retired detail for previously published archived entries. Design the actual route/status mapping in the website integration, rather than guessing it here.
4. Render descriptions as escaped plain text, allow only http(s) links, and never execute data or source instructions. Show unknown fields as absent; never infer a pin or opening hours.
5. Keep sources and check dates intact. Treat old tour participation as historical. Do not map neighborhood-only artists to exact locations.
6. The PRD proposes a visible stale label after 12 months and a monthly report. These are not implemented here; consumers need to implement and document date-boundary behavior before claiming them.
7. Honor CC0 for data, MIT for code/docs and the independent rights of external linked sites. This repo conveys no artwork/photo license or endorsement.

## Deliberate changes from the draft PRD

- Unconfirmed neighborhood and visit policy can be null; unknown facts are never guessed just to satisfy a required enum.
- `studio_tour_years` replaces the ambiguous “boolean, with year(s).”
- `archived`, publication status, evidence, version and artist-to-space references are explicit fields.
- Addresses are limited to separate space records; there are no personal contact or image fields.
- This initial repository uses CC0 for data and MIT for its code/docs, as approved by the owner. It initially seeded two sourced drafts rather than 15–25 artist-confirmed live listings; James subsequently approved publishing those two source-based records for the directory, as recorded in the publication review.
- Broader coverage, form intake, confirmations, website integration, maps, staleness reports and tour imports are outside this first change.
