# Projects Section Design

**Date:** 2026-10-22  
**Status:** Approved design, ready for implementation planning  
**Supersedes:** The Projects-specific details in `docs/superpowers/specs/2026-10-22-portfolio-shell-design.md` (notably the four-card 2×2 grid and animated entrance reveal).

## 1. Context

The portfolio currently contains only the navbar and hero section. Projects is the next section in the page narrative: after introducing the developer, it must show credible evidence of how they approach interfaces, data, and implementation.

The reference provided by the user shows two image-led cards under a centered `PROJECTS` heading. This design keeps the two-project focus and the strong preview imagery, but replaces the centered heading and the small “CLICK HERE TO VISIT” line with a more editorial, recruiter-friendly treatment consistent with the existing dark violet→magenta system.

The first version uses realistic placeholder projects. The structure must make it easy to replace names, copy, images, tags, and URLs later without changing component code.

## 2. Goals

- Add a polished Projects section immediately after the hero.
- Show two featured projects with enough context to be understood at a glance.
- Make each project preview the dominant visual element while keeping the card readable and accessible.
- Preserve the existing visual system: dark surfaces, 1px borders, restrained accent gradient, no heavy shadows.
- Keep all assets local and avoid new dependencies.
- Make the section easy to update through the typed content file.
- Add Projects to the navbar and active-section tracking.

## 3. Non-goals

- Real project screenshots or real project data in this pass.
- Case-study pages, filters, carousels, modals, or “load more” behavior.
- Additional project cards beyond the two featured placeholders.
- Scroll-triggered entrance animation. The section must be visible immediately.
- Contact, Experience, footer, or other later sections.
- A CMS or automated content pipeline.

## 4. User Experience

### 4.1 Section composition

The section uses the existing container, section padding, and dark background.

- A 1px top border separates Projects from the hero.
- The header is a two-column editorial block at desktop:
  - Left: a gradient eyebrow reading `01 / Selected work`, followed by an `h2` reading `Projects`.
  - Right: a short intro paragraph, aligned to the bottom of the heading block.
- The cards sit below the header in a two-column grid with a 24px gap.
- The section heading is left-aligned, matching the planned Experience and Contact sections. It deliberately does not repeat the hero’s centered composition.
- The accent remains violet→magenta. No orange or per-section accent color is introduced.
- `Projects` is added to the navbar after `Home`, linking to `#projects`.

### 4.2 Card anatomy

Each project card is one large, fully clickable link. There are no nested links or buttons inside the card.

From top to bottom:

1. **Preview** — 16:10 image filling the card width, with rounded top corners and a 1px bottom border.
2. **Meta row** — category label on the left, year on the right. The category is small, uppercase, and accent-colored; the year is muted.
3. **Title row** — project name as an `h3` with an arrow icon at the right.
4. **Summary** — one short paragraph explaining what the project is and what it demonstrates.
5. **Tags** — two or three compact technology chips, wrapping when needed.

The tiny “CLICK HERE TO VISIT” cue from the reference is deliberately omitted. The whole card is a link, the arrow indicates navigation, and the card’s accessible name explains where it leads.

## 5. Content Model

### 5.1 Type changes

Extend `ProjectItem` in `src/data/types.ts`:

```ts
export interface ProjectItem {
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  href: string
}
```

Add a typed heading object so section copy remains editable in `content.ts`:

```ts
export interface ProjectsHeading {
  index: string
  label: string
  title: string
  intro: string
}
```

Add `projectsHeading: ProjectsHeading` to `SiteContent`.

### 5.2 Placeholder content

The following entries are fictional and must be marked with a `PLACEHOLDER` comment in `content.ts`. They should read like realistic portfolio work, not lorem ipsum.

**Section heading**

- Index: `01`
- Label: `Selected work`
- Title: `Projects`
- Intro: `A selection of interfaces and systems I’ve built from concept through launch.`

**Project 1 — Atlas**

- Title: `Atlas`
- Category: `Analytics dashboard`
- Year: `2025`
- Description: `A concept analytics workspace that turns multi-source product data into clear, actionable views.`
- Tags: `React`, `TypeScript`, `PostgreSQL`
- Image alt: `Preview of the Atlas analytics dashboard`
- URL: `https://example.com`

