# Personal Portfolio — Shell Design

**Date:** 2026-10-22
**Status:** Awaiting review
**Scope:** Milestone 1 — the visual and structural shell of a single-page portfolio, with placeholder content and placeholder assets. Real copy and images are supplied later.

## 1. Context

The repository is a fresh Vite 8 + React 19 + TypeScript 6 scaffold. It currently renders the default Vite starter page. The build and lint both pass.

The owner wants a personal portfolio that serves two audiences equally:

- recruiters and hiring managers evaluating full-time roles
- freelance clients evaluating project work

The visual reference is a set of three screenshots: dark page, sticky top navigation, centered hero with an avatar and two CTAs, a technology logo strip, a project card grid, a chronological experience list, and a contact section with email and social links.

This milestone builds the full page shell so the owner can evaluate layout, motion, responsiveness, and asset handling before spending time on final copy and imagery.

## 2. Goals and success criteria

- The page contains every section from the reference: navigation, hero, projects, experience, contact, footer.
- The layout is responsive and usable from 360px to 1440px wide with no horizontal scrolling.
- Visuals follow the reference's structure but use one consistent accent instead of the reference's per-section orange/purple/blue.
- All copy, links, and image references live in one typed data file; replacing real content requires no component edits.
- Placeholder images use the same aspect ratios as the eventual real images, so swapping them causes no layout shift.
- Keyboard navigation, focus visibility, landmarks, alt text, and reduced-motion support are in place.
- `npm run build` and `npm run lint` pass with no errors.
- No runtime dependencies beyond two locally bundled font packages.

## 3. Scope

### In scope

- Single-page layout with anchor navigation.
- Navbar, hero, projects, experience, contact, footer.
- Typed content file with realistic fictional placeholder copy.
- Locally authored SVG placeholders for the avatar, project thumbnails, and company marks.
- Simple Icons brand SVGs for the technology strip, stored locally.
- Inline SVG UI icons.
- One-page placeholder CV PDF so the "Download CV" control behaves realistically.
- Dark theme only.
- Responsive behaviour, accessibility, and reduced-motion handling.
- Basic SEO metadata and a placeholder favicon.
- README documenting how to swap content and assets.

### Out of scope

- Real biography, project copy, employer names, or links.
- Real photographs, project screenshots, or company logos.
- Contact form or backend.
- Analytics, cookie consent, or tracking.
- Blog, case-study routes, or a router.
- Light theme or theme toggle.
- Internationalisation.
- Automated test suite (see §13).
- Deployment configuration, custom domain, Open Graph image.
- CMS or MDX content pipeline.

## 4. Information architecture

One page with four anchored sections, followed by a footer:

| Order | Section | Anchor | Nav label |
|---|---|---|---|
| 1 | Hero | `#home` | Home |
| 2 | Projects | `#projects` | Projects |
| 3 | Experience | `#experience` | Experience |
| 4 | Contact | `#contact` | Contact |

A footer follows the contact section but is not a nav target.

The document starts with a skip link to `#main`. `main` wraps the four sections. `header` contains the navbar. `footer` is separate.

## 5. Content model

`src/data/types.ts` defines the contract. `src/data/content.ts` exports a single `content` object of type `SiteContent`.

```ts
export interface NavItem {
  label: string
  href: `#${string}`
}

export type SocialIcon = 'github' | 'linkedin' | 'x' | 'instagram'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export interface TechItem {
  name: string
  src: string
}

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  href: string
}

export interface ExperienceItem {
  role: string
  company: string
  start: string
  end: string
  description: string
  logo: string
  logoAlt: string
}

