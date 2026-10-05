# Phase 10 design audit

## Direction

LAYA should read as an established development organisation, field journal and institutional archive: documentary, human and quietly confident. The Apple Design Skill is used as a craft standard for purpose, hierarchy, simplicity, flexibility, accessibility and restraint, not as a visual template.

## Findings before implementation

- The homepage already has the strongest editorial foundation: warm ivory canvas, real field photography, ruled sections and restrained palette.
- The hero still presents two equal-weight actions beside a large display heading, which resembles a conversion landing page more than an institutional publication.
- The hero facts are useful but their equal three-column treatment can read as a KPI strip unless the rules and typography make them feel like records.
- The homepage image treatment is closer to a card than a documentary plate because of the rounded frame and translucent caption treatment.
- Several legacy pages, especially `About.tsx`, still use centered panels, oversized headings, rounded accents and animated card grids. These are the next highest-value consistency pass after the homepage.
- The site has a clear palette and token system already; creating another visual system would weaken consistency and increase maintenance cost.
- The main responsive risk is not missing content but composition: stacked controls, metadata and image captions need to remain readable at 360px, 390px and 430px.
- The existing reduced-motion and focus infrastructure should be preserved and checked after visual changes.

## Reference principles applied

- **Purpose and simplicity:** one prominent hero action; the story link is an editorial link rather than a second button.
- **Craft and hierarchy:** the verified figures remain visible, but separators and typographic scale make them read as institutional facts.
- **Flexibility:** the action group and fact register recompose at compact widths instead of shrinking into a crowded row.
- **Accessibility:** preserve semantic links, keyboard focus, readable contrast and reduced-motion behavior.
- **Photography:** use a restrained border and solid archive-style caption so the image remains evidence, not a floating UI card.

## Scope for this pass

The first implementation pass is intentionally narrow: homepage hero hierarchy, fact treatment and documentary image framing. No routes, verified content, data, backend behavior or existing asset selection are changed.

## Validation matrix

The homepage should be checked at 360, 390, 430, 768, 1024, 1280 and 1440px for overflow, heading wraps, action hierarchy, fact readability, image cropping, focus visibility, reduced motion and console errors. Build, lint and the existing test suite remain required before completion.