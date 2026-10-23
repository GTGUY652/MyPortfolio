# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Experience section after Projects with a left-aligned editorial header, three hairline-separated roles, local placeholder company marks, a subtle timeline spine, and responsive/accessible behavior.

**Architecture:** A new `Experience` section composes the existing `SectionHeading` and a new `ExperienceRow` list item. All heading copy, roles, dates, descriptions, and logo references stay in `content.ts`; the row owns its grid and timeline styling. No new dependencies or animation framework are introduced.

**Tech Stack:** React 19.3, TypeScript 6.0, Vite 8.3, plain CSS, existing design tokens, local SVGs.

**Spec:** `docs/superpowers/specs/2026-10-22-experience-section-design.md`

## Global Constraints

- Dark theme only. Use the existing tokens in `src/styles/tokens.css`; do not add colors, radii, or motion values outside them.
- Do not add runtime dependencies, CSS frameworks, icon libraries, animation libraries, or routers.
- Do not push this branch. Commit locally after each task; the user will review before any push or merge.
- All heading copy, roles, companies, dates, descriptions, and logo references live in `src/data/content.ts`. Components must not hard-code experience content.
- Placeholder experience remains clearly marked with a `PLACEHOLDER` comment. Do not invent awards, client names, revenue, or user counts.
- Only the existing `Home` and `Projects` links and the new `Experience` link appear in the navbar. Do not add a Contact link before Contact exists.
- Use the shared `--container-narrow` rail for the heading and list. Do not center the heading text.
- The section is informational. Rows are not links and must not gain hover states that imply interactivity.
- Company marks are decorative because the company name is adjacent text. Use empty alt text and local SVG assets.
- Plain CSS co-located with components. Use component-prefixed class names.
- Responsive target: 320px through 1440px with no horizontal scrolling.
- Accessibility: one `h2`, one `h3` per role, ordered-list semantics, a focused heading structure, and readable dates.
- No `any`, no unused imports, no `TODO`/`TBD` comments.
- No automated test framework exists in this project. Verification uses `npm run build`, `npm run lint`, and the browser checks in Task 4.

## Review Focus

These are the failure modes a reasonable visitor would hit that the happy-path build does not prove. Each is checked in Task 4.

1. **320px viewport and 200% zoom** — the heading, role, company, dates, and description must wrap without horizontal scrolling; the timeline spine must remain aligned with the 40px marks.
2. **640px breakpoint** — dates must sit on the role line at 640px and above, then move beneath the company below 640px without overlapping the description.
3. **Timeline ends** — the 1px spine must be clipped at the first and last company mark so it never dangles above the first row or below the last row.
4. **Content replacement** — replacing a role, company, date, description, or mark in `content.ts` must update the UI without touching component code; long content must wrap without breaking the row grid.
5. **Navbar behavior** — the new `Experience` link must scroll to the section and participate in active-section tracking without breaking the existing Home and Projects links.

---

## File Structure

### Create

| Path | Responsibility |
|---|---|
| `src/assets/logos/companies/northwind.svg` | 24×24 abstract wind mark for Northwind Studio. |
| `src/assets/logos/companies/acme.svg` | 24×24 geometric A mark for Acme Labs. |
| `src/assets/logos/companies/freelance.svg` | 24×24 bracket monogram for Freelance. |
| `src/components/ui/ExperienceRow.tsx` | One experience row with mark, identity, dates, and description. |
| `src/components/ui/ExperienceRow.css` | Row grid, timeline spine, typography, and responsive rules. |
| `src/components/sections/Experience.tsx` | Experience section composition. |
| `src/components/sections/Experience.css` | Section spacing, top border, heading rail, and list rail. |

### Modify

| Path | Change |
|---|---|
| `src/data/types.ts` | Remove `logoAlt`; add `ExperienceHeading`; add `experienceHeading` to `SiteContent`. |
| `src/data/content.ts` | Import company marks; add the Experience nav link, heading, and three placeholder entries. |
| `src/App.tsx` | Render `Experience` after `Projects`. |

### Delete

None.

---

## Task 1: Experience Content and Placeholder Marks

**Files:**
- Create: `src/assets/logos/companies/northwind.svg`
- Create: `src/assets/logos/companies/acme.svg`
- Create: `src/assets/logos/companies/freelance.svg`
- Modify: `src/data/types.ts`
- Modify: `src/data/content.ts`

**Interfaces:**
- Consumes: existing `SiteContent`, `ExperienceItem`, and `NavItem` types.
- Produces: `ExperienceHeading`; revised `ExperienceItem` without `logoAlt`; `content.experienceHeading`; `content.experience` with three populated entries; the Experience nav link.

- [ ] **Step 1: Create the Northwind mark**

Create `src/assets/logos/companies/northwind.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M4 7.5h10.2a3.2 3.2 0 1 0-2.9-4.6" stroke="#f4f4f5" stroke-width="1.7" stroke-linecap="round"/>
  <path d="M4 12h13.8a3.4 3.4 0 1 1-3 5.1" stroke="#f4f4f5" stroke-width="1.7" stroke-linecap="round"/>
  <path d="M4 16.5h6.2" stroke="#c084fc" stroke-width="1.7" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 2: Create the Acme mark**

Create `src/assets/logos/companies/acme.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M4 19 12 4l8 15" stroke="#f4f4f5" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M8.2 14h7.6" stroke="#c084fc" stroke-width="1.7" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Create the Freelance mark**

Create `src/assets/logos/companies/freelance.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M9 4H4v16h5" stroke="#f4f4f5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4h5v16h-5" stroke="#f4f4f5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="2" fill="#c084fc"/>
</svg>
```

- [ ] **Step 4: Update the experience types**

Modify `src/data/types.ts` so `ExperienceItem` reads:

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

Add this interface immediately after `ExperienceItem`:

```ts
export interface ExperienceHeading {
  index: string
  label: string
  title: string
  intro: string
}
```

Update `SiteContent` so it reads:

```ts
export interface SiteContent extends HeroContent {
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  projectsHeading: ProjectsHeading
  experience: ExperienceItem[]
  experienceHeading: ExperienceHeading
  socials: SocialLink[]
}
```

- [ ] **Step 5: Add the company imports and content to `content.ts`**

Add these imports after the existing image imports:

```ts
import acmeLogoUrl from '../assets/logos/companies/acme.svg'
import freelanceLogoUrl from '../assets/logos/companies/freelance.svg'
import northwindLogoUrl from '../assets/logos/companies/northwind.svg'
```

Add `ExperienceHeading` and `ExperienceItem` to the type import:

```ts
import type {
  ExperienceHeading,
  ExperienceItem,
  HeroContent,
  NavItem,
  ProjectItem,
  ProjectsHeading,
  SiteContent,
  TechItem,
} from './types'
```

Replace the top placeholder comment block with:

```ts
// Placeholder content remains in this file — replace placeholder values with real details.
```

Replace the `nav` constant with:

```ts
const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  // Contact is added when that section lands.
]
```

Add these constants after the `projects` array:

```ts
const experienceHeading: ExperienceHeading = {
  index: '02',
  label: 'Career',
  title: 'Experience',
  intro:
    'A look at the teams and products I’ve contributed to, and the problems I’ve helped solve.',
}

// PLACEHOLDER CONTENT — replace these entries with real experience.
const experience: ExperienceItem[] = [
  {
    role: 'Senior Frontend Developer',
    company: 'Northwind Studio',
    start: '2023',
    end: 'Present',
    description:
      'Led front-end delivery for a multi-tenant analytics product, partnering with design and backend teams to ship clearer, faster workflows.',
    logo: northwindLogoUrl,
  },
  {
    role: 'Full-Stack Developer',
    company: 'Acme Labs',
    start: '2021',
    end: '2023',
    description:
      'Built and maintained full-stack features across customer-facing and internal tools, with a focus on reliable data flows and reusable UI patterns.',
    logo: acmeLogoUrl,
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    start: '2020',
    end: '2021',
    description:
      'Designed and shipped responsive sites for small businesses, handling everything from discovery and UI to deployment and handoff.',
    logo: freelanceLogoUrl,
  },
]
```

Update the exported `content` object so it reads:

```ts
export const content: SiteContent = {
  ...hero,
  nav,
  tech,
  projectsHeading,
  projects,
  experienceHeading,
  experience,
  socials: [],
}
```

- [ ] **Step 6: Verify the content layer**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The SVG imports resolve, the revised `ExperienceItem` matches the three entries, and `SiteContent` is satisfied by `experienceHeading`.

- [ ] **Step 7: Commit**

```powershell
git add src/assets/logos/companies/northwind.svg src/assets/logos/companies/acme.svg src/assets/logos/companies/freelance.svg src/data/types.ts src/data/content.ts
git commit -m "feat: add experience content and company marks"
```

---

## Task 2: Experience Row

**Files:**
- Create: `src/components/ui/ExperienceRow.tsx`
- Create: `src/components/ui/ExperienceRow.css`

**Interfaces:**
- Consumes: `ExperienceItem` and the existing design tokens.
- Produces: `ExperienceRow({ entry })`, an `li` with a decorative mark, role, company, dates, and description.