export interface SiteContent {
  name: string
  monogram: string
  role: string
  headline: {
    lineOne: string
    lineTwo: string
    accent: string
  }
  summary: string
  email: string
  cvUrl: string
  avatar: string
  avatarAlt: string
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
  socials: SocialLink[]
}
```

### Placeholder content

Every value is fictional and visibly marked with a `PLACEHOLDER` comment in `content.ts`. No real employer claims are used.

- Name: `Your Name`; monogram: `YN`; role: `Full-Stack Developer`.
- Headline: `I build fast,` / `accessible products` / accent `for the web.`
- Summary: a two-sentence paragraph describing building responsive, accessible web products with teams and clients.
- Email: `hello@example.com`.
- CV: `/cv-placeholder.pdf`.
- Projects: four entries — Atlas (analytics dashboard), Nova (storefront), Relay (realtime collaboration), Orbit (developer tooling). Each has a 2–3 line description, three technology tags, and `href: 'https://example.com'`.
- Experience: three entries — Northwind Studio (Senior Frontend Developer, 2023 — Present), Acme Labs (Full-Stack Developer, 2021 — 2023), Freelance (Web Developer, 2020 — 2021). One to two sentences each.
- Tech strip: JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker.
- Socials: GitHub, LinkedIn, X, Instagram, all pointing at `https://example.com`.

The placeholder text is intentionally realistic in length so the layout is stress-tested, not lorem ipsum.

## 6. Visual system

### Colour tokens (`src/styles/tokens.css`)

```css
--color-bg: #0b0b0d;
--color-surface: #141416;
--color-surface-raised: #1b1b1f;
--color-border: #2a2a30;
--color-border-strong: #3f3f46;
--color-text: #f4f4f5;
--color-text-muted: #a1a1aa;
--color-accent-from: #c084fc;
--color-accent-to: #f472b6;
--gradient-accent: linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to));
--color-focus: #c084fc;
```

Contrast requirements: body text `#f4f4f5` and muted text `#a1a1aa` on `#0b0b0d` must meet at least 4.5:1. Accent gradient text is reserved for large display text and 12px uppercase eyebrows; both gradient stops must remain at least 4.5:1 against the background.

### Typography

- Display: `Space Grotesk Variable`, fallback `system-ui, sans-serif`.
- Body: `Inter Variable`, fallback `system-ui, sans-serif`.
- Both bundled via `@fontsource-variable/inter` and `@fontsource-variable/space-grotesk`; no Google Fonts CDN.

| Role | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| Hero h1 | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | 700 | -0.03em |
| Section h2 | `clamp(1.75rem, 3vw, 2.5rem)` | 1.15 | 700 | -0.02em |
| Card/row h3 | `1.125rem` | 1.3 | 600 | -0.01em |
| Body | `1rem` | 1.65 | 400 | 0 |
| Small/meta | `0.8125rem` | 1.5 | 400 | 0 |
| Eyebrow | `0.75rem` | 1.4 | 600 | 0.14em, uppercase |

Body copy is capped at `62ch`.

