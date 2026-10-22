# Portfolio — Brick 1: Foundation, Navbar, and Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite starter page with the first portfolio brick: design foundation, placeholder content and assets, a responsive sticky navbar, and the complete hero section.

**Architecture:** A single React page composed from focused section, layout, and UI components. All in-page copy and asset references live in one typed `content.ts` file; static document metadata lives in `index.html`. Styling uses plain co-located CSS files over shared design tokens; no CSS framework or component library. Images are local SVGs imported through Vite, with inline SVG UI icons.

**Tech Stack:** React 19.3, TypeScript 6.0, Vite 8.3, plain CSS, `@fontsource-variable/inter` and `@fontsource-variable/space-grotesk`.

**Spec:** `docs/superpowers/specs/2026-10-22-portfolio-shell-design.md`

**Scope:** This plan implements brick 1 of the spec (section 17). Projects, Experience, Contact, and Footer are separate later plans and must not be built here.

## Global Constraints

- Dark theme only. Use the exact colour, type, spacing, radius, and motion tokens from spec section 6.
- Brick 1 runtime dependencies are React, React DOM, and the two `@fontsource-variable` packages. Do not add `lucide-react`, `motion`, `react-router`, a brand-icon package, a CSS framework, or a component kit in this brick. Later bricks may adopt the pre-approved opt-ins in spec section 12 when that brick's plan states the need.
- Do not add a CSS framework, full component kit, state manager, or CMS client without a new spec decision.
- Pre-approved for later bricks only: `lucide-react` (growing UI icon sets), `motion` (choreography CSS cannot express), `react-router` (case-study routes), `simple-icons`/`react-icons/si` (brand marks), `@radix-ui/react-*` (accessible primitives).
- No automated test framework in this brick. Verification is `npm run build`, `npm run lint`, and the manual checks in Task 5.
- All in-page copy, hrefs, UI labels, and image references live in `src/data/content.ts` as one `SiteContent` object. Components must not hard-code in-page text or asset paths. Static document metadata lives in `index.html`.
- Placeholder content stays fictional. Never use real employer names or real personal claims.
- Only the Home nav link exists in this brick. Later bricks append their links as sections land.
- Plain CSS files co-located with components. Global CSS is limited to `src/styles/tokens.css` and `src/styles/base.css`.
- Responsive target: 360px through 1440px with no horizontal scrolling.
- Accessibility: semantic landmarks, one `h1`, visible `:focus-visible`, 44px minimum targets, skip link, and `prefers-reduced-motion` support.
- All `<img>` elements have explicit dimensions and meaningful alt text. Decorative SVG icons are `aria-hidden`.
- No `any`, no unused imports, no `TODO`/`TBD` comments.

## Review Focus

These are the failure modes a reasonable visitor would hit that the happy-path build does not prove. Each is checked in Task 5.

1. **360px viewport with the full headline and summary** — text must wrap instead of forcing horizontal scroll, and both CTAs must remain tappable.
2. **Keyboard-only mobile navigation** — the toggle must be reachable, announce its state, close on Escape, and show a visible focus ring.
3. **`prefers-reduced-motion: reduce`** — smooth scrolling and hover translation are disabled; the static avatar glow has no animation to suppress.
4. **200% browser zoom** — the hero must not clip the headline, avatar, buttons, or tech strip.
5. **Missing or renamed asset** — Vite must fail the build with a clear unresolved-import error rather than shipping a broken image.

### Post-review corrections

The final review corrected three handoff details. The shipped code differs from the snippets below in these ways:

- `src/data/content.ts` exports one `content: SiteContent` object. UI labels live in `hero.labels`, and `App.tsx` consumes `content` rather than separate slices.
- Static `<title>`, description, and Open Graph tags stay in `index.html`; the README documents this exception to the content-file workflow.
- The navbar logo and desktop links use `min-width: 44px`/`min-height: 44px` to meet the touch-target requirement.

---

## File Structure

### Create