- [ ] **Step 1: Create `ExperienceRow.tsx`**

```tsx
import type { ExperienceItem } from '../../data/types'
import './ExperienceRow.css'

interface ExperienceRowProps {
  entry: ExperienceItem
}

export function ExperienceRow({ entry }: ExperienceRowProps) {
  return (
    <li className="experience-row">
      <div className="experience-row__mark" aria-hidden="true">
        <img
          src={entry.logo}
          alt=""
          width="24"
          height="24"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="experience-row__identity">
        <h3 className="experience-row__role">{entry.role}</h3>
        <p className="experience-row__company">{entry.company}</p>
      </div>

      <p className="experience-row__dates">
        <span className="visually-hidden">Dates: </span>
        {entry.start} – {entry.end}
      </p>

      <p className="experience-row__description">{entry.description}</p>
    </li>
  )
}
```

- [ ] **Step 2: Create `ExperienceRow.css`**

```css
.experience-row {
  --experience-row-pad: 24px;
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  grid-template-areas:
    'mark identity'
    'mark dates'
    'mark description';
  align-items: start;
  column-gap: var(--space-4);
  padding-block: var(--experience-row-pad);
}

.experience-row + .experience-row {
  border-top: 1px solid var(--color-border);
}

.experience-row::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 19.5px;
  width: 1px;
  background: var(--color-border);
  pointer-events: none;
}

.experience-row:first-child::before {
  top: calc(var(--experience-row-pad) + 20px);
}

.experience-row:last-child::before {
  bottom: auto;
  height: calc(var(--experience-row-pad) + 20px);
}

.experience-row:only-child::before {
  display: none;
}

.experience-row__mark {
  position: relative;
  z-index: 1;
  grid-area: mark;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
}

.experience-row__mark img {
  width: 24px;
  height: 24px;
}

.experience-row__identity {
  grid-area: identity;
  min-width: 0;
}

.experience-row__role {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-wrap: balance;
}

.experience-row__company {
  margin-top: 2px;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.5;
}

.experience-row__dates {
  grid-area: dates;
  margin-top: 4px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.4;
  white-space: nowrap;
}

.experience-row__description {
  grid-area: description;
  max-width: 70ch;
  margin-top: var(--space-3);
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  text-wrap: pretty;
}

@media (min-width: 640px) {
  .experience-row {
    --experience-row-pad: 28px;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    grid-template-areas:
      'mark identity dates'
      'mark description description';
    column-gap: 20px;
  }

  .experience-row__dates {
    margin-top: 2px;
    text-align: right;
  }
}

@media (min-width: 900px) {
  .experience-row {
    --experience-row-pad: 32px;
    column-gap: var(--space-5);
  }

  .experience-row__role {
    font-size: 1.25rem;
  }
}
```

- [ ] **Step 3: Verify the row component compiles**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass with no unused imports. The component is not rendered yet, but TypeScript still checks its types.

- [ ] **Step 4: Commit**

```powershell
git add src/components/ui/ExperienceRow.tsx src/components/ui/ExperienceRow.css
git commit -m "feat: add experience row"
```

---

## Task 3: Experience Section and Integration

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Create: `src/components/sections/Experience.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `ExperienceHeading`, `ExperienceItem`, `ExperienceRow`, and `SectionHeading`.
- Produces: `Experience({ heading, experience })` rendered after `Projects` in `App`.

- [ ] **Step 1: Create `Experience.tsx`**

```tsx
import type { ExperienceHeading, ExperienceItem } from '../../data/types'
import { ExperienceRow } from '../ui/ExperienceRow'
import { SectionHeading } from '../ui/SectionHeading'
import './Experience.css'

interface ExperienceProps {
  heading: ExperienceHeading
  experience: ExperienceItem[]
}

