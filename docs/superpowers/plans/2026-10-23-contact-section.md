# Contact Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a professional Contact section and footer to the portfolio, with a work-email primary CTA and a secondary ledger for personal email, phone, GitHub, and LinkedIn.

**Architecture:** Content-driven React section. `content.ts` owns every placeholder value; `Contact` renders the section; `Footer` renders the closing bar; `App` composes both. Styling is plain CSS using the existing tokens, hairlines, and 880px content rail.

**Tech Stack:** React 19, TypeScript, Vite, plain CSS, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-23-contact-section-design.md`

## Global Constraints

- Preserve the dark theme, violet→magenta accent, 1px hairlines, and 880px content rail.
- Add no dependencies, image assets, or token changes.
- No contact form, backend, map, scheduling, or copy-to-clipboard action.
- Use only GitHub and LinkedIn as social channels. Do not add X, Instagram, YouTube, or social icon buttons.
- Keep every contact value in the comment-marked `contact` block in `src/data/content.ts`.
- Use these exact placeholders:
  - Work email: `work@example.com`
  - Personal email: `hello@example.com`
  - Phone: `+63 912 345 6789`
  - GitHub: `https://github.com/placeholder`
  - LinkedIn: `https://www.linkedin.com/in/placeholder`
- Eyebrow is `03 / Get in touch`; section title is `Contact`.
- The footer lives outside `main`, uses the current year, and links Back to top to `#home`.
- No entrance animation. Respect `prefers-reduced-motion`.
- Do not change `index.html`, the site title, or the active-section observer in this pass.
- This repository has no automated test framework. Use `npm run lint`, `npm run build`, and the browser checks below. Do not add a test dependency.

## Review Focus

1. **Long email addresses at narrow widths** — at 360px, a long work-email placeholder must wrap inside the rail, keep the arrow visible, and cause no horizontal scrolling. Owning task: Task 2.
2. **Phone numbers with spaces or punctuation** — `+63 (912) 345-6789` must produce `tel:+639123456789`, not a broken `tel:` href. Owning task: Task 2.
3. **Social URLs with `www.` or a trailing slash** — the visible value must be `linkedin.com/in/placeholder`, not `https://www.linkedin.com/in/placeholder/`. Owning task: Task 2.
4. **Sticky-nav anchor offset** — clicking Contact must leave the Contact heading visible below the navbar, not hidden underneath it. Owning task: Task 2.
5. **Keyboard and assistive-technology clarity** — every contact link and Back to top must receive a visible focus ring, and GitHub/LinkedIn must announce that they open in a new tab. Owning task: Task 4.

---

### Task 1: Add the contact content model and nav entry

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/data/content.ts`

**Interfaces:**
- Consumes: `HeroContent`, `SiteContent`, `SocialLink`.
- Produces: `ContactHeading`, `ContactDetails`, `content.contactHeading`, `content.contact`, `content.socials`, and the `Contact` nav entry.

- [ ] **Step 1: Add the contact types**

In `src/data/types.ts`, insert these interfaces after `ExperienceHeading` and before `HeroLabels`:

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

- [ ] **Step 2: Extend SiteContent**

Update the `SiteContent` interface in the same file:

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

- [ ] **Step 3: Update the content imports**

In `src/data/content.ts`, add the new types and `SocialLink` to the existing type import:

```ts
import type {
  ContactDetails,
  ContactHeading,
  ExperienceHeading,
  ExperienceItem,
  HeroContent,
  NavItem,
  ProjectItem,
  ProjectsHeading,
  SiteContent,
  SocialLink,
  TechItem,
} from './types'
```

- [ ] **Step 4: Add the Contact nav entry**

Replace the current nav array with:

```ts
const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
```

- [ ] **Step 5: Add the contact placeholders before `hero`**

Insert this block immediately after the nav array and before `const hero`:

```ts
// CONTACT PLACEHOLDERS — replace these values with real details.
const contact: ContactDetails = {
  workEmail: 'work@example.com',
  personalEmail: 'hello@example.com',
  phone: '+63 912 345 6789',
}
```

- [ ] **Step 6: Derive the hero email from the contact block**

Change the existing `hero.email` line:

```ts
  email: contact.personalEmail,
```

This keeps the hero CTA and the personal email row from drifting apart.

- [ ] **Step 7: Add the contact heading and socials**

After the `experience` array, add:

```ts
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

- [ ] **Step 8: Add the new values to the content export**

Replace the current `content` export tail with:

```ts
export const content: SiteContent = {
  ...hero,
  nav,
  tech,
  projectsHeading,
  projects,
  experienceHeading,
  experience,
  contactHeading,
  contact,
  socials,
}
```