| Path | Responsibility |
|---|---|
| `src/styles/tokens.css` | Design tokens: colour, type, spacing, layout, shape, motion. |
| `src/styles/base.css` | Reset, base typography, focus ring, container, skip link, reduced motion. |
| `src/data/types.ts` | Final content contract for the whole shell. |
| `src/data/content.ts` | Placeholder nav, hero, and tech data plus asset imports. |
| `src/assets/images/avatar-placeholder.svg` | 1:1 avatar placeholder. |
| `src/assets/logos/tech/*.svg` | Six Simple Icons brand logos. |
| `src/components/icons/index.tsx` | Inline UI icons: arrow, download, menu, close. |
| `src/components/layout/Container.tsx` | Shared max-width wrapper. |
| `src/components/layout/Navbar.tsx` | Sticky responsive navigation. |
| `src/components/layout/Navbar.css` | Navbar styles and mobile breakpoint. |
| `src/components/ui/Button.tsx` | Primary/secondary link button. |
| `src/components/ui/Button.css` | Button styles. |
| `src/components/ui/TechStrip.tsx` | Labelled technology logo list. |
| `src/components/ui/TechStrip.css` | Tech strip styles. |
| `src/components/sections/Hero.tsx` | Hero composition. |
| `src/components/sections/Hero.css` | Hero layout and type. |
| `src/hooks/useScrolled.ts` | Scrolled-past-threshold state. |
| `src/hooks/useActiveSection.ts` | Active section id via IntersectionObserver. |
| `public/cv-placeholder.pdf` | One-page placeholder CV for the download CTA. |

### Modify

| Path | Change |
|---|---|
| `package.json`, `package-lock.json` | Add the two font packages. |
| `src/main.tsx` | Import fonts, then tokens and base styles; remove legacy CSS import. |
| `src/App.tsx` | Replace starter markup with skip link, navbar, and hero. |
| `index.html` | Title, description, Open Graph basics, theme colour. |
| `public/favicon.svg` | Replace Vite favicon with the monogram. |
| `README.md` | Replace template README with project and content-editing instructions. |

### Delete

| Path | Reason |
|---|---|
| `src/App.css` | Starter styles replaced by component CSS. |
| `src/index.css` | Replaced by `tokens.css` and `base.css`. |
| `src/assets/hero.png` | Starter artwork. |
| `src/assets/react.svg` | Starter artwork. |
| `src/assets/vite.svg` | Starter artwork. |
| `public/icons.svg` | Starter icon sprite. |

---

## Task 1: Design Foundation

**Files:**
- Modify: `package.json`, `package-lock.json`, `src/main.tsx`, `index.html`, `public/favicon.svg`
- Create: `src/styles/tokens.css`, `src/styles/base.css`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--duration-*`, `--ease-out`, `--container`, `--gutter`, `--section-padding`, `--nav-height`); global `.container`, `.skip-link`, `.visually-hidden` classes; font families `Inter Variable` and `Space Grotesk Variable`.

- [ ] **Step 1: Install the local variable font packages**

Run:

```powershell
npm install @fontsource-variable/inter@^5.3.0 @fontsource-variable/space-grotesk@^5.3.0
```

Expected: both packages appear under `dependencies` in `package.json`, and `package-lock.json` updates. No other dependency changes.

- [ ] **Step 2: Create the design tokens**

Create `src/styles/tokens.css`:

```css
:root {
  /* Colour */
  --color-bg: #0b0b0d;
  --color-surface: #141416;
  --color-surface-raised: #1b1b1f;
  --color-border: #2a2a30;
  --color-border-strong: #3f3f46;
  --color-text: #f4f4f5;
  --color-text-muted: #a1a1aa;
  --color-accent-from: #c084fc;
  --color-accent-to: #f472b6;
  --gradient-accent: linear-gradient(
    135deg,
    var(--color-accent-from),
    var(--color-accent-to)
  );
  --color-focus: #c084fc;

  /* Typography */
  --font-display: 'Space Grotesk Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Layout */
  --container: 1120px;
  --gutter: clamp(20px, 5vw, 32px);
  --section-padding: clamp(64px, 9vw, 112px);
  --nav-height: 72px;

  /* Shape */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-reveal: 500ms;
}
```

- [ ] **Step 3: Create the global base styles**

Create `src/styles/base.css`:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.65;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
p {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
}

img,
svg {
  display: block;
  max-width: 100%;
}

img {
  height: auto;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
  border-radius: 4px;
}

main:focus {
  outline: none;
}

::selection {
  background: var(--color-accent-from);
  color: var(--color-bg);
}

.container {
  width: min(calc(100% - 2 * var(--gutter)), var(--container));
  margin-inline: auto;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.875rem;
  font-weight: 600;
  transform: translateY(-200%);
  transition: transform var(--duration-fast) var(--ease-out);
}

.skip-link:focus {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Add the font imports to the entry point**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

The legacy `./index.css` import is temporary and is removed in Task 5.

- [ ] **Step 5: Update the document metadata**

Replace `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0b0b0d" />
    <title>Your Name — Full-Stack Developer</title>
    <meta
      name="description"
      content="Portfolio of Your Name, a full-stack developer building fast, accessible web products."
    />
    <meta property="og:title" content="Your Name — Full-Stack Developer" />
    <meta
      property="og:description"
      content="Portfolio of Your Name, a full-stack developer building fast, accessible web products."
    />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Replace the favicon**

