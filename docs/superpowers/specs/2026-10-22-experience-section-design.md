# Experience Section Design

**Date:** 2026-10-22  
**Status:** Approved design, ready for implementation planning  
**Supersedes:** The Experience-specific details in `docs/superpowers/specs/2026-10-22-portfolio-shell-design.md` (notably the logo/dates grid and the three placeholder roles).

## 1. Context

The portfolio currently contains the navbar, hero, and Projects section. Experience is the next section in the page narrative: after showing selected work, it should show the teams and products behind that work and give recruiters a quick sense of progression.

The reference provided by the user shows a centered blue `EXPERIENCE` heading with three company rows. That treatment conflicts with the existing violet→magenta accent and the left-aligned section system established by Projects. This design keeps the scannable company/role/date hierarchy but adapts it to the current visual language.

The first version uses three clearly fictional placeholders. The structure must make it easy to replace them with real roles, dates, descriptions, and company marks without changing component code.

## 2. Goals

- Add a polished Experience section immediately after Projects.
- Make each role scannable at a glance: company, role, dates, and impact.
- Add a subtle career narrative without turning the section into a stack of cards.
- Preserve the existing dark surfaces, 1px borders, restrained accent gradient, and shared 880px content rail.
- Keep the section easy to update through the typed content file.
- Add Experience to the navbar and active-section tracking.
- Use local assets and add no new dependencies.

## 3. Non-goals

- Real employment history in this pass.
- Company links, role detail pages, filters, or expandable entries.
- A vertical card timeline, carousel, or scroll-triggered entrance animation.
- Contact, footer, or other later sections.
- A CMS or automated content pipeline.
- Fake metrics, awards, client names, or revenue figures.

## 4. User Experience

### 4.1 Section composition

The section uses the existing container, section padding, and dark background.

- A 1px top border separates Experience from Projects.
- A left-aligned section heading on the 880px rail:
  - Gradient eyebrow reading `02 / Career`.
  - `h2` reading `Experience`.
  - Short muted intro in the right column at desktop.
- Below the heading, three hairline-separated rows.
- A faint 1px vertical spine runs through the company-mark column, with the marks sitting on top of it.
- No cards, no blue accent, no centered heading, and no heavy shadows.
- `Experience` is added to the navbar after `Projects`, linking to `#experience`.

### 4.2 Row anatomy

Each row is an informational list item, not a link.

From left to right at desktop:

1. **Company mark** — 40px rounded square with a 1px border and raised surface.
2. **Identity** — role as an `h3`, with the company name beneath in muted text.
3. **Dates** — right-aligned, muted, and non-wrapping.
4. **Description** — one or two impact-focused sentences beneath the identity, capped at 70ch.

The company mark is decorative because the company name is already present as text. It uses empty alt text.

## 5. Content Model

### 5.1 Type changes

Update `ExperienceItem` in `src/data/types.ts`:

```ts
export interface ExperienceItem {
  role: string
  company: string
  start: string
  end: string
  description: string
  logo: string
}
```

The existing `logoAlt` field is removed because the adjacent company name already provides the accessible label.

Add a typed heading object so section copy remains editable in `content.ts`:

```ts
export interface ExperienceHeading {
  index: string
  label: string
  title: string
  intro: string
}
```

Add `experienceHeading: ExperienceHeading` to `SiteContent`.

### 5.2 Placeholder content

The following entries are fictional and must be marked with a `PLACEHOLDER` comment in `content.ts`. They should read like realistic portfolio work, not lorem ipsum.

**Section heading**

- Index: `02`
- Label: `Career`
- Title: `Experience`
- Intro: `A look at the teams and products I’ve contributed to, and the problems I’ve helped solve.`

**Entry 1 — Northwind Studio**

- Role: `Senior Frontend Developer`
- Company: `Northwind Studio`
- Start: `2023`
- End: `Present`
- Description: `Led front-end delivery for a multi-tenant analytics product, partnering with design and backend teams to ship clearer, faster workflows.`
- Logo: `northwind.svg`

