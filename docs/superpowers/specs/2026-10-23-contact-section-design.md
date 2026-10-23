# Contact Section Design

**Date:** 2026-10-23  
**Status:** Approved design, ready for implementation planning  
**Supersedes:** The Contact and Footer details in `docs/superpowers/specs/2026-10-22-portfolio-shell-design.md` (notably the 720px contact width, the email-only primary action, the social icon row, the placeholder social set, and the `03 / Contact` eyebrow).

## 1. Context

The portfolio currently ends after Experience. Contact is the final narrative beat: after showing the work and the career behind it, the page should close with a clear, professional way to start a conversation. The navbar intentionally has no Contact link yet because the section did not exist.

The reference image shows a left-aligned Contact heading, a paragraph, an email address, and a row of social icons. That layout is a useful starting point but is too sparse for the five channels the portfolio owner can provide: work email, personal email, phone, GitHub, and LinkedIn.

This design turns the closing section into an editorial contact ledger. The work email is the primary action; the remaining channels sit below it in a compact, scannable grid. The page then ends with a separate footer. All contact details and social URLs are clearly marked placeholders so they can be replaced incrementally without touching component code.

## 2. Goals

- Add a polished Contact section immediately after Experience.
- Make the work email the clearest action in the section.
- Present personal email, phone, GitHub, and LinkedIn without turning the section into a card or a settings panel.
- Preserve the existing dark surfaces, violet→magenta accent, 1px borders, and shared 880px content rail.
- Add a separate footer with the copyright line and a Back to top link.
- Keep every contact value in one typed, comment-marked block in `content.ts`.
- Add Contact to the navbar and active-section tracking.
- Use existing dependencies and local code only.

## 3. Non-goals

- A contact form, form validation, backend, or form service.
- Real contact information in this pass.
- Copy-to-clipboard, QR codes, maps, scheduling, or availability badges.
- X, Instagram, YouTube, or any social network outside GitHub and LinkedIn.
- A row of 44px social icon buttons.
- Additional footer navigation, legal pages, or a sitemap.
- Entrance animations or scroll-triggered effects.
- A CMS or automated content pipeline.

## 4. User Experience

### 4.1 Section composition

`Contact` is the fourth anchored section and the last section inside `main`:

```text
Navbar
main
  Hero        #home
  Projects    #projects
  Experience  #experience
  Contact     #contact
Footer
```

The section uses the existing `.container` wrapper, the standard section padding, a 1px top border, and an inner block capped at the 880px content rail. It keeps the same left-aligned editorial rhythm as Projects and Experience.

A faint radial accent glow may sit behind the upper-right of the section at no more than 8% opacity. It is decorative, pointer-inert, and clipped so it cannot create horizontal scrolling.

### 4.2 Section header

The section uses the existing `SectionHeading` component:

- Gradient eyebrow: `03 / Get in touch`
- `h2` with `id="contact-title"`: `Contact`
- No `SectionHeading` aside; the intro sits beneath the heading.

The intro is a single muted paragraph capped at roughly 62ch:

> I’m open to full-time roles, freelance projects, and conversations about building reliable software. Work inquiries are best sent to the address below.

The intro is placeholder copy and must be replaced with the owner’s preferred wording when real details are added.

### 4.3 Primary contact action

The work email is the focal point of the section.

- A small uppercase label, `Work email`, sits above the address.
- The label, address, and arrow are all inside one `mailto:` link so the accessible name includes the purpose and the destination.
- The address is set in the display face at `clamp(1.5rem, 4.5vw, 2.5rem)`, weight 600, with a restrained underline.
- On hover and keyboard focus, the address reveals the violet→magenta gradient and the arrow becomes accent-coloured.
- The arrow moves up and to the right by 2px on hover/focus.
- Long addresses wrap with `overflow-wrap: anywhere`; the email is never clipped or allowed to force horizontal scrolling.

The primary link carries no `target` attribute.

### 4.4 Secondary contact ledger

Below the primary email, a semantic `ul` holds four links in a hairline-separated grid:

| Order | Label | Placeholder value | Destination |
| --- | --- | --- | --- |
| 1 | Personal email | `hello@example.com` | `mailto:` |
| 2 | Phone | `+63 912 345 6789` | `tel:` |
| 3 | GitHub | `github.com/placeholder` | External profile |
| 4 | LinkedIn | `linkedin.com/in/placeholder` | External profile |

Each row contains:

1. A muted uppercase label.
2. A readable value in the body face.
3. An `ArrowUpRight` icon aligned to the right.

The label and value sit together in the left column of the row; the arrow is pushed to the right edge. Rows have a 1px top border and generous vertical padding. The grid is two columns at 720px and above, with a 48px column gap, and one column below 720px. The first row's top border separates the ledger from the primary email.

The phone link is built by stripping everything except digits and a leading `+` from the displayed number. The social values are displayed by stripping the protocol, an optional `www.`, and a trailing slash from the stored URL. The stored URLs remain the canonical `href` values.