Replace `public/favicon.svg` with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c084fc" />
      <stop offset="1" stop-color="#f472b6" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0b0b0d" />
  <path
    d="M18 19l14 16 14-16M32 35v12"
    fill="none"
    stroke="url(#g)"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

- [ ] **Step 7: Verify foundation still builds**

Run:

```powershell
npm run build
npm run lint
```

Expected: build succeeds and reports the built assets; lint exits with no errors or warnings.

- [ ] **Step 8: Commit**

```powershell
git add package.json package-lock.json src/main.tsx src/styles/tokens.css src/styles/base.css index.html public/favicon.svg
git commit -m "chore: add design tokens, fonts, and page metadata"
```

---

## Task 2: Content Contract and Placeholder Assets

**Files:**
- Create: `src/data/types.ts`, `src/data/content.ts`, `src/assets/images/avatar-placeholder.svg`, `src/assets/logos/tech/javascript.svg`, `src/assets/logos/tech/typescript.svg`, `src/assets/logos/tech/react.svg`, `src/assets/logos/tech/nodedotjs.svg`, `src/assets/logos/tech/postgresql.svg`, `src/assets/logos/tech/docker.svg`, `public/cv-placeholder.pdf`
- Temporarily create then delete: `scripts/create-placeholder-cv.mjs`

**Interfaces:**
- Consumes: asset files; Vite's `*.svg` module type.
- Produces: `src/data/types.ts` exports `NavItem`, `SocialIcon`, `SocialLink`, `TechItem`, `ProjectItem`, `ExperienceItem`, `HeroContent`, `SiteContent`. `src/data/content.ts` exports `nav: NavItem[]`, `hero: HeroContent`, `tech: TechItem[]`.

- [ ] **Step 1: Create the content types**

Create `src/data/types.ts`:

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

export interface HeroContent {
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
}

export interface SiteContent extends HeroContent {
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
  socials: SocialLink[]
}
```

- [ ] **Step 2: Create the avatar placeholder**

Create `src/assets/images/avatar-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="32%" cy="24%" r="88%">
      <stop offset="0" stop-color="#e9d5ff" />
      <stop offset="0.45" stop-color="#c084fc" />
      <stop offset="1" stop-color="#be185d" />
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" />
  <g fill="none" stroke="#ffffff" stroke-opacity="0.16">
    <circle cx="200" cy="200" r="146" stroke-width="1" />
    <circle cx="200" cy="200" r="118" stroke-width="1" />
  </g>
  <path
    d="M0 310 C90 250 150 360 240 300 S360 250 400 300 V400 H0 Z"
    fill="url(#shine)"
  />
  <text
    x="200"
    y="238"
    text-anchor="middle"
    font-family="'Space Grotesk', Arial, sans-serif"
    font-size="128"
    font-weight="700"
    letter-spacing="-8"
    fill="#ffffff"
    fill-opacity="0.94"
  >YN</text>