**Entry 2 — Acme Labs**

- Role: `Full-Stack Developer`
- Company: `Acme Labs`
- Start: `2021`
- End: `2023`
- Description: `Built and maintained full-stack features across customer-facing and internal tools, with a focus on reliable data flows and reusable UI patterns.`
- Logo: `acme.svg`

**Entry 3 — Freelance**

- Role: `Web Developer`
- Company: `Freelance`
- Start: `2020`
- End: `2021`
- Description: `Designed and shipped responsive sites for small businesses, handling everything from discovery and UI to deployment and handoff.`
- Logo: `freelance.svg`

Dates are rendered as `{start} – {end}` with an en dash. The placeholder names, dates, and descriptions must be easy to find and replace.

## 6. Visual Specification

### 6.1 Section

- Element: `<section id="experience" className="experience" aria-labelledby="experience-title">`.
- Padding: `var(--section-padding)` top and bottom.
- Top border: `1px solid var(--color-border)`.
- Scroll margin: `calc(var(--nav-height) + 16px)`.
- No background image or glow.

### 6.2 Heading

Reuse `SectionHeading` and the existing typography:

- Eyebrow: 12px, 600 weight, uppercase, `0.14em` letter spacing, gradient accent text.
- `h2`: `clamp(1.75rem, 3vw, 2.5rem)`, 700 weight, `1.15` line height, `-0.02em` letter spacing.
- Intro: muted text, `1rem`/`1.7`, maximum width `38ch`, `text-wrap: pretty`.
- Desktop header: two columns, `minmax(0, 1fr)` and `minmax(280px, 380px)`, 48px gap, bottom-aligned.
- Below 900px: one column, with the intro below the heading.
- Heading block: max-width `var(--container-narrow)`, centered on the page.

### 6.3 List and rows

- List: `ol` with `list-style: none`, max-width `var(--container-narrow)`, centered, top border `1px solid var(--color-border)`, top margin `var(--space-7)`.
- Rows: `li` with a top border for every row after the first.
- Row padding: 24px below 640px, 28px from 640px, 32px from 900px.
- Row grid at 640px and above:
  - Columns: `40px minmax(0, 1fr) auto`.
  - Areas: `mark identity dates` on the first line; `mark description description` on the second.
  - Column gap: 20px from 640px, 24px from 900px.
- Row grid below 640px:
  - Columns: `40px minmax(0, 1fr)`.
  - Areas: `mark identity`, `mark dates`, `mark description`.
  - Column gap: 16px.
- Company mark: 40px square, `--radius-sm`, 1px `--color-border`, background `--color-surface-raised`, centered image no larger than 24px.
- Role: `h3`, display font, `1.125rem`/600, `1.3` line height, `-0.01em` letter spacing.
- Company: `0.875rem`/1.5, muted.
- Dates: `0.75rem`/1.4, muted, right-aligned, `white-space: nowrap`; left-aligned below 640px.
- Description: `0.9375rem`/1.65, muted, `max-width: 70ch`, `text-wrap: pretty`, 12px top margin.
- No row hover state. Rows are informational and must not look interactive.

### 6.4 Timeline spine

- A 1px `--color-border` line sits at `left: 19.5px` within each row, behind the company mark.
- The line is clipped at the first and last mark so it never dangles above the first row or below the last row.
- The mark has an opaque raised-surface background and sits above the line.
- The line remains visible between rows and is hidden beneath each mark.
- Implementation can use a row-level `::before` with first/last row overrides; do not use an SVG.

## 7. Component Architecture

### 7.1 `Experience`

Create `src/components/sections/Experience.tsx` and `Experience.css`.

```ts
interface ExperienceProps {
  heading: ExperienceHeading
  experience: ExperienceItem[]
}
```

- Renders the section, `SectionHeading`, and the ordered list.
- Maps `experience` to `ExperienceRow` components.
- Does not import `content` directly.