### Spacing, shape, layout

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--container: 1120px;
--gutter: clamp(20px, 5vw, 32px);
--section-padding: clamp(64px, 9vw, 112px);
--nav-height: 72px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-reveal: 500ms;
```

- No box shadows. Separation comes from borders, surface tints, and spacing.
- One gradient accent used for hero accent text, section eyebrow labels, hover borders, and the email underline.
- Container helper: `width: min(calc(100% - 2 * var(--gutter)), var(--container)); margin-inline: auto`.
- Sections use `scroll-margin-top: calc(var(--nav-height) + 16px)`.
- Breakpoints: 640px, 900px, 1200px.
- Section headings for Projects, Experience, and Contact are left-aligned with a numbered eyebrow (`01 / Projects`, `02 / Experience`, `03 / Contact`). The hero is centered. This deliberately replaces the reference's mixed centered/left alignment with one consistent system.

## 7. Component architecture

```
src/
├── assets/
│   ├── images/                    avatar + four project placeholders
│   └── logos/
│       ├── tech/                  six brand SVGs
│       └── companies/             three monogram placeholders
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx / .css
│   │   ├── Footer.tsx / .css
│   │   └── Container.tsx
│   ├── sections/
│   │   ├── Hero.tsx / .css
│   │   ├── Projects.tsx / .css
│   │   ├── Experience.tsx / .css
│   │   └── Contact.tsx / .css
│   ├── ui/
│   │   ├── Button.tsx / .css
│   │   ├── SectionHeading.tsx / .css
│   │   ├── ProjectCard.tsx / .css
│   │   ├── ExperienceRow.tsx / .css
│   │   ├── SocialLinks.tsx / .css
│   │   └── TechStrip.tsx / .css
│   └── icons/index.tsx
├── data/
│   ├── types.ts
│   └── content.ts
├── hooks/
│   ├── useReveal.ts
│   ├── useActiveSection.ts
│   └── useScrolled.ts
├── styles/
│   ├── tokens.css
│   └── base.css
├── App.tsx
└── main.tsx
```

Plain CSS files co-located with components, using component-prefixed class names. No CSS Modules, Tailwind, or CSS-in-JS. `tokens.css` and `base.css` are imported once from `main.tsx`.

### Component contracts

- `App` — imports `content`, renders skip link, `Navbar`, `main` with four sections, `Footer`. Passes typed slices to sections; sections do not import `content` directly.
- `Navbar({ name, monogram, nav })` — sticky header. Tracks scrolled state and active section. Desktop links at ≥900px; disclosure menu below 900px with `aria-expanded` and `aria-controls`, closes on link click and Escape.
- `Hero({ headline, summary, avatar, avatarAlt, email, cvUrl, tech })` — centered avatar, h1, summary, primary `mailto:` CTA, secondary CV download, tech strip.
- `Projects({ projects })` — left-aligned heading plus 2×2 grid on desktop, single column below 900px.
- `ProjectCard({ project })` — one `<a>` wrapping image, title, arrow, description, tags. Full-card focus target.
- `Experience({ experience })` — left-aligned heading plus a list with hairline separators.
- `ExperienceRow({ entry })` — logo, role, company, dates, description. Description spans the content columns.
- `Contact({ email, socials, summary })` — left-aligned heading, paragraph, prominent email link, social icons.
- `Footer({ name })` — copyright and back-to-top link.
- `Button({ href, variant, download, children })` — anchor-based, variants `primary` and `secondary`.
- `SectionHeading({ index, label, title })` — eyebrow + h2.
- `SocialLinks({ links })` — icon links with accessible labels, opening in a new tab with `rel="noopener noreferrer"`.
- `TechStrip({ items })` — labelled list of tech logos.
- `Container({ children })` — layout wrapper.

All UI icons live in `src/components/icons/index.tsx` as inline SVG components using `currentColor`: `ArrowUpRight`, `ArrowDown`, `Mail`, `Download`, `Menu`, `Close`, `GitHub`, `LinkedIn`, `X`, `Instagram`. No icon library.

## 8. Section behaviour

### Navbar

- Height 72px. Fixed/sticky at the top. Background `rgba(11, 11, 13, 0.72)` with `backdrop-filter: blur(12px)`.
- Bottom border is transparent at the top of the page and becomes `--color-border` once `window.scrollY > 8`.
- Logo is the monogram plus an accent dot, linking to `#home`.
- Desktop links are 14px, muted by default, full text colour on hover, with a 2px gradient underline for the active section.
- Active section determined by an IntersectionObserver over the four section ids, using a centre band (`rootMargin: -40% 0px -50% 0px`).
- Mobile menu is a panel below the header: surface background, border, 44px-tall links, closes after selection, on Escape, and when the viewport reaches 900px.
- Toggle button has an accessible name that changes between "Open menu" and "Close menu".

### Hero

- Minimum height `calc(100svh - var(--nav-height))`, centred content, generous top and bottom padding; may grow beyond the viewport on short screens.
- Avatar: 176px desktop, 136px below 640px, circular, with a 4px gradient ring. Uses `object-fit: cover`.
- h1 renders `lineOne`, a `<br>`, `lineTwo`, then the accent phrase in a gradient-filled span.
- Summary is capped at 62ch and uses muted text.
- CTA row wraps on small screens; primary is a filled light button, secondary is an outlined button with an arrow icon.
- Tech strip sits below the CTAs with a 12px uppercase label and six 28px logos; brand colours are preserved.
- A subtle radial accent glow may sit behind the avatar at ≤12% opacity.