GitHub and LinkedIn open in a new tab with `rel="noreferrer"` and include a visually hidden `(opens in a new tab)` suffix. Email and phone links stay in the current tab.

This section is text-first: no brand icons or icon buttons are rendered. The existing `SocialLink.icon` field remains in the type for future use, but it is not displayed in this pass.

### 4.5 Footer

The footer is a separate semantic `footer` after `main`. It is not a nav target and is not inside the Contact section.

- 1px top border.
- 32px vertical padding at desktop; the content stacks on small screens.
- Muted 13px text.
- Copyright: `© {current year} {name}`, using the name from the content file.
- Back to top link pointing to `#home`, with a small upward arrow.
- A 2px violet→magenta rule across the very bottom edge of the footer as the closing signature.

The footer is aligned to the same 880px rail as the rest of the page content. The copyright and Back to top link sit on opposite ends at 640px and above; below 640px they stack with a small gap.

### 4.6 Navigation

Add Contact to the navbar after Experience:

```ts
{ label: 'Contact', href: '#contact' }
```

The existing `useActiveSection` hook receives the section IDs from the nav array, so Contact becomes an active-section target automatically. No observer changes are required in this pass. The observer's known last-section edge case on very tall viewports remains out of scope.

The Contact section uses `scroll-margin-top: calc(var(--nav-height) + 16px)` so the sticky navbar does not cover the heading when the nav link is used.

## 5. Content Model

### 5.1 Type changes

Add the following interfaces to `src/data/types.ts`:

```ts
export interface ContactHeading {
  index: string
  label: string
  title: string
  intro: string
}

export interface ContactDetails {
  workEmail: string
  personalEmail: string
  phone: string
}
```

Extend `SiteContent` with the contact content:

```ts
export interface SiteContent extends HeroContent {
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  projectsHeading: ProjectsHeading
  experience: ExperienceItem[]
  experienceHeading: ExperienceHeading
  contactHeading: ContactHeading
  contact: ContactDetails
  socials: SocialLink[]
}
```

`SocialIcon` and `SocialLink` remain unchanged. The Contact section consumes the `label` and `href` fields of the GitHub and LinkedIn entries.

### 5.2 Placeholder content

All contact values live in one comment-marked block in `src/data/content.ts`:

```ts
// CONTACT PLACEHOLDERS — replace these values with real details.
const contact: ContactDetails = {
  workEmail: 'work@example.com',
  personalEmail: 'hello@example.com',
  phone: '+63 912 345 6789',
}

const contactHeading: ContactHeading = {
  index: '03',
  label: 'Get in touch',
  title: 'Contact',
  intro:
    'I’m open to full-time roles, freelance projects, and conversations about building reliable software. Work inquiries are best sent to the address below.',
}

const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/placeholder',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/placeholder',
    icon: 'linkedin',
  },
]
```

The existing hero email must be derived from the same contact block so the hero CTA and the personal email row cannot drift apart:

```ts
const hero: HeroContent = {
  // ...
  email: contact.personalEmail,
  // ...
}
```

This may require defining `contact` before `hero` in the file. The `content` export adds `contactHeading`, `contact`, and the populated `socials` array.

The Contact intro is realistic placeholder copy, not lorem ipsum. It should be replaced together with the contact values.

## 6. Visual System

### 6.1 Layout and spacing

- Section: `padding-block: var(--section-padding)`, `border-top: 1px solid var(--color-border)`.
- Content: `.container` wrapper with an inner block capped at `var(--container-narrow)` and centered.
- Header-to-intro gap: `var(--space-5)`.
- Intro-to-primary gap: `var(--space-8)`.
- Primary-to-ledger gap: `var(--space-6)`.
- Ledger row padding: `var(--space-4)` to `var(--space-5)`.
- Footer: aligned to the 880px rail, `padding-block: var(--space-6)`, 1px top border.

No card surface, border radius, shadow, or nested panel is introduced. The section is defined by spacing, type, and hairlines.

### 6.2 Typography and colour

- Eyebrow, title, and intro inherit the existing `SectionHeading` and body styles.
- Primary label and secondary labels: `0.75rem`, weight 600, uppercase, `letter-spacing: 0.14em`, `var(--color-text-muted)`.
- Primary email: display face, weight 600, `clamp(1.5rem, 4.5vw, 2.5rem)`, `letter-spacing: -0.03em`, `line-height: 1.15`.
- Secondary values: body face, `1rem`, `var(--color-text)`.
- Muted text: `var(--color-text-muted)`.
- Hairlines: `var(--color-border)`.
- Accent: `var(--gradient-accent)` and `var(--color-accent-to)` for hover/focus states.
- Footer text: `0.8125rem`, `var(--color-text-muted)`.

The gradient is reserved for the eyebrow, the primary email’s hover/focus state, and the 2px footer rule. It is not applied to large blocks of body copy.

