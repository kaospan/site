# Project agent instructions

This repository is the source of truth for the public SPEAK ON / PEAKSON / kaospen / KAPONES site.

Live site: https://speakon.pages.dev/

Default branch: `main`

All work targets `main` unless a temporary feature branch is created for review and merged back into `main`.

## Agent on it

When a task says **Agent on it**, apply this workflow before marking the work complete:

1. Check whether the requested detail already exists in the site source.
2. Check character fit and project context.
3. Apply DBC: Don’t Be Cringe.
4. Keep the surface clear before adding lore.
5. Use DRY, readable code with one source of truth.
6. Update documentation in the same change.
7. Add or update tests when code behavior changes.
8. Verify the build before release.

## Required source checks

Use these files as the first source of truth:

- `src/data/story.js` — umbrella premise, personas, hidden mechanics, rules, visitor path.
- `src/data/releases.js` — current release cards, statuses, public summaries, release roles, notes.
- `src/data/albums.js` — three-album / 30-song structure, album arcs, track roles, status counts.
- `src/data/chronology.js` — chronological release order and surface/hidden story progression.
- `src/data/trilogy.js` — investor-facing trilogy logic: mask, evidence, body memory.

## DBC rule

DBC is a global project enhancer. It is not a genre or a slogan.

- No fake-deep wording.
- No over-explained mythology.
- No duplicated canon across pages.
- No investor page that requires private context to understand.
- Songs, pages, and components must work on the surface first.

## Response rule

When discussing the site or project canon:

1. Check whether the requested detail already exists in the site source.
2. State clearly whether it is already inserted, missing, outdated, or needs revision.
3. Do not assume that prior chat decisions are on the live site unless the source files confirm it.
4. If a new detail should be added, identify the exact file or section where it belongs.
5. Keep public-facing language simple first; keep deeper mythology as a secondary layer.

## Code quality rules

- Keep shared facts in `src/data/*`.
- Components should render data, not redefine canon.
- Prefer small reusable helpers over repeated JSX blocks.
- Keep status labels consistent across docs and code.
- Never hardcode old deployment URLs.

## Canon hierarchy

- SPEAK ON is the umbrella universe.
- PEAKSON, kaospen, and KAPONES are artist/persona lanes.
- PEAKSON = mask / control.
- kaospen = evidence / system witness.
- KAPONES = body memory / rhythm / residue.
- The Flame / NOESKAP = catalyst / truth test.

## Investor framing

For investor or adaptation work, frame the project as:

> A multi-artist, three-album, approximately 30-song psychological entertainment universe where separate music identities reveal one hidden pressure system: mask, evidence, and body memory.

Before saying investor language is live on the site, confirm it exists in the source files.

## Locked rules

- Released creative canon is locked unless correcting metadata.
- Upload/audio management stays blocked until the investor site is stable.
- Cloudflare Pages is the live production URL.