### Projects

- Four cards in a two-column grid, 24px gap; one column below 900px.
- Card surface `--color-surface`, 1px border, 16px radius, image aspect ratio 16:10, body padding 20–24px.
- Title row places the title left and an arrow icon right. Description follows, then tag chips.
- Hover and focus-visible raise the border to the accent colour, translate the card up 2px, scale the image to 1.03, and move the arrow up-right.
- The whole card is a single link with an accessible name combining project title and destination context.

### Experience

- Rows separated by 1px borders; each row is a grid of `48px minmax(0, 1fr) auto` with 20px gaps and 32px vertical padding.
- Logo is 40px, rounded 8px. Role is 18px/600, company is muted, dates are right-aligned and do not wrap.
- Description sits in the content column, capped at 75ch.
- Below 640px: logo and title share the first row, dates move under the title, description spans full width.

### Contact

- Left-aligned, max width 720px, with a top border and the same section rhythm.
- Heading, short invitation paragraph, email as a large underlined link that reveals the gradient on hover/focus, and a row of 44px social icon buttons.
- A soft radial accent glow may be used behind the section at ≤10% opacity.

### Footer

- Top border, 32px vertical padding, muted 13px text.
- Copyright with the current year and a "Back to top" link to `#home`.

## 9. Motion

- Hover/focus transitions: 150–200ms with `--ease-out`.
- Entrance reveal: opacity 0 → 1 and `translateY(16px)` → 0 over 500ms, triggered once by IntersectionObserver at 15% visibility, with a 60–70ms stagger on cards and rows.
- `scroll-behavior: smooth` on the document.
- Everything above is disabled under `prefers-reduced-motion: reduce`: no entrance transforms, no smooth scrolling, no card/image translation.
- Content is never hidden behind motion unless the browser supports the animation; the reveal initial state is scoped inside a `no-preference` media query.

## 10. Assets

### Structure and naming

- `src/assets/images/` — content imagery imported through Vite:
  - `avatar-placeholder.svg` (1:1, 400×400)
  - `project-atlas-placeholder.svg`, `project-nova-placeholder.svg`, `project-relay-placeholder.svg`, `project-orbit-placeholder.svg` (16:10, 1600×1000)
- `src/assets/logos/tech/` — `javascript.svg`, `typescript.svg`, `react.svg`, `nodedotjs.svg`, `postgresql.svg`, `docker.svg` (24×24 viewBox, brand colours, sourced from Simple Icons, CC0).
- `src/assets/logos/companies/` — `northwind-placeholder.svg`, `acme-placeholder.svg`, `freelance-placeholder.svg` (48×48 monogram marks).
- `public/favicon.svg` — monogram placeholder.
- `public/cv-placeholder.pdf` — one-page placeholder CV.
- UI icons are inline components, not files.

All image imports happen in `content.ts`. Replacing an asset means overwriting the file with the same name, or changing one import line.

### Placeholder asset design

- Avatar: 400×400 SVG, violet-to-magenta radial gradient, large `YN` monogram, subtle concentric rings. Not a stock illustration.
- Project thumbnails: 1600×1000 SVGs with dark gradient backgrounds, a faint grid, and a large `PROJECT 01`–`04` label. Each varies hue within the violet/magenta family.
- Company marks: 48×48 rounded squares with a two-letter monogram and a muted surface fill.
- Tech logos: official Simple Icons paths with authentic brand colours.

### Image handling

- Every `<img>` has explicit `width` and `height` attributes or an aspect-ratio wrapper.
- `object-fit: cover` for the avatar and project images.
- Below-the-fold images use `loading="lazy"` and `decoding="async"`.
- Alt text comes from the content file; logos in the tech strip use the technology name; decorative arrow and social icons are `aria-hidden`.
- Placeholder files are named `*-placeholder` so replacements are unambiguous.

## 11. Accessibility