### 6.3 Responsive behaviour

| Width | Behaviour |
| --- | --- |
| 320–639px | Primary email at the low end of its clamp; ledger is one column; footer stacks; 20px page gutters from `--gutter`. |
| 640–719px | Ledger remains one column; footer switches to a two-end row. |
| 720px+ | Ledger becomes a two-column grid with a 48px column gap. |
| 900px+ | Primary email reaches the top of its clamp; section spacing uses the full desktop rhythm. |

The section must not produce horizontal scrolling at any width. The glow is clipped, long email values wrap, and the footer row has enough gap to avoid collisions.

### 6.4 Motion and states

- Hover/focus transitions use the existing `--duration-base` and `--ease-out`.
- Primary email: gradient reveal, underline accent, arrow colour change, and 2px arrow translation.
- Secondary rows: value/arrow gain accent colour; the arrow translates 2px.
- Footer Back to top: text and arrow gain accent colour.
- Focus-visible uses the global 2px `--color-focus` outline with 3px offset.
- All transitions collapse under `prefers-reduced-motion: reduce`, consistent with the rest of the site.
- No entrance reveal is required; the section is visible as soon as it is rendered.

Under `forced-colors: active`, gradient-clipped text falls back to `currentColor` so the email and eyebrow remain readable.

## 7. Component and File Changes

### 7.1 New components

- `src/components/sections/Contact.tsx`
  - Receives `heading`, `contact`, and `socials`.
  - Renders the section, header, intro, primary work-email link, and secondary ledger.
  - Owns the small display helpers for formatting social URLs and phone `tel:` links.
- `src/components/sections/Contact.css`
  - Section rhythm, glow, primary email, ledger, responsive grid, and interaction states.
- `src/components/layout/Footer.tsx`
  - Receives `name`; computes the current year at render time.
  - Renders the copyright and Back to top link.
- `src/components/layout/Footer.css`
  - Footer alignment, hairline, responsive row, and bottom gradient rule.

### 7.2 Existing files

- `src/data/types.ts` — add `ContactHeading` and `ContactDetails`; extend `SiteContent`.
- `src/data/content.ts` — add the contact heading and details; populate GitHub and LinkedIn socials; derive the hero email from the contact block; add Contact to nav.
- `src/App.tsx` — render `Contact` as the last child of `main`, then `Footer` after `main`.
- `src/components/icons/index.tsx` — no change required; reuse `ArrowUpRight` and a typographic upward arrow in the footer.
- No token changes, image assets, dependencies, or metadata changes are required.

### 7.3 Component interfaces

```ts
interface ContactProps {
  heading: ContactHeading
  contact: ContactDetails
  socials: SocialLink[]
}

interface FooterProps {
  name: string
}
```

`App` passes `content.contactHeading`, `content.contact`, and `content.socials` to `Contact`, then `content.name` to `Footer`.

## 8. Accessibility

- Use one `section` with `aria-labelledby="contact-title"` and one `h2`.
- Use a real `ul` with `role="list"` for the secondary channels; reset list styling without losing semantics.
- Keep the `Work email` label inside the primary link so its accessible name includes both purpose and address.
- Use descriptive link text for every row; no icon-only links.
- Use `mailto:` for both email addresses and a sanitized `tel:` href for the phone.
- Open GitHub and LinkedIn in a new tab with `rel="noreferrer"` and announce that behaviour with visually hidden text.
- Preserve the global focus-visible outline; do not remove outlines or replace them with colour-only changes.
- Keep text contrast at or above the existing muted-text contrast against the dark background.
- Keep the footer outside `main`; the Back to top link must be keyboard reachable after the Contact links.
- The decorative glow and all icons are `aria-hidden` or CSS-only.

## 9. Verification

There is no automated test framework in this repository. Verification uses the existing commands plus browser checks:

1. `npm run lint`
2. `npm run build`
3. Browser QA at 360px, 768px, and 1280px:
   - Contact appears after Experience and before the footer.
   - Navbar Contact link scrolls to `#contact` without the heading being covered by the navbar.
   - Contact becomes the active nav item when the section is in view.
   - Work email, personal email, phone, GitHub, and LinkedIn have the expected hrefs.
   - GitHub and LinkedIn open in a new tab; email and phone do not.
   - Footer year is current, and Back to top returns to `#home`.
   - No horizontal scrolling at any tested width.
   - Keyboard tab order reaches every link, with a visible focus ring.
   - Hover/focus gradient and arrow states work; reduced-motion mode removes the transitions.
4. Production preview check with the built site.

## 10. Future work

- Replace the placeholder work email, personal email, phone number, GitHub URL, and LinkedIn URL with real details.
- Replace the placeholder intro copy with the owner’s preferred wording.
- Add more social channels only if they become relevant; the current design is intentionally limited to GitHub and LinkedIn.
- A contact form remains out of scope until a backend or form service is chosen.