export function Experience({ heading, experience }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          index={heading.index}
          label={heading.label}
          title={heading.title}
          titleId="experience-title"
        >
          <p>{heading.intro}</p>
        </SectionHeading>

        <ol className="experience__list" role="list">
          {experience.map((entry) => (
            <ExperienceRow
              key={`${entry.company}-${entry.start}`}
              entry={entry}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `Experience.css`**

```css
.experience {
  padding-block: var(--section-padding);
  border-top: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.experience .section-heading {
  max-width: var(--container-narrow);
  margin-inline: auto;
}

.experience__list {
  max-width: var(--container-narrow);
  margin: var(--space-7) auto 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 3: Render Experience from `App.tsx`**

Add the import:

```tsx
import { Experience } from './components/sections/Experience'
```

Add the section after `Projects`:

```tsx
<main id="main" tabIndex={-1}>
  <Hero hero={content} tech={content.tech} />
  <Projects
    heading={content.projectsHeading}
    projects={content.projects}
  />
  <Experience
    heading={content.experienceHeading}
    experience={content.experience}
  />
</main>
```

- [ ] **Step 4: Verify the integrated section**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The nav data now includes `Experience`, and `App` passes the typed Experience content.

- [ ] **Step 5: Commit**

```powershell
git add src/components/sections/Experience.tsx src/components/sections/Experience.css src/App.tsx
git commit -m "feat: add experience section"
```

---

## Task 4: Final Verification

**Files:**
- Modify only if verification finds a defect.

**Interfaces:**
- Consumes: the complete Experience section, navbar, and placeholder marks.
- Produces: a verified, local commit set; no push.

- [ ] **Step 1: Re-run the production checks**

```powershell
npm run build
npm run lint
```

Expected: build succeeds with no TypeScript errors; lint prints no findings.

- [ ] **Step 2: Start the app**

```powershell
npm run dev
```

Open the local Vite URL in the browser.

- [ ] **Step 3: Check the primary desktop layout**

At `1440×900`:

1. Scroll past Projects. The section has a top border, the `02 / Career` eyebrow, the `Experience` h2, and the intro in the right column.
2. Three rows are separated by hairlines on the 880px rail.
3. Each row shows a company mark, role, company, right-aligned dates, and description.
4. The timeline spine runs between the marks and does not extend above the first mark or below the last mark.
5. No horizontal scrollbar appears.

- [ ] **Step 4: Check the responsive breakpoints**

Check these widths:

1. `1024×900` — three-column row layout; dates right-aligned.
2. `900×900` — same layout; the 32px row padding is active.
3. `768×800` — dates remain right-aligned; description stays beneath the role.
4. `640×800` — dates remain on the role line; 28px row padding.
5. `639×800` — dates move beneath the company; description follows; 24px row padding.
6. `360×800` — role, company, dates, and description wrap without overlap.
7. `320×800` — no horizontal scrolling, clipped text, or mark overflow.

At `200%` browser zoom on desktop, confirm the heading, rows, dates, and descriptions reflow without clipping.

- [ ] **Step 5: Check navigation and active state**

1. Activate `Experience` in the navbar; the page scrolls to the section and the link receives the active state.
2. Scroll between Home, Projects, and Experience; the active underline changes appropriately.
3. Confirm the section does not create any unexpected focusable elements. Tabbing should move from the navbar to the next real interactive element, not into the rows.

- [ ] **Step 6: Check content replacement and long content**

In `src/data/content.ts`, temporarily change the first entry's role to a long string such as `Senior Frontend Developer and Design Systems Lead`, then confirm:

1. HMR updates the row.
2. The role wraps within the content column.
3. The dates stay aligned and do not overlap the role.
4. The mark and timeline spine remain aligned.

Revert the change. If you want to test the spine with four rows, temporarily duplicate the first entry with a different company/start key, confirm the connectors and separators adapt, then remove the duplicate and confirm the original layout returns.

- [ ] **Step 7: Check assets, heading semantics, and console**

1. All three company marks load from local assets and are sharp rather than stretched.
2. The page has one `experience-title` h2 and one h3 per role.
3. The company marks are not announced as images; only the company name is read.
4. Dates are read with the hidden `Dates:` prefix.
5. The browser console shows no errors, React warnings, or failed asset requests.

- [ ] **Step 8: Commit any verification fixes**

If Steps 3–7 required code changes, commit them:

```powershell
git add -A
git commit -m "fix: polish experience section"
```

If no changes were required, do not create an empty commit.

- [ ] **Step 9: Report the local commit set**

Run:

```powershell
git status --short
git log --oneline -5
```

Expected: a clean working tree and the task commits on `feat/experience-section`. Do not push.

---

## Final Acceptance Checklist

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] Experience renders after Projects with the `02 / Career` eyebrow and `Experience` heading.
- [ ] The heading and list are aligned to the shared 880px rail.
- [ ] Three hairline-separated rows render with mark, role, company, dates, and description.
- [ ] The timeline spine is continuous between marks and clipped at the first and last mark.
- [ ] Dates are right-aligned at 640px and above and stack below the company on smaller screens.
- [ ] The navbar contains Home, Projects, and Experience; the active link updates correctly.
- [ ] Company marks load from local SVGs, are decorative, and are not distorted.
- [ ] No horizontal scrolling at 320px or at 200% zoom.
- [ ] No new dependencies were added.
- [ ] The working tree is clean and all changes are committed locally; nothing is pushed.