- Semantic `header`, `nav`, `main`, `section`, `footer`; one `h1`, section `h2`s, card `h3`s.
- Skip link visible on focus, targeting `#main`.
- Visible `:focus-visible` ring: 2px `--color-focus`, 3px offset.
- All controls reachable and operable by keyboard; no focus traps.
- Mobile menu toggle exposes state; Escape closes it; links close it.
- Active nav link marked with `aria-current="true"`.
- Social and external links open with `rel="noopener noreferrer"` and descriptive `aria-label`s.
- Colour contrast: body and muted text ≥4.5:1; large display text ≥3:1; focus indicator ≥3:1 against adjacent colours.
- Touch targets at least 44×44px for nav links, buttons, and social icons.
- Motion respects `prefers-reduced-motion`.
- No autoplaying media; no content conveyed by colour alone.

## 12. Metadata and performance

`index.html`:

- `lang="en"`.
- Title: `Your Name — Full-Stack Developer`.
- Description: `Portfolio of Your Name, a full-stack developer building fast, accessible web products.`
- `theme-color: #0b0b0d`.
- Open Graph `og:title`, `og:description`, `og:type=website`. No OG image in this milestone.
- Placeholder favicon.

Performance:

- No runtime libraries beyond React and the two font packages.
- Fonts bundled locally, `font-display: swap`, variable weights only.
- Vite hashes all imported assets.
- No layout shift: image dimensions and font metrics accounted for.
- Target: initial JS remains within roughly 10% of the current starter bundle (about 70 kB gzip) and Lighthouse performance stays in the green for a static page.

## 13. Verification

No automated test framework is added in this milestone. This is a deliberate YAGNI decision for a static shell; tests are added when interactive behaviour grows.

Verification for every change:

1. `npm run build` passes.
2. `npm run lint` passes.
3. Manual checks at 360, 768, 1024, and 1440 widths: no horizontal scroll, readable hierarchy, no overlapping elements.
4. Keyboard-only pass: skip link, nav, mobile menu, CTAs, project cards, email, socials.
5. Reduced-motion pass via OS setting or DevTools emulation.
6. Console free of errors and React warnings.
7. Content swap rehearsal: change one project title and one image in `content.ts`/assets, confirm the UI updates without touching components.

## 14. Acceptance criteria

- [ ] All six regions render in the specified order.
- [ ] Sticky nav shows active section and gains a border after scrolling.
- [ ] Mobile menu opens, closes on selection and Escape, and is keyboard operable.
- [ ] Hero renders avatar, split headline with gradient accent, summary, both CTAs, and six tech logos.
- [ ] Four project cards render with image, title, arrow, description, and tags; whole card is clickable and focusable.
- [ ] Three experience rows render with logo, role, company, dates, and description.
- [ ] Contact renders email link and social icons.
- [ ] No horizontal scrolling at 360px.
- [ ] Focus ring visible on every interactive element.
- [ ] Reduced motion removes entrance animation and smooth scrolling.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Replacing copy and images requires edits only in `content.ts` and `assets/`.
- [ ] README explains setup and content replacement.

## 15. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Placeholder content mistaken for real claims | Fictional names, `PLACEHOLDER` comments, README note. |
| Brand logos and trademarks | Use Simple Icons SVGs nominatively to describe technologies; no endorsement implied. |
| Sticky nav covers anchor targets | `scroll-margin-top` on every section. |
| Hero too tall on small phones | `min-height` plus padding; content can exceed viewport without clipping. |
| Gradient text loses contrast | Restrict to large text and verify both stops at 4.5:1. |
| Font package weight | Variable fonts only; two families; measure bundle in verification. |
| Future real photos have different ratios | Aspect-ratio wrappers with `object-fit: cover`. |
| Owner prefers centered section headings | Single CSS rule change per section; note in README. |

## 16. Future work

- Real content, images, CV, and links.
- Contact form with a backend or form service.
- Light theme toggle.
- Case-study pages and routing.
- Open Graph image and deployment.
- Automated tests once interactivity grows.
- Optional blog or writing section.