</svg>
```

- [ ] **Step 3: Download the six technology logos**

Run:

```powershell
New-Item -ItemType Directory -Force -Path "src/assets/logos/tech" | Out-Null
curl.exe -sL -o "src/assets/logos/tech/javascript.svg" "https://cdn.simpleicons.org/javascript/F7DF1E"
curl.exe -sL -o "src/assets/logos/tech/typescript.svg" "https://cdn.simpleicons.org/typescript/3178C6"
curl.exe -sL -o "src/assets/logos/tech/react.svg" "https://cdn.simpleicons.org/react/61DAFB"
curl.exe -sL -o "src/assets/logos/tech/nodedotjs.svg" "https://cdn.simpleicons.org/nodedotjs/5FA04E"
curl.exe -sL -o "src/assets/logos/tech/postgresql.svg" "https://cdn.simpleicons.org/postgresql/4169E1"
curl.exe -sL -o "src/assets/logos/tech/docker.svg" "https://cdn.simpleicons.org/docker/2496ED"
```

Verify all six files exist and are non-trivial:

```powershell
Get-ChildItem "src/assets/logos/tech/*.svg" | Select-Object Name, Length
Get-Content "src/assets/logos/tech/react.svg" -TotalCount 2
```

Expected: six files, each larger than 200 bytes; the React file begins with an `<svg` element and contains a `<title>React</title>`.

- [ ] **Step 4: Create the placeholder content**

Create `src/data/content.ts`:

```ts
import avatarUrl from '../assets/images/avatar-placeholder.svg'
import dockerUrl from '../assets/logos/tech/docker.svg'
import javascriptUrl from '../assets/logos/tech/javascript.svg'
import nodedotjsUrl from '../assets/logos/tech/nodedotjs.svg'
import postgresqlUrl from '../assets/logos/tech/postgresql.svg'
import reactUrl from '../assets/logos/tech/react.svg'
import typescriptUrl from '../assets/logos/tech/typescript.svg'
import type { HeroContent, NavItem, TechItem } from './types'

// PLACEHOLDER CONTENT — replace every value in this file with real details.
// Brick 1 exports the navigation, hero, and tech slices. Later bricks append
// projects, experience, and social links to this same file.

export const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  // Projects, Experience, and Contact links are added when those sections land.
]

export const hero: HeroContent = {
  name: 'Your Name',
  monogram: 'YN',
  role: 'Full-Stack Developer',
  headline: {
    lineOne: 'I build fast,',
    lineTwo: 'accessible products',
    accent: 'for the web.',
  },
  summary:
    'I am a full-stack developer who turns ideas into reliable, responsive web products. I work with teams and clients from the first sketch to deployment, with a focus on performance, accessibility, and clean interfaces.',
  email: 'hello@example.com',
  cvUrl: '/cv-placeholder.pdf',
  avatar: avatarUrl,
  avatarAlt: 'Portrait of Your Name',
}

export const tech: TechItem[] = [
  { name: 'JavaScript', src: javascriptUrl },
  { name: 'TypeScript', src: typescriptUrl },
  { name: 'React', src: reactUrl },
  { name: 'Node.js', src: nodedotjsUrl },
  { name: 'PostgreSQL', src: postgresqlUrl },
  { name: 'Docker', src: dockerUrl },
]
```

- [ ] **Step 5: Generate the placeholder CV**

Create `scripts/create-placeholder-cv.mjs`:

```js
import { writeFileSync } from 'node:fs'

const lines = [
  ['Your Name - Full-Stack Developer', 20],
  ['', 12],
  ['This is a placeholder CV for the portfolio shell.', 12],
  ['Replace public/cv-placeholder.pdf with your real CV.', 12],
  ['', 12],
  ['hello@example.com', 12],
]

const content = lines
  .map(([line, size], index) => {
    const escaped = line
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
    return `BT /F1 ${size} Tf 72 ${760 - index * 28} Td (${escaped}) Tj ET`
  })
  .join('\n')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
]

let pdf = '%PDF-1.4\n'
const offsets = []

for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
}

const xref = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`

writeFileSync('public/cv-placeholder.pdf', Buffer.from(pdf, 'latin1'))
```

Run it:

```powershell
node scripts/create-placeholder-cv.mjs
Get-Item public/cv-placeholder.pdf | Select-Object Name, Length
Get-Content public/cv-placeholder.pdf -TotalCount 1
```

Expected: the file is larger than 500 bytes and its first line is `%PDF-1.4`.

Delete the one-off generator:

```powershell
Remove-Item scripts/create-placeholder-cv.mjs
Remove-Item scripts
```

- [ ] **Step 6: Verify the content layer compiles**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The assets are not displayed yet; this step proves every import resolves and the types are valid.

- [ ] **Step 7: Prove a missing asset fails the build**

Rename one logo temporarily and confirm Vite refuses to build:

```powershell
Rename-Item src/assets/logos/tech/react.svg react.svg.bak
npm run build
Rename-Item src/assets/logos/tech/react.svg.bak react.svg
npm run build
```

Expected: the first build fails with `Failed to resolve import` naming `react.svg`; the second build passes. Confirm `react.svg` is restored before committing.

- [ ] **Step 8: Commit**

```powershell
git add src/data src/assets public/cv-placeholder.pdf
git commit -m "feat: add hero content model and placeholder assets"
```

---

## Task 3: Icons and Hero UI Primitives

**Files:**
- Create: `src/components/icons/index.tsx`, `src/components/layout/Container.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Button.css`, `src/components/ui/TechStrip.tsx`, `src/components/ui/TechStrip.css`

**Interfaces:**
- Consumes: `TechItem` from `src/data/types.ts`.
- Produces:
  - `ArrowUpRight`, `Download`, `Menu`, `Close` — each accepts `SVGProps<SVGSVGElement>`.
  - `Container({ children }: { children: ReactNode })`.
  - `Button({ href, variant = 'primary', download = false, children })` where `variant` is `'primary' | 'secondary'`.
  - `TechStrip({ items }: { items: TechItem[] })`.

- [ ] **Step 1: Create the inline icon set**

Create `src/components/icons/index.tsx`:

```tsx
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function StrokeIcon({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowUpRight(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </StrokeIcon>
  )
}

export function Download(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </StrokeIcon>
  )
}

export function Menu(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
  )
}

export function Close(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </StrokeIcon>
  )
}
```

- [ ] **Step 2: Create the container**

Create `src/components/layout/Container.tsx`:

```tsx
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>
}
```

- [ ] **Step 3: Create the button**

Create `src/components/ui/Button.tsx`:

```tsx
import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  download?: boolean
  children: ReactNode
}

export function Button({
  href,
  variant = 'primary',
  download = false,
  children,
}: ButtonProps) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      download={download ? '' : undefined}
    >
      {children}
    </a>
  )
}
```

Create `src/components/ui/Button.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 48px;
  padding: 0 var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1;
  transition:
    background-color var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

.button--primary {
  background: var(--color-text);
  color: var(--color-bg);
}

.button--primary:hover {
  background: #ffffff;
}

.button--secondary {
  border-color: var(--color-border-strong);
  background: transparent;
  color: var(--color-text);
}

.button--secondary:hover {
  border-color: var(--color-accent-from);
}

@media (prefers-reduced-motion: reduce) {
  .button:hover,
  .button:active {
    transform: none;
  }
}
```

- [ ] **Step 4: Create the tech strip**

Create `src/components/ui/TechStrip.tsx`:

```tsx
import type { TechItem } from '../../data/types'
import './TechStrip.css'

interface TechStripProps {
  items: TechItem[]
}

export function TechStrip({ items }: TechStripProps) {
  return (
    <div className="tech-strip">
      <p className="tech-strip__label">Experience with</p>
      <ul className="tech-strip__list" aria-label="Technologies I work with">
        {items.map((item) => (
          <li key={item.name} className="tech-strip__item">
            <img src={item.src} alt={item.name} width="28" height="28" />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

Create `src/components/ui/TechStrip.css`:

```css
.tech-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
}

.tech-strip__label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tech-strip__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-5) var(--space-7);
}

.tech-strip__item {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
}