- [ ] **Step 9: Verify the types build**

Run:

```bash
npm run build
```

Expected: the TypeScript project and Vite build complete successfully.

- [ ] **Step 10: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 with no lint errors.

- [ ] **Step 11: Commit**

```bash
git add src/data/types.ts src/data/content.ts
git commit -m "feat: add contact content model"
```

---

### Task 2: Build the Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/Contact.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `ContactHeading`, `ContactDetails`, `SocialLink`, `ArrowUpRight`, `SectionHeading`.
- Produces: `<Contact heading={...} contact={...} socials={...} />`, rendering `<section id="contact">` with a work-email CTA and a secondary channel ledger.

- [ ] **Step 1: Create the Contact component**

Create `src/components/sections/Contact.tsx`:

```tsx
import type {
  ContactDetails,
  ContactHeading,
  SocialLink,
} from '../../data/types'
import { ArrowUpRight } from '../icons'
import { SectionHeading } from '../ui/SectionHeading'
import './Contact.css'

interface ContactProps {
  heading: ContactHeading
  contact: ContactDetails
  socials: SocialLink[]
}

function formatSocialHref(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function Contact({ heading, contact, socials }: ContactProps) {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__inner">
          <SectionHeading
            index={heading.index}
            label={heading.label}
            title={heading.title}
            titleId="contact-title"
          />

          <p className="contact__intro">{heading.intro}</p>

          <a className="contact__email" href={`mailto:${contact.workEmail}`}>
            <span className="contact__email-label">Work email</span>
            <span className="contact__email-row">
              <span className="contact__email-address">
                {contact.workEmail}
              </span>
              <ArrowUpRight
                className="contact__arrow"
                width="24"
                height="24"
              />
            </span>
          </a>

          <ul className="contact__channels" role="list">
            <li>
              <a
                className="contact__channel"
                href={`mailto:${contact.personalEmail}`}
              >
                <span className="contact__channel-text">
                  <span className="contact__channel-label">
                    Personal email
                  </span>
                  <span className="contact__channel-value">
                    {contact.personalEmail}
                  </span>
                </span>
                <ArrowUpRight
                  className="contact__arrow"
                  width="20"
                  height="20"
                />
              </a>
            </li>

            <li>
              <a className="contact__channel" href={phoneHref(contact.phone)}>
                <span className="contact__channel-text">
                  <span className="contact__channel-label">Phone</span>
                  <span className="contact__channel-value">
                    {contact.phone}
                  </span>
                </span>
                <ArrowUpRight
                  className="contact__arrow"
                  width="20"
                  height="20"
                />
              </a>
            </li>

            {socials.map((social) => {
              const displayHref = formatSocialHref(social.href)

              return (
                <li key={social.href}>
                  <a
                    className="contact__channel"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact__channel-text">
                      <span className="contact__channel-label">
                        {social.label}
                      </span>
                      <span className="contact__channel-value">
                        {displayHref}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="contact__arrow"
                      width="20"
                      height="20"
                    />
                    <span className="visually-hidden">
                      {' '}
                      (opens in a new tab)
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the Contact styles**

Create `src/components/sections/Contact.css`:

```css
.contact {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding-block: var(--section-padding);
  border-top: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.contact::before {
  content: '';
  position: absolute;
  top: -180px;
  right: -180px;
  z-index: -1;
  width: min(56vw, 560px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(192, 132, 252, 0.08),
    transparent 68%
  );
  pointer-events: none;
}

.contact__inner {
  max-width: var(--container-narrow);
  margin-inline: auto;
}

.contact__intro {
  max-width: 62ch;
  margin-top: var(--space-5);
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.7;
  text-wrap: pretty;
}

.contact__email {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

.contact__email-label,
.contact__channel-label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.4;
  text-transform: uppercase;
}

.contact__email-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
}