**Project 2 — Nova**

- Title: `Nova`
- Category: `E-commerce storefront`
- Year: `2024`
- Description: `A storefront concept pairing editorial product storytelling with a streamlined shopping path.`
- Tags: `React`, `Tailwind CSS`, `Supabase`
- Image alt: `Preview of the Nova storefront`
- URL: `https://example.com`

The placeholder URLs, names, and descriptions must be easy to find and replace. No fake awards, user counts, revenue figures, or client names.

## 6. Visual Specification

### 6.1 Section

- Element: `<section id="projects" className="projects" aria-labelledby="projects-title">`
- Padding: `var(--section-padding)` top and bottom.
- Top border: `1px solid var(--color-border)`.
- Scroll margin: `calc(var(--nav-height) + 16px)`.
- No new background image or heavy glow. The section stays on the shared dark field.

### 6.2 Heading

The reusable heading block uses the existing typography scale.

- Eyebrow: 12px, 600 weight, uppercase, `0.14em` letter spacing, gradient accent text.
- `h2`: `clamp(1.75rem, 3vw, 2.5rem)`, 700 weight, `1.15` line height, `-0.02em` letter spacing.
- Intro: muted text, `1rem`/`1.7`, maximum width `38ch`, `text-wrap: pretty`.
- Desktop header: two columns, `minmax(0, 1fr)` and `minmax(280px, 380px)`, 48px gap, bottom-aligned.
- Below 900px: one column, with the intro below the heading.

### 6.3 Cards

- Grid: one column by default; two equal columns at 900px and above; 24px gap.
- Card surface: `--color-surface`.
- Border: `1px solid var(--color-border)`, radius `var(--radius-lg)`.
- No box shadow.
- Card is a flex column so both cards stretch to equal height.
- Media wrapper: `aspect-ratio: 16 / 10`, `overflow: hidden`, background `--color-surface-raised`, bottom border.
- Image: `width: 100%`, `height: 100%`, `object-fit: cover`, `loading="lazy"`, `decoding="async"`, explicit `width="1600"` and `height="1000"`.
- Body padding: 24px desktop, 20px below 640px.
- Meta row: flex, space-between, 12px text; category is uppercase with `0.08em` letter spacing and `--color-accent-from`; year is muted.
- Title row: flex, space-between, 16px gap; title at `1.25rem`/600, arrow 20px, muted by default.
- Summary: `0.9375rem`/1.65, muted, `text-wrap: pretty`.
- Tags: `margin-top: auto`, flex wrap, 8px gap; chips use 12px muted text, 1px border, 999px radius, 5px 9px padding, raised surface background.
- Tags use a `ul` and `li` structure with an accessible label tied to the project title.

### 6.4 Interaction

- Hover and focus-visible:
  - Card border changes to `--color-accent-from`.
  - Card translates up 2px.
  - Preview image scales to `1.03`.
  - Arrow moves up and right and adopts the accent color.
- The focus-visible outline remains visible and is not clipped by the card.
- Hover transforms are applied only for devices with hover capability. Focus-visible styles always apply.
- Under `prefers-reduced-motion: reduce`, all transforms and image scaling are disabled. Border and color changes remain.

## 7. Component Architecture

### 7.1 `SectionHeading`

Create `src/components/ui/SectionHeading.tsx` and `SectionHeading.css`.

```ts
interface SectionHeadingProps {
  index: string
  label: string
  title: string
  titleId: string
  children?: ReactNode
}
```

Renders:

- A `<header className="section-heading">`.
- An eyebrow with `{index} / {label}`.
- An `h2` with `id={titleId}` and `{title}`.
- An optional aside containing the intro copy.

This component is designed for reuse by Experience and Contact.

### 7.2 `ProjectCard`

Create `src/components/ui/ProjectCard.tsx` and `ProjectCard.css`.

```ts
interface ProjectCardProps {
  project: ProjectItem
}
```

- Uses `useId()` to create a unique title id and external-context id.
- Renders one `<a>` with `href`, `target="_blank"`, and `rel="noopener noreferrer"`.
- The link uses `aria-labelledby` pointing at the project title and a visually hidden “opens in a new tab” span, so its accessible name is concise and unambiguous.
- `h3` uses the generated title id.
- The arrow icon is `ArrowUpRight` from the existing icon set and is `aria-hidden`.
- The card image uses the project’s `image` and `imageAlt`.
- No interactions are nested inside the anchor.