.tech-strip__item img {
  width: 28px;
  height: 28px;
  opacity: 0.9;
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.tech-strip__item:hover img {
  opacity: 1;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .tech-strip__list {
    gap: var(--space-4) var(--space-5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech-strip__item:hover img {
    transform: none;
  }
}
```

- [ ] **Step 5: Verify the primitives compile**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass.

- [ ] **Step 6: Commit**

```powershell
git add src/components/icons src/components/layout/Container.tsx src/components/ui
git commit -m "feat: add icons and hero UI primitives"
```

---

## Task 4: Responsive Sticky Navbar

**Files:**
- Create: `src/hooks/useScrolled.ts`, `src/hooks/useActiveSection.ts`, `src/components/layout/Navbar.tsx`, `src/components/layout/Navbar.css`

**Interfaces:**
- Consumes: `NavItem`; `Container`; `Menu`, `Close` icons.
- Produces:
  - `useScrolled(offset?: number): boolean`.
  - `useActiveSection(ids: string[]): string`.
  - `Navbar({ name, monogram, nav }: { name: string; monogram: string; nav: NavItem[] })`.

- [ ] **Step 1: Create the scrolled-state hook**

Create `src/hooks/useScrolled.ts`:

```ts
import { useEffect, useState } from 'react'

export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
```

- [ ] **Step 2: Create the active-section hook**

Create `src/hooks/useActiveSection.ts`:

```ts
import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [ids])

  return activeId
}
```

- [ ] **Step 3: Create the navbar**

Create `src/components/layout/Navbar.tsx`:

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavItem } from '../../data/types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Close, Menu } from '../icons'
import { Container } from './Container'
import './Navbar.css'

interface NavbarProps {
  name: string
  monogram: string
  nav: NavItem[]
}

export function Navbar({ name, monogram, nav }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrolled = useScrolled()
  const sectionIds = useMemo(
    () => nav.map((item) => item.href.slice(1)),
    [nav],
  )
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }

    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  const renderLink = (item: NavItem, mobile = false) => {
    const isActive = activeId === item.href.slice(1)

    return (
      <a
        className={`navbar__link${isActive ? ' is-active' : ''}${
          mobile ? ' navbar__link--mobile' : ''
        }`}
        href={item.href}
        aria-current={isActive ? 'true' : undefined}
        onClick={mobile ? () => setOpen(false) : undefined}
      >
        {item.label}
      </a>
    )
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Container>
        <div className="navbar__inner">
          <a
            className="navbar__logo"
            href="#home"
            aria-label={`${name} — back to top`}
          >
            <span>{monogram}</span>
            <span className="navbar__logo-dot" aria-hidden="true">
              .
            </span>
          </a>

          <nav className="navbar__desktop" aria-label="Primary">
            <ul className="navbar__links">
              {nav.map((item) => (
                <li key={item.href}>{renderLink(item)}</li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        <nav
          id="mobile-nav"
          className="navbar__mobile"
          aria-label="Mobile"
          hidden={!open}
        >
          <ul className="navbar__mobile-links">
            {nav.map((item) => (
              <li key={item.href}>{renderLink(item, true)}</li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
```

- [ ] **Step 4: Create the navbar styles**

Create `src/components/layout/Navbar.css`:

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-height);
  border-bottom: 1px solid transparent;
  background: rgba(11, 11, 13, 0.72);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  transition: border-color var(--duration-base) var(--ease-out);
}

.navbar--scrolled {
  border-bottom-color: var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  height: var(--nav-height);
}

.navbar__logo {
  display: inline-flex;
  align-items: baseline;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.navbar__logo-dot {
  color: var(--color-accent-from);
}

.navbar__desktop {
  display: block;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.navbar__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  transition: color var(--duration-base) var(--ease-out);
}

.navbar__link:hover,
.navbar__link.is-active {
  color: var(--color-text);
}

.navbar__link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 4px;
  left: 0;
  height: 2px;
  background: var(--gradient-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) var(--ease-out);
}

.navbar__link:hover::after,
.navbar__link.is-active::after {
  transform: scaleX(1);
}

.navbar__toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
}

.navbar__mobile {
  display: none;
}