.contact__email-address {
  min-width: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.15;
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-decoration-color: var(--color-border-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.contact__arrow {
  flex: 0 0 auto;
  color: var(--color-text-muted);
  transition:
    color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.contact__email:hover .contact__email-address,
.contact__email:focus-visible .contact__email-address {
  background: var(--gradient-accent);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-decoration-color: var(--color-accent-to);
}

.contact__email:hover .contact__arrow,
.contact__email:focus-visible .contact__arrow {
  color: var(--color-accent-to);
  transform: translate(2px, -2px);
}

.contact__channels {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: var(--space-6);
}

.contact__channels > li {
  min-width: 0;
  border-top: 1px solid var(--color-border);
}

.contact__channel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 64px;
  padding-block: var(--space-4);
}

.contact__channel-text {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.contact__channel-value {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
  transition: color var(--duration-base) var(--ease-out);
}

.contact__channel:hover .contact__channel-value,
.contact__channel:focus-visible .contact__channel-value {
  color: var(--color-accent-from);
}

.contact__channel:hover .contact__arrow,
.contact__channel:focus-visible .contact__arrow {
  color: var(--color-accent-to);
  transform: translate(2px, -2px);
}

@media (min-width: 720px) {
  .contact__channels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--space-7);
  }
}

@media (max-width: 639px) {
  .contact::before {
    top: -120px;
    right: -120px;
    width: 360px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact__email:hover .contact__arrow,
  .contact__email:focus-visible .contact__arrow,
  .contact__channel:hover .contact__arrow,
  .contact__channel:focus-visible .contact__arrow {
    transform: none;
  }
}

@media (forced-colors: active) {
  .contact__email:hover .contact__email-address,
  .contact__email:focus-visible .contact__email-address {
    background: none;
    color: currentColor;
    -webkit-text-fill-color: currentColor;
  }
}
```

- [ ] **Step 3: Render Contact inside main**

Update `src/App.tsx` to add the Contact import and render it after Experience:

```tsx
import { Navbar } from './components/layout/Navbar'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { content } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar
        name={content.name}
        monogram={content.monogram}
        nav={content.nav}
      />

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
        <Contact
          heading={content.contactHeading}
          contact={content.contact}
          socials={content.socials}
        />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build successfully.

- [ ] **Step 5: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 with no lint errors.

- [ ] **Step 6: Check the section at desktop, tablet, and mobile widths**

Run `npm run dev` and open the printed local URL. At 1280px, 768px, and 360px:

- Contact appears after Experience.
- The eyebrow reads `03 / Get in touch` and the title reads `Contact`.
- The work email is the largest link and its underline is visible.
- The secondary ledger is two columns at 768px and one column at 360px.
- No horizontal scrolling occurs; check `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- The GitHub and LinkedIn rows show `github.com/placeholder` and `linkedin.com/in/placeholder`.
- The personal email uses `mailto:hello@example.com`.
- The phone link uses `tel:+639123456789`.
- GitHub and LinkedIn have `target="_blank"` and a visible `(opens in a new tab)` announcement in the accessibility tree.

- [ ] **Step 7: Test the nav anchor offset**

From the top of the page, click the navbar Contact link. Expected:

- The page scrolls to `#contact`.
- The Contact heading remains fully visible below the 72px sticky navbar.
- `document.getElementById('contact')?.getBoundingClientRect().top` is approximately 88px, not a negative value.
- Contact is the active nav item while the section is in view.

- [ ] **Step 8: Test a long work email at 360px**

Temporarily change `contact.workEmail` in `src/data/content.ts` to:

```ts
  workEmail: 'a-very-long-work-address-for-layout-testing@example-corporation.com',
```

At 360px, confirm the address wraps across lines, the arrow stays visible, and there is no horizontal scrolling. Then restore the original file from the Task 1 commit:

```bash
git checkout -- src/data/content.ts
```

Confirm the placeholder is back to `work@example.com`.

- [ ] **Step 9: Test phone and social formatting**

Temporarily change the phone in `src/data/content.ts` to `+63 (912) 345-6789` and the LinkedIn href to `https://www.linkedin.com/in/placeholder/`. In the browser console, verify:

```js
document.querySelector('.contact__channel[href^="tel:"]').getAttribute('href')
```

Expected: `tel:+639123456789`.

```js
[...document.querySelectorAll('.contact__channel-value')].map((node) => node.textContent)
```

Expected values include `hello@example.com`, `+63 (912) 345-6789`, `github.com/placeholder`, and `linkedin.com/in/placeholder`.

Restore the file:

```bash
git checkout -- src/data/content.ts
```

- [ ] **Step 10: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/Contact.css src/App.tsx
git commit -m "feat: add contact section"
```

---

### Task 3: Add the footer

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/Footer.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.name` as `name`.
- Produces: `<Footer name={...} />`, rendering a semantic footer after `main` with the current year and a Back to top link.

- [ ] **Step 1: Create the Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
import './Footer.css'

interface FooterProps {
  name: string
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copyright">
            © {year} {name}
          </p>
          <a className="footer__top" href="#home">
            Back to top
            <span className="footer__arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create the Footer styles**

Create `src/components/layout/Footer.css`:

```css
.footer {
  position: relative;
  border-top: 1px solid var(--color-border);
}

.footer > .container {
  width: min(calc(100% - 2 * var(--gutter)), var(--container-narrow));
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-6);
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.footer__copyright {
  margin: 0;
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  color: var(--color-text-muted);
  font-weight: 600;
  transition: color var(--duration-base) var(--ease-out);
}

.footer__top:hover,
.footer__top:focus-visible {
  color: var(--color-text);
}

.footer__arrow {
  color: var(--color-accent-to);
  transition: transform var(--duration-base) var(--ease-out);
}

.footer__top:hover .footer__arrow,
.footer__top:focus-visible .footer__arrow {
  transform: translateY(-2px);
}

.footer::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--gradient-accent);
}

@media (max-width: 639px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer__top:hover .footer__arrow,
  .footer__top:focus-visible .footer__arrow {
    transform: none;
  }
}
```

- [ ] **Step 3: Render Footer after main**

Update `src/App.tsx` to the final composition:

```tsx
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { content } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar
        name={content.name}
        monogram={content.monogram}
        nav={content.nav}
      />

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
        <Contact
          heading={content.contactHeading}
          contact={content.contact}
          socials={content.socials}
        />
      </main>

      <Footer name={content.name} />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify the build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build successfully.

- [ ] **Step 5: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 with no lint errors.

- [ ] **Step 6: Check the footer in the browser**

At 1280px and 360px:

- The footer is below the Contact section and outside `main`.
- The copyright reads `© {current year} Rikcy Tano` (2026 at the time of writing; the year is generated at runtime).
- Back to top scrolls to `#home`.
- The copyright and Back to top link sit on opposite ends at 1280px and stack at 360px.
- The 2px gradient rule spans the full viewport width at the bottom.
- The Back to top link has a visible focus ring and a 44px minimum target.
- There is no horizontal scrolling.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/Footer.css src/App.tsx
git commit -m "feat: add footer"
```

---

### Task 4: Final accessibility, responsive, and production verification

**Files:**
- No planned code changes. Modify the relevant TSX/CSS only if a check below fails.

**Interfaces:**
- Consumes: the complete page from Tasks 1–3.
- Produces: a verified production build with no regressions.

- [ ] **Step 1: Run the full checks**

```bash
npm run lint
npm run build
```

Expected: both complete with exit code 0.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview -- --host 127.0.0.1
```

Open the printed URL. The checks below use the production build, not the dev server.

- [ ] **Step 3: Verify keyboard order and focus visibility**

Starting at the top of the page, press Tab repeatedly. Expected order:

1. Skip to content
2. Navbar logo
3. Home
4. Projects
5. Experience
6. Contact
7. Hero Get in Touch
8. Hero Download CV
9. Project links
10. Contact work email
11. Contact personal email
12. Contact phone
13. Contact GitHub
14. Contact LinkedIn
15. Footer Back to top

Every link must show the global violet focus ring. GitHub and LinkedIn must announce that they open in a new tab. The footer link must be reachable after the contact links.

- [ ] **Step 4: Recheck the review-focus cases**

- At 360px, temporarily use the long work email from Task 2 Step 8 and confirm the address wraps without horizontal scrolling; restore the file afterward.
- Confirm the phone is rendered as `tel:+639123456789`.
- Confirm the LinkedIn display value is `linkedin.com/in/placeholder`.
- Click Contact in the navbar at 360px and 1280px and confirm the heading is not covered.
- Confirm the active nav state lands on Contact when the section is in view. The existing observer's known last-section edge case on very tall viewports is not being changed.

After temporary edits, restore with:

```bash
git checkout -- src/data/content.ts
```

- [ ] **Step 5: Verify reduced motion**

In browser DevTools, emulate `prefers-reduced-motion: reduce`. Hover the work email and a secondary row. Expected: no arrow translation; colour and gradient states still communicate hover, and no entrance animation runs.

- [ ] **Step 6: Verify no horizontal overflow**

At 360px, 768px, and 1280px, run:

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth
```

Expected: `true` at every width.

- [ ] **Step 7: Fix any failures**

If a check fails, make the smallest CSS or TSX correction in the owning file. Re-run:

```bash
npm run lint
npm run build
```

Then repeat the affected browser checks. If code changed, commit:

```bash
git add src/components/sections/Contact.tsx src/components/sections/Contact.css src/components/layout/Footer.tsx src/components/layout/Footer.css src/App.tsx src/data/content.ts
git commit -m "fix: polish contact section"
```

If no code changed, do not create an empty commit.

- [ ] **Step 8: Report the final result**

Record:

- The commands run and their outcomes.
- The widths checked.
- The keyboard order result.
- Any known limitation, including the existing active-section observer edge case on very tall viewports.
- The final commit hash for the contact work.