### 7.2 `ExperienceRow`

Create `src/components/ui/ExperienceRow.tsx` and `ExperienceRow.css`.

```ts
interface ExperienceRowProps {
  entry: ExperienceItem
}
```

- Renders an `li` with class `experience-row`.
- Renders the company mark, identity, dates, and description.
- The mark is decorative: `alt=""`, `aria-hidden="true"` on the wrapper.
- Dates are plain text with a visually hidden `Dates:` prefix.
- No links or buttons inside the row.

### 7.3 App and navigation

- `App` renders `<Experience heading={content.experienceHeading} experience={content.experience} />` after Projects.
- `content.nav` gains `{ label: 'Experience', href: '#experience' }` after Projects.
- No changes to `Navbar` or `useActiveSection` are expected; they already derive section ids from the nav list.

## 8. Assets

Create three original, vector-only placeholder marks in `src/assets/logos/companies/`:

- `northwind.svg` — an abstract wind/compass mark with a single violet accent.
- `acme.svg` — a geometric chevron or triangular monogram with a single violet accent.
- `freelance.svg` — a minimal bracket or asterisk monogram with a single violet accent.

All three:

- Use a `24×24` viewBox and a transparent background.
- Use the light text color for the primary mark and violet for a small accent detail.
- Remain legible inside a 40px square at 1× and 2× density.
- Avoid embedded text or external fonts.
- Are imported in `content.ts` and named so replacement is unambiguous.

## 9. Accessibility

- The section has an accessible name via `aria-labelledby`.
- One `h2` for the section and one `h3` per role.
- The entries use `ol`/`li` semantics for chronological order.
- Company marks are decorative; the company name is available as text.
- Dates are readable as plain text and include a visually hidden `Dates:` prefix.
- Descriptions remain in normal reading order.
- No interactive elements means no new focus targets or keyboard traps.
- Text contrast follows the existing tokens.
- The section remains usable at 320px without horizontal scrolling.
- No motion is required, so there is no reduced-motion behavior to add.

## 10. Performance

- Use local SVG assets imported through Vite.
- Company marks use `loading="lazy"` and `decoding="async"`.
- Provide explicit `width` and `height` on mark images to prevent layout shift.
- No new dependencies, icon libraries, animation libraries, or external image requests.
- No entrance animation that could hide content if JavaScript or IntersectionObserver fails.

## 11. Verification

Run:

- `npm run build`
- `npm run lint`

Browser checks at 1440, 1024, 900, 768, 640, 360, and 320px:

- Experience appears after Projects and the navbar link lands correctly.
- The heading is left-aligned on the 880px rail and the intro aligns to the right at desktop.
- Three rows render with mark, role, company, dates, and description.
- Dates align right at 640px and above and move beneath the company below 640px.
- The timeline spine is continuous between marks and does not extend past the first or last mark.
- Company marks load and are not distorted.
- Long role names and descriptions wrap without overflow.
- No horizontal scrolling.
- Active nav state switches between Home, Projects, and Experience.
- No console errors or failed asset requests.
- There are no focusable elements inside the experience rows.

## 12. Acceptance Criteria

- [ ] `ExperienceHeading` and the revised `ExperienceItem` exist in `src/data/types.ts`.
- [ ] `content.ts` exports three clearly marked placeholder entries and an editable Experience heading.
- [ ] Experience renders after Projects with a left-aligned `02 / Career` eyebrow and `Experience` heading.
- [ ] Three hairline-separated rows render on the shared 880px rail.
- [ ] Each row shows a company mark, role, company, dates, and description.
- [ ] The timeline spine connects the marks without dangling ends.
- [ ] Dates are right-aligned at 640px and above and stack below the company on smaller screens.
- [ ] `Experience` appears in the navbar and receives the active state when scrolled into view.
- [ ] Company marks are decorative and have empty alt text.
- [ ] No horizontal overflow at 320px.
- [ ] Build and lint pass with no new warnings.
- [ ] No new dependencies are added.