@media (max-width: 899px) {
  .navbar {
    height: auto;
  }

  .navbar__desktop {
    display: none;
  }

  .navbar__toggle {
    display: inline-flex;
  }

  .navbar__mobile {
    display: block;
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .navbar__mobile-links {
    padding-block: var(--space-2);
  }

  .navbar__link--mobile {
    display: flex;
    width: 100%;
    min-height: 48px;
    padding-inline: var(--space-1);
  }

  .navbar__link--mobile::after {
    right: auto;
    bottom: 6px;
    left: var(--space-1);
    width: 24px;
  }
}

.navbar__mobile[hidden] {
  display: none;
}
```

- [ ] **Step 5: Verify the navbar compiles**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The navbar is not mounted yet, so the page still shows the starter screen. Mounting happens in Task 5.

- [ ] **Step 6: Commit**

```powershell
git add src/hooks src/components/layout/Navbar.tsx src/components/layout/Navbar.css
git commit -m "feat: add responsive sticky navigation"
```

---

## Task 5: Hero, Integration, and Verification

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/Hero.css`
- Modify: `src/App.tsx`, `src/main.tsx`, `README.md`
- Delete: `src/App.css`, `src/index.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`

**Interfaces:**
- Consumes: `HeroContent`, `TechItem`; `Navbar`; `Button`; `TechStrip`; `Download` icon; `hero`, `nav`, `tech` from `src/data/content.ts`.
- Produces: `Hero({ hero, tech }: { hero: HeroContent; tech: TechItem[] })`; the rendered first-brick page.

- [ ] **Step 1: Create the hero component**

Create `src/components/sections/Hero.tsx`:

```tsx
import type { HeroContent, TechItem } from '../../data/types'
import { Download } from '../icons'
import { Button } from '../ui/Button'
import { TechStrip } from '../ui/TechStrip'
import './Hero.css'

interface HeroProps {
  hero: HeroContent
  tech: TechItem[]
}

export function Hero({ hero, tech }: HeroProps) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__avatar">
          <img
            src={hero.avatar}
            alt={hero.avatarAlt}
            width="176"
            height="176"
          />
        </div>

        <h1 id="hero-title" className="hero__title">
          {hero.headline.lineOne}
          <br />
          {hero.headline.lineTwo}{' '}
          <span className="hero__accent">{hero.headline.accent}</span>
        </h1>

        <p className="hero__summary">{hero.summary}</p>

        <div className="hero__actions">
          <Button href={`mailto:${hero.email}`}>Get in Touch</Button>
          <Button href={hero.cvUrl} variant="secondary" download>
            <Download width="18" height="18" />
            Download CV
          </Button>
        </div>

        <div className="hero__tech">
          <TechStrip items={tech} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the hero styles**

Create `src/components/sections/Hero.css`:

```css
.hero {
  display: grid;
  align-items: center;
  min-height: calc(100svh - var(--nav-height));
  padding-block: clamp(64px, 10vh, 112px);
  scroll-margin-top: var(--nav-height);
}

.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__avatar {
  position: relative;
  isolation: isolate;
  width: 176px;
  height: 176px;
  padding: 4px;
  border-radius: var(--radius-full);
  background: var(--gradient-accent);
}

.hero__avatar::before {
  content: '';
  position: absolute;
  inset: -72px;
  z-index: -1;
  background: radial-gradient(
    circle,
    rgba(192, 132, 252, 0.18),
    transparent 68%
  );
  pointer-events: none;
}

.hero__avatar img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.hero__title {
  margin-top: var(--space-7);
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.hero__accent {
  background: var(--gradient-accent);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.hero__summary {
  max-width: 62ch;
  margin-top: var(--space-5);
  color: var(--color-text-muted);
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__tech {
  margin-top: clamp(48px, 8vh, 80px);
}

@media (max-width: 640px) {
  .hero {
    padding-block: var(--space-8) var(--space-7);
  }

  .hero__avatar {
    width: 136px;
    height: 136px;
  }

  .hero__title {
    margin-top: var(--space-6);
  }
}

@media (max-width: 480px) {
  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .hero__actions .button {
    width: 100%;
  }
}

@media (forced-colors: active) {
  .hero__accent {
    background: none;
    color: currentColor;
    -webkit-text-fill-color: currentColor;
  }
}
```

- [ ] **Step 3: Replace the app shell**

Replace `src/App.tsx` with:

```tsx
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { hero, nav, tech } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar name={hero.name} monogram={hero.monogram} nav={nav} />

      <main id="main" tabIndex={-1}>
        <Hero hero={hero} tech={tech} />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 4: Switch the entry point to the new styles**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Delete the starter files**

Run:

```powershell
Remove-Item src/App.css, src/index.css
Remove-Item src/assets/hero.png, src/assets/react.svg, src/assets/vite.svg
Remove-Item public/icons.svg
```

Confirm nothing still references them:

```powershell
Get-ChildItem -Recurse -File src, public, index.html |
  Select-String -Pattern "App\.css|index\.css|hero\.png|assets/react\.svg|assets/vite\.svg|icons\.svg"
```

Expected: no output.

- [ ] **Step 6: Replace the README**

Replace `README.md` with:

````markdown
# Your Name — Portfolio

A single-page personal portfolio built with React, TypeScript, and Vite.

## Status

Brick 1: design foundation, sticky navigation, and hero section.
Projects, experience, contact, and footer follow in later bricks.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Editing content

All copy, links, and asset references live in `src/data/content.ts`.
Replace the placeholder values with your real details.

Images live in:

- `src/assets/images/` — avatar and (later) project thumbnails
- `src/assets/logos/tech/` — technology logos

To swap an image, overwrite the file with the same name. Keep the same
aspect ratio where possible: avatar 1:1, project thumbnails 16:10.

The CV button points at `public/cv-placeholder.pdf`. Replace that file
with your real CV, keeping the filename, or update `cvUrl` in
`src/data/content.ts`.

## Structure

```text
src/
├── assets/        image and logo files
├── components/
│   ├── icons/     inline SVG icons
│   ├── layout/    navbar, container
│   ├── sections/  page sections
│   └── ui/        buttons, tech strip
├── data/          content types and placeholder content
├── hooks/         scroll and active-section hooks
├── styles/        design tokens and global base styles
├── App.tsx
└── main.tsx
```

## Notes

- Dark theme only in this milestone.
- All current content is fictional placeholder data.
- The navigation lists only Home until the other sections are built.
````

- [ ] **Step 7: Build and lint**

Run:

```powershell
npm run build
npm run lint
```

Expected: build succeeds with no TypeScript errors; lint prints no findings.

- [ ] **Step 8: Run the app and verify at three widths**

Start the dev server:

```powershell
npm run dev
```

Open `http://localhost:5173` and check:

1. **360×800** — no horizontal scrollbar; the headline wraps without clipping; both CTAs stack and fill the width; the avatar is about 136px; the tech strip wraps; the hamburger is visible.
2. **768×1024** — CTAs sit side by side; the navbar still uses the hamburger (breakpoint is 900px); the tech strip sits on one or two rows without overflow.
3. **1440×900** — the desktop navbar shows Home; the hero is centered within 1120px; the avatar is 176px; the tech strip has room to breathe.
4. **200% zoom at 1440px** — the headline, avatar, buttons, and tech strip remain visible and tappable; no horizontal scrolling.

- [ ] **Step 9: Verify keyboard, motion, and link behaviour**

1. Reload, then press `Tab` once: the "Skip to content" link appears at the top left. Press `Enter` and confirm focus moves into the main region.
2. Tab through the logo, nav links, both CTAs, and the menu toggle. Every stop shows the 2px accent focus ring.
3. At 360px, open the menu: `aria-expanded` becomes `true`. Tab through Home. Press `Escape`: the menu closes and focus stays on the toggle. Reopen, activate Home, and confirm the menu closes.
4. Turn on "Emulate CSS media feature prefers-reduced-motion: reduce" in DevTools. Confirm smooth scrolling is off, buttons do not translate on hover, and the tech logos do not lift.
5. Activate "Get in Touch": the mail client opens with `hello@example.com`.
6. Activate "Download CV": `cv-placeholder.pdf` downloads and opens as a one-page PDF.
7. Open the browser console: no errors and no React warnings.

- [ ] **Step 10: Rehearse a content swap**

In `src/data/content.ts`, temporarily change `hero.headline.accent` to `'today.'` and save. Confirm the hero updates through HMR without touching a component. Revert the value to `'for the web.'` and save.

- [ ] **Step 11: Commit**

```powershell
git add -A
git commit -m "feat: build hero section and remove starter template"
```

---

## Final Acceptance Checklist

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] The starter Vite page, assets, and CSS are gone.
- [ ] The page renders the skip link, navbar, and hero only.
- [ ] The nav lists Home only and marks it active.
- [ ] The hero shows the avatar, split headline with gradient accent, summary, both CTAs, and six tech logos.
- [ ] The CV download and mailto links work.
- [ ] No horizontal scrolling at 360px.
- [ ] Keyboard navigation and the skip link work.
- [ ] The mobile menu opens, closes on Escape and link activation, and exposes `aria-expanded`.
- [ ] `prefers-reduced-motion` removes smooth scrolling and hover translation.
- [ ] 200% zoom does not clip content.
- [ ] Copy and image references can be changed only in `src/data/content.ts` and `src/assets/`.
- [ ] README documents commands and content replacement.