### 7.3 `Projects`

Create `src/components/sections/Projects.tsx` and `Projects.css`.

```ts
interface ProjectsProps {
  heading: ProjectsHeading
  projects: ProjectItem[]
}
```

- Renders the section, `SectionHeading`, and the project grid.
- Maps `projects` to `ProjectCard` components.
- Does not import `content` directly.

### 7.4 App and navigation

- `App` renders `<Projects heading={content.projectsHeading} projects={content.projects} />` after `Hero`.
- `content.nav` gains `{ label: 'Projects', href: '#projects' }`.
- No changes to `Navbar` or `useActiveSection` are expected; they already derive section ids from the nav list.
- The existing hero and tech strip remain unchanged.

## 8. Assets

Create two local SVGs in `src/assets/images/`:

- `project-atlas-placeholder.svg` — 1600×1000.
- `project-nova-placeholder.svg` — 1600×1000.

Both must be original, vector-only placeholder previews. They should look like miniature product interfaces rather than gradient posters.

- **Atlas:** dark analytics workspace with a restrained sidebar, top toolbar, three metric blocks, a line chart with grid lines, and a compact data table. Use violet and cool cyan accents.
- **Nova:** editorial storefront preview with a cream or warm surface, a prominent product feature panel, and a small product grid. Use magenta and deep plum accents.
- Both should remain legible when displayed at roughly 548×342px; avoid relying on tiny text.
- A subtle project wordmark or browser chrome may be included, but large “PROJECT 01” labels are not used.
- Both assets are imported in `content.ts` and named `*-placeholder.svg` so replacement is unambiguous.

## 9. Accessibility

- The section has an accessible name via `aria-labelledby`.
- One `h2` for the section and one `h3` per project.
- Each card is a single link with a clear accessible name, such as `Atlas project — opens in a new tab`.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- The focus ring is visible on the entire card; keyboard users can reach every project.
- Images have descriptive alt text from the content file.
- Tags are read as a labelled list, not as links.
- Color is never the only signal: hover/focus also changes the border, arrow position, and image scale.
- Text contrast follows the existing tokens.
- Reduced-motion preferences disable all transform-based motion.
- The section remains usable at 320px without horizontal scrolling.

## 10. Performance

- Use local SVG assets imported through Vite.
- Below-the-fold images use `loading="lazy"` and `decoding="async"`.
- Provide explicit dimensions to prevent layout shift.
- No new dependencies, icon libraries, animation libraries, or external image requests.
- No entrance animation that could hide content if JavaScript or IntersectionObserver fails.

## 11. Verification

Run:

- `npm run build`
- `npm run lint`

Browser checks at 1440, 1024, 900, 768, 640, 360, and 320px:

- Projects appears after the hero and the navbar link lands correctly.
- Two columns at 900px and above; one column below.
- Both front images load and are not distorted.
- Cards remain equal height in two-column mode.
- Long titles, summaries, and tags wrap without overflow.
- No horizontal scrolling.
- Whole-card hover and keyboard focus produce the intended border/arrow/image states.
- Tab order reaches both cards and the focus ring is visible.
- Active nav state switches between Home and Projects.
- No console errors or failed asset requests.
- Reduced-motion mode removes card and image transforms.

## 12. Acceptance Criteria

- [ ] `ProjectItem` includes `category` and `year`.
- [ ] `content.ts` contains two clearly marked placeholder projects and an editable Projects heading.
- [ ] Projects renders after the hero with a left-aligned `01 / Selected work` eyebrow and `Projects` heading.
- [ ] Two equal cards render at ≥900px and stack below 900px.
- [ ] Each card shows preview, category/year, title, arrow, summary, and tags.
- [ ] The entire card is one external link and is keyboard focusable.
- [ ] Both local placeholder SVGs render correctly.
- [ ] `Projects` appears in the navbar and receives the active state when scrolled into view.
- [ ] Hover and focus states match the design and respect reduced motion.
- [ ] No horizontal overflow at 320px.
- [ ] Build and lint pass with no new warnings.
- [ ] No new dependencies are added.
