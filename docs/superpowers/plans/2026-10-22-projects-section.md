# Projects Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Projects section after the hero, with two featured project cards, polished local placeholder previews, a reusable section heading, navbar integration, and responsive/accessible behavior.

**Architecture:** A new `Projects` section composes a reusable `SectionHeading` and two `ProjectCard` links from typed content. Project copy and asset references stay in `content.ts`; the cards own their layout and interaction styles. No new dependencies or animation framework are introduced.

**Tech Stack:** React 19.3, TypeScript 6.0, Vite 8.3, plain CSS, existing design tokens, local SVGs.

**Spec:** `docs/superpowers/specs/2026-10-22-projects-section-design.md`

## Global Constraints

- Dark theme only. Use the existing tokens in `src/styles/tokens.css`; do not add colors, radii, or motion values outside them. The 20px mobile card inset is the only literal spacing value in this plan.
- Do not add runtime dependencies, CSS frameworks, icon libraries, animation libraries, or routers.
- Do not push this branch. Commit locally after each task; the user will review before any push or merge.
- All project copy, hrefs, category/year values, tags, and image references live in `src/data/content.ts`. Components must not hard-code project content.
- Placeholder projects remain clearly marked with a `PLACEHOLDER` comment. Do not invent client names, awards, revenue, or user counts.
- Only the existing `Home` link and the new `Projects` link appear in the navbar. Do not add links to sections that do not exist yet.
- The section must be visible without JavaScript-triggered entrance animation.
- Plain CSS co-located with components. Use component-prefixed class names.
- Responsive target: 320px through 1440px with no horizontal scrolling.
- Accessibility: semantic section and heading structure, one whole-card link per project, visible focus rings, descriptive alt text, external-link context, and reduced-motion support.
- All images use explicit dimensions, local assets, and meaningful alt text. Decorative icons are `aria-hidden`.
- No `any`, no unused imports, no `TODO`/`TBD` comments.
- No automated test framework exists in this project. Verification uses `npm run build`, `npm run lint`, and the browser checks in Task 5.

## Review Focus

These are the failure modes a reasonable visitor would hit that the happy-path build does not prove. Each is checked in Task 5.

1. **320px viewport and 200% zoom** — the editorial header, card titles, metadata, summaries, and tags must wrap without horizontal scrolling or clipped focus rings.
2. **Keyboard-only card navigation** — each whole card must receive a visible focus ring, expose a concise accessible name, and activate its external link with Enter.
3. **Reduced motion** — card lift, preview scaling, and arrow translation must be disabled while border and color feedback remain.
4. **External-link context** — both cards open in a new tab with `noopener noreferrer`, and screen readers hear the project title plus “opens in a new tab.”
5. **Content replacement** — replacing a project title, summary, tag, image, or URL in `content.ts` must update the UI without touching component code or breaking the card height.

---

## File Structure

### Create

| Path | Responsibility |
|---|---|
| `src/assets/images/project-atlas-placeholder.svg` | 16:10 analytics dashboard preview for Atlas. |
| `src/assets/images/project-nova-placeholder.svg` | 16:10 storefront preview for Nova. |
| `src/components/ui/SectionHeading.tsx` | Reusable eyebrow, section title, and supporting-copy slot. |
| `src/components/ui/SectionHeading.css` | Section heading layout and typography. |
| `src/components/ui/ProjectCard.tsx` | One whole-card project link with preview, metadata, summary, and tags. |
| `src/components/ui/ProjectCard.css` | Card layout, hover/focus states, and reduced-motion rules. |
| `src/components/sections/Projects.tsx` | Projects section composition. |
| `src/components/sections/Projects.css` | Section spacing, top border, and project grid. |

### Modify

| Path | Change |
|---|---|
| `src/data/types.ts` | Add `category`/`year` to `ProjectItem`; add `ProjectsHeading` and `projectsHeading`. |
| `src/data/content.ts` | Import the two previews; add the Projects heading, two placeholder projects, and the Projects nav link. |
| `src/App.tsx` | Render `Projects` after `Hero`. |

### Delete

None.

---

## Task 1: Project Content and Placeholder Previews

**Files:**
- Create: `src/assets/images/project-atlas-placeholder.svg`
- Create: `src/assets/images/project-nova-placeholder.svg`
- Modify: `src/data/types.ts`
- Modify: `src/data/content.ts`

**Interfaces:**
- Consumes: existing `SiteContent`, `HeroContent`, `NavItem`, and `TechItem` types.
- Produces: `ProjectItem` with `category` and `year`; `ProjectsHeading`; `content.projectsHeading`; `content.projects` with two populated entries.

- [ ] **Step 1: Create the Atlas preview SVG**

Create `src/assets/images/project-atlas-placeholder.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-labelledby="atlasTitle atlasDesc">
  <title id="atlasTitle">Atlas analytics dashboard preview</title>
  <desc id="atlasDesc">A dark analytics dashboard with metric cards, a revenue chart, traffic sources, and a recent activity table.</desc>
  <defs>
    <linearGradient id="atlasBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#090a10"/>
      <stop offset="0.55" stop-color="#10101a"/>
      <stop offset="1" stop-color="#171022"/>
    </linearGradient>
    <radialGradient id="atlasGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#c084fc" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#c084fc" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="atlasAccent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c084fc"/>
      <stop offset="1" stop-color="#f472b6"/>
    </linearGradient>
    <linearGradient id="atlasArea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c084fc" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#c084fc" stop-opacity="0"/>
    </linearGradient>
    <pattern id="atlasGrid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="#ffffff" stroke-opacity="0.035"/>
    </pattern>
    <clipPath id="atlasFrame">
      <rect x="48" y="40" width="1504" height="920" rx="28"/>
    </clipPath>
  </defs>
  <rect width="1600" height="1000" fill="url(#atlasBg)"/>
  <circle cx="1390" cy="90" r="420" fill="url(#atlasGlow)"/>
  <rect width="1600" height="1000" fill="url(#atlasGrid)"/>
  <g clip-path="url(#atlasFrame)">
    <rect x="48" y="40" width="1504" height="920" fill="#11131b"/>
    <rect x="48" y="40" width="1504" height="76" fill="#171925"/>
    <circle cx="86" cy="78" r="7" fill="#f472b6"/>
    <circle cx="110" cy="78" r="7" fill="#fbbf24"/>
    <circle cx="134" cy="78" r="7" fill="#34d399"/>
    <rect x="180" y="62" width="330" height="32" rx="16" fill="#0d0f16" stroke="#272a38"/>
    <text x="202" y="84" fill="#8f93a8" font-family="Arial, sans-serif" font-size="14">app.atlas.dev / overview</text>
    <rect x="1360" y="62" width="160" height="32" rx="16" fill="#f472b6" fill-opacity="0.12" stroke="#f472b6" stroke-opacity="0.35"/>
    <text x="1440" y="83" text-anchor="middle" fill="#f9a8d4" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2">SAMPLE DATA</text>
    <rect x="48" y="116" width="260" height="844" fill="#0d0f16"/>
    <line x1="308" y1="116" x2="308" y2="960" stroke="#252735"/>
    <rect x="80" y="150" width="34" height="34" rx="10" fill="url(#atlasAccent)"/>
    <path d="M92 176l7-15 7 15" fill="none" stroke="#15101d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="126" y="174" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="2">ATLAS</text>
    <rect x="72" y="220" width="212" height="46" rx="12" fill="#c084fc" fill-opacity="0.12"/>
    <rect x="72" y="220" width="4" height="46" rx="2" fill="#c084fc"/>
    <rect x="92" y="235" width="16" height="16" rx="4" fill="#c084fc" fill-opacity="0.8"/>
    <text x="122" y="248" fill="#e9d5ff" font-family="Arial, sans-serif" font-size="15" font-weight="600">Overview</text>
    <rect x="92" y="288" width="16" height="16" rx="4" fill="#4b4d5e"/>
    <text x="122" y="301" fill="#a8abba" font-family="Arial, sans-serif" font-size="15">Reports</text>
    <rect x="92" y="340" width="16" height="16" rx="4" fill="#4b4d5e"/>
    <text x="122" y="353" fill="#a8abba" font-family="Arial, sans-serif" font-size="15">Customers</text>
    <rect x="92" y="392" width="16" height="16" rx="4" fill="#4b4d5e"/>
    <text x="122" y="405" fill="#a8abba" font-family="Arial, sans-serif" font-size="15">Integrations</text>
    <rect x="92" y="444" width="16" height="16" rx="4" fill="#4b4d5e"/>
    <text x="122" y="457" fill="#a8abba" font-family="Arial, sans-serif" font-size="15">Settings</text>
    <rect x="72" y="812" width="212" height="82" rx="14" fill="#171925" stroke="#2a2c3a"/>
    <circle cx="100" cy="844" r="15" fill="url(#atlasAccent)"/>
    <text x="126" y="842" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="13" font-weight="600">Workspace plan</text>
    <text x="126" y="862" fill="#8f93a8" font-family="Arial, sans-serif" font-size="12">Preview only</text>
    <rect x="90" y="874" width="176" height="6" rx="3" fill="#2a2c3a"/>
    <rect x="90" y="874" width="118" height="6" rx="3" fill="#c084fc"/>
    <text x="340" y="174" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="34" font-weight="700">Overview</text>
    <text x="340" y="204" fill="#8f93a8" font-family="Arial, sans-serif" font-size="15">Product performance at a glance</text>
    <rect x="1280" y="146" width="232" height="42" rx="12" fill="#171925" stroke="#2a2c3a"/>
    <text x="1300" y="172" fill="#c7c9d4" font-family="Arial, sans-serif" font-size="14">Last 30 days</text>
    <path d="m1480 160 8 8 8-8" fill="none" stroke="#8f93a8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <g>
      <rect x="340" y="240" width="374" height="140" rx="18" fill="#171a24" stroke="#2a2c3a"/>
      <text x="364" y="278" fill="#8f93a8" font-family="Arial, sans-serif" font-size="14">Monthly recurring revenue</text>
      <text x="364" y="326" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="34" font-weight="700">$128.4k</text>
      <rect x="364" y="342" width="74" height="24" rx="12" fill="#34d399" fill-opacity="0.12"/>
      <text x="378" y="359" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="12">+12.8%</text>
    </g>
    <g>
      <rect x="738" y="240" width="374" height="140" rx="18" fill="#171a24" stroke="#2a2c3a"/>
      <text x="762" y="278" fill="#8f93a8" font-family="Arial, sans-serif" font-size="14">Active accounts</text>
      <text x="762" y="326" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="34" font-weight="700">8,492</text>
      <rect x="762" y="342" width="64" height="24" rx="12" fill="#f472b6" fill-opacity="0.12"/>
      <text x="776" y="359" fill="#f9a8d4" font-family="Arial, sans-serif" font-size="12">+8.2%</text>
    </g>
    <g>
      <rect x="1136" y="240" width="374" height="140" rx="18" fill="#171a24" stroke="#2a2c3a"/>
      <text x="1160" y="278" fill="#8f93a8" font-family="Arial, sans-serif" font-size="14">Conversion rate</text>
      <text x="1160" y="326" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="34" font-weight="700">4.8%</text>
      <rect x="1160" y="342" width="64" height="24" rx="12" fill="#67e8f9" fill-opacity="0.12"/>
      <text x="1174" y="359" fill="#a5f3fc" font-family="Arial, sans-serif" font-size="12">+1.4%</text>
    </g>
    <rect x="340" y="404" width="760" height="356" rx="18" fill="#171a24" stroke="#2a2c3a"/>
    <text x="364" y="444" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="20" font-weight="600">Revenue</text>
    <text x="364" y="468" fill="#8f93a8" font-family="Arial, sans-serif" font-size="13">Last 30 days compared with previous period</text>
    <rect x="948" y="424" width="124" height="30" rx="15" fill="#0d0f16" stroke="#2a2c3a"/>
    <text x="1010" y="444" text-anchor="middle" fill="#c7c9d4" font-family="Arial, sans-serif" font-size="12">USD</text>
    <g stroke="#ffffff" stroke-opacity="0.05">
      <line x1="380" y1="512" x2="1060" y2="512"/>
      <line x1="380" y1="562" x2="1060" y2="562"/>
      <line x1="380" y1="612" x2="1060" y2="612"/>
      <line x1="380" y1="662" x2="1060" y2="662"/>
      <line x1="380" y1="712" x2="1060" y2="712"/>
    </g>
    <path d="M380 664C425 644 447 612 492 620S557 590 602 602 667 552 712 566 777 524 822 534 887 488 932 504 997 462 1042 474 1052 456 1060 452V712H380Z" fill="url(#atlasArea)"/>
    <path d="M380 664C425 644 447 612 492 620S557 590 602 602 667 552 712 566 777 524 822 534 887 488 932 504 997 462 1042 474 1052 456 1060 452" fill="none" stroke="url(#atlasAccent)" stroke-width="4" stroke-linecap="round"/>
    <g fill="#171a24" stroke="#c084fc" stroke-width="3">
      <circle cx="492" cy="620" r="7"/>
      <circle cx="712" cy="566" r="7"/>
      <circle cx="932" cy="504" r="7"/>
      <circle cx="1060" cy="452" r="7"/>
    </g>
    <rect x="1124" y="404" width="386" height="356" rx="18" fill="#171a24" stroke="#2a2c3a"/>
    <text x="1148" y="444" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="20" font-weight="600">Traffic sources</text>
    <circle cx="1317" cy="566" r="72" fill="none" stroke="#222531" stroke-width="28"/>
    <circle cx="1317" cy="566" r="72" fill="none" stroke="#c084fc" stroke-width="28" stroke-dasharray="203 249" transform="rotate(-90 1317 566)"/>
    <circle cx="1317" cy="566" r="72" fill="none" stroke="#f472b6" stroke-width="28" stroke-dasharray="136 316" stroke-dashoffset="-203" transform="rotate(-90 1317 566)"/>
    <circle cx="1317" cy="566" r="72" fill="none" stroke="#67e8f9" stroke-width="28" stroke-dasharray="113 339" stroke-dashoffset="-339" transform="rotate(-90 1317 566)"/>
    <text x="1317" y="562" text-anchor="middle" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="28" font-weight="700">45%</text>
    <text x="1317" y="582" text-anchor="middle" fill="#8f93a8" font-family="Arial, sans-serif" font-size="12">Organic</text>
    <g font-family="Arial, sans-serif" font-size="12" fill="#a8abba">
      <rect x="1150" y="668" width="10" height="10" rx="3" fill="#c084fc"/>
      <text x="1170" y="677">Organic search</text>
      <rect x="1150" y="694" width="10" height="10" rx="3" fill="#f472b6"/>
      <text x="1170" y="703">Direct</text>
      <rect x="1150" y="720" width="10" height="10" rx="3" fill="#67e8f9"/>
      <text x="1170" y="729">Referral</text>
    </g>
    <rect x="340" y="788" width="1170" height="132" rx="18" fill="#171a24" stroke="#2a2c3a"/>
    <text x="364" y="824" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="18" font-weight="600">Recent activity</text>
    <line x1="364" y1="844" x2="1486" y2="844" stroke="#2a2c3a"/>
    <g font-family="Arial, sans-serif" font-size="13">
      <text x="364" y="870" fill="#8f93a8">Project</text>
      <text x="820" y="870" fill="#8f93a8">Owner</text>
      <text x="1120" y="870" fill="#8f93a8">Status</text>
      <text x="364" y="900" fill="#d9d9e3">Project A</text>
      <text x="820" y="900" fill="#a8abba">Team</text>
      <rect x="1120" y="884" width="86" height="24" rx="12" fill="#34d399" fill-opacity="0.12"/>
      <text x="1163" y="900" text-anchor="middle" fill="#6ee7b7">On track</text>
    </g>
    <text x="800" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="14" fill="#f472b6" fill-opacity="0.13" transform="rotate(-16 800 520)">SAMPLE DATA</text>
  </g>
  <rect x="48" y="40" width="1504" height="920" rx="28" fill="none" stroke="#2c2e3d"/>
</svg>
```

- [ ] **Step 2: Create the Nova preview SVG**

Create `src/assets/images/project-nova-placeholder.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-labelledby="novaTitle novaDesc">
  <title id="novaTitle">Nova storefront preview</title>
  <desc id="novaDesc">A warm editorial storefront with a featured homeware collection and a three-product grid.</desc>
  <defs>
    <linearGradient id="novaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f8f3ec"/>
      <stop offset="1" stop-color="#ede2d6"/>
    </linearGradient>
    <linearGradient id="novaPlum" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#32162f"/>
      <stop offset="1" stop-color="#1c0d1d"/>
    </linearGradient>
    <linearGradient id="novaRose" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c97a8c"/>
      <stop offset="1" stop-color="#8c4a5f"/>
    </linearGradient>
    <linearGradient id="novaAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f472b6"/>
      <stop offset="1" stop-color="#c084fc"/>
    </linearGradient>
    <clipPath id="novaHeroClip">
      <rect x="80" y="140" width="1440" height="520" rx="28"/>
    </clipPath>
  </defs>
  <rect width="1600" height="1000" fill="url(#novaBg)"/>
  <rect x="0" y="0" width="1600" height="96" fill="#f8f3ec"/>
  <line x1="0" y1="96" x2="1600" y2="96" stroke="#ddcec0"/>
  <text x="80" y="61" fill="#2b142b" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="7">NOVA</text>
  <g font-family="Arial, sans-serif" font-size="15" fill="#5a4350">
    <text x="570" y="60">Shop</text>
    <text x="650" y="60">Journal</text>
    <text x="750" y="60">About</text>
  </g>
  <rect x="1384" y="28" width="136" height="40" rx="20" fill="#2b142b"/>
  <text x="1452" y="53" text-anchor="middle" fill="#f8f3ec" font-family="Arial, sans-serif" font-size="13">Bag (2)</text>
  <g clip-path="url(#novaHeroClip)">
    <rect x="80" y="140" width="1440" height="520" fill="url(#novaPlum)"/>
    <rect x="80" y="140" width="740" height="520" fill="#2b142b"/>
    <text x="126" y="222" fill="#f472b6" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="3">NEW SEASON / 2026</text>
    <text x="126" y="306" fill="#f8f3ec" font-family="Arial, sans-serif" font-size="62" font-weight="700">Objects for</text>
    <text x="126" y="380" fill="#f8f3ec" font-family="Arial, sans-serif" font-size="62" font-weight="700">slow living</text>
    <text x="126" y="436" fill="#d8c9c5" font-family="Arial, sans-serif" font-size="18">Considered pieces for the home, made to last.</text>
    <rect x="126" y="488" width="238" height="52" rx="26" fill="#f3ede4"/>
    <text x="245" y="521" text-anchor="middle" fill="#2b142b" font-family="Arial, sans-serif" font-size="14" font-weight="700">Explore the collection</text>
    <rect x="820" y="140" width="700" height="520" fill="#e7d7c9"/>
    <circle cx="1170" cy="390" r="190" fill="#d7b8a8" fill-opacity="0.45"/>
    <ellipse cx="1170" cy="520" rx="176" ry="34" fill="#7a4054" fill-opacity="0.18"/>
    <path d="M1080 508c0-58 30-88 90-88s90 30 90 88v28c0 38-30 62-90 62s-90-24-90-62z" fill="url(#novaRose)"/>
    <path d="M1118 420c0-30 23-54 52-54s52 24 52 54v28h-104z" fill="#d79aa6"/>
    <ellipse cx="1170" cy="352" rx="34" ry="14" fill="#f0d7ca"/>
    <path d="M1170 338c-8-30 6-48 22-58-2 22-4 38-22 58z" fill="#8c4a5f"/>
    <rect x="850" y="180" width="118" height="34" rx="17" fill="#f8f3ec" fill-opacity="0.82"/>
    <text x="909" y="202" text-anchor="middle" fill="#2b142b" font-family="Arial, sans-serif" font-size="12">01 / 03</text>
    <rect x="850" y="584" width="160" height="4" rx="2" fill="#f8f3ec" fill-opacity="0.45"/>
    <rect x="850" y="584" width="72" height="4" rx="2" fill="#f472b6"/>
  </g>
  <g>
    <rect x="80" y="700" width="440" height="240" rx="18" fill="#e7ded2"/>
    <rect x="100" y="720" width="400" height="146" rx="12" fill="#d9c7b6"/>
    <ellipse cx="300" cy="840" rx="66" ry="12" fill="#8c4a5f" fill-opacity="0.15"/>
    <path d="M258 828c0-34 16-52 42-52s42 18 42 52v8c0 18-16 28-42 28s-42-10-42-28z" fill="#b86f7e"/>
    <path d="M278 786c0-18 10-32 22-38 12 6 22 20 22 38v18h-44z" fill="#d79aa6"/>
    <text x="100" y="900" fill="#2b142b" font-family="Arial, sans-serif" font-size="20" font-weight="600">Ripple vase</text>
    <text x="500" y="900" text-anchor="end" fill="#6f5461" font-family="Arial, sans-serif" font-size="16">$84</text>
    <rect x="100" y="916" width="92" height="3" rx="2" fill="url(#novaAccent)"/>
  </g>
  <g>
    <rect x="560" y="700" width="440" height="240" rx="18" fill="#e7ded2"/>
    <rect x="580" y="720" width="400" height="146" rx="12" fill="#d9c7b6"/>
    <path d="M720 812v-48c0-18 14-32 30-32s30 14 30 32v48h-60z" fill="#8c4a5f"/>
    <path d="M712 780c0-38 18-64 38-64s38 26 38 64" fill="none" stroke="#8c4a5f" stroke-width="9" stroke-linecap="round"/>
    <text x="580" y="900" fill="#2b142b" font-family="Arial, sans-serif" font-size="20" font-weight="600">Everyday tote</text>
    <text x="960" y="900" text-anchor="end" fill="#6f5461" font-family="Arial, sans-serif" font-size="16">$120</text>
    <rect x="580" y="916" width="72" height="3" rx="2" fill="#f472b6"/>
  </g>
  <g>
    <rect x="1040" y="700" width="440" height="240" rx="18" fill="#e7ded2"/>
    <rect x="1060" y="720" width="400" height="146" rx="12" fill="#d9c7b6"/>
    <ellipse cx="1260" cy="838" rx="48" ry="10" fill="#8c4a5f" fill-opacity="0.15"/>
    <rect x="1230" y="782" width="60" height="52" rx="8" fill="#b86f7e"/>
    <rect x="1242" y="770" width="36" height="12" rx="6" fill="#8c4a5f"/>
    <path d="M1260 744c-8-14 0-28 10-34 4 14 2 26-10 34z" fill="#f472b6"/>
    <text x="1060" y="900" fill="#2b142b" font-family="Arial, sans-serif" font-size="20" font-weight="600">Ember candle</text>
    <text x="1460" y="900" text-anchor="end" fill="#6f5461" font-family="Arial, sans-serif" font-size="16">$48</text>
    <rect x="1060" y="916" width="64" height="3" rx="2" fill="#c084fc"/>
  </g>
</svg>
```

- [ ] **Step 3: Extend the content types**

Modify `src/data/types.ts` so `ProjectItem` reads:

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

Add this interface above `SiteContent`:

```ts
export interface ProjectsHeading {
  index: string
  label: string
  title: string
  intro: string
}
```

Add the heading to `SiteContent` directly after `projects`:

```ts
export interface SiteContent extends HeroContent {
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  projectsHeading: ProjectsHeading
  experience: ExperienceItem[]
  socials: SocialLink[]
}
```

- [ ] **Step 4: Add the placeholder projects to `content.ts`**

Add these imports after the avatar import:

```ts
import projectAtlasUrl from '../assets/images/project-atlas-placeholder.svg'
import projectNovaUrl from '../assets/images/project-nova-placeholder.svg'
```

Update the type import to include the new types:

```ts
import type {
  HeroContent,
  NavItem,
  ProjectItem,
  ProjectsHeading,
  SiteContent,
  TechItem,
} from './types'
```

Add the following constants after the `tech` array:

```ts
// PLACEHOLDER CONTENT — replace these projects with real work.
const projectsHeading: ProjectsHeading = {
  index: '01',
  label: 'Selected work',
  title: 'Projects',
  intro:
    'A selection of interfaces and systems I’ve built from concept through launch.',
}

const projects: ProjectItem[] = [
  {
    title: 'Atlas',
    category: 'Analytics dashboard',
    year: '2025',
    description:
      'A concept analytics workspace that turns multi-source product data into clear, actionable views.',
    tags: ['React', 'TypeScript', 'PostgreSQL'],
    image: projectAtlasUrl,
    imageAlt: 'Preview of the Atlas analytics dashboard',
    href: 'https://example.com',
  },
  {
    title: 'Nova',
    category: 'E-commerce storefront',
    year: '2024',
    description:
      'A storefront concept pairing editorial product storytelling with a streamlined shopping path.',
    tags: ['React', 'Tailwind CSS', 'Supabase'],
    image: projectNovaUrl,
    imageAlt: 'Preview of the Nova storefront',
    href: 'https://example.com',
  },
]
```

Update the exported `content` object:

```ts
export const content: SiteContent = {
  ...hero,
  nav,
  tech,
  projectsHeading,
  projects,
  experience: [],
  socials: [],
}
```

- [ ] **Step 5: Verify the content layer**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The new SVG imports resolve, and `SiteContent` is satisfied by `projectsHeading`.

- [ ] **Step 6: Commit**

```powershell
git add src/assets/images/project-atlas-placeholder.svg src/assets/images/project-nova-placeholder.svg src/data/types.ts src/data/content.ts
git commit -m "feat: add project content and previews"
```

---

## Task 2: Reusable Section Heading

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/SectionHeading.css`

**Interfaces:**
- Consumes: `ReactNode` and existing typography/spacing tokens.
- Produces: `SectionHeading({ index, label, title, titleId, children })`.

- [ ] **Step 1: Create `SectionHeading.tsx`**

```tsx
import type { ReactNode } from 'react'
import './SectionHeading.css'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  titleId: string
  children?: ReactNode
}

export function SectionHeading({
  index,
  label,
  title,
  titleId,
  children,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="section-heading__main">
        <p className="section-heading__eyebrow">
          {index} / {label}
        </p>
        <h2 id={titleId} className="section-heading__title">
          {title}
        </h2>
      </div>

      {children ? <div className="section-heading__aside">{children}</div> : null}
    </header>
  )
}
```

- [ ] **Step 2: Create `SectionHeading.css`**

```css
.section-heading {
  display: grid;
  gap: var(--space-5);
}

.section-heading__main {
  display: grid;
  gap: var(--space-3);
}

.section-heading__eyebrow {
  background: var(--gradient-accent);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.4;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
}

.section-heading__title {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.section-heading__aside {
  max-width: 38ch;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.7;
  text-wrap: pretty;
}

@media (min-width: 900px) {
  .section-heading {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
    align-items: end;
    gap: var(--space-7);
  }

  .section-heading__aside {
    justify-self: end;
    width: 100%;
  }
}

@media (forced-colors: active) {
  .section-heading__eyebrow {
    background: none;
    color: currentColor;
    -webkit-text-fill-color: currentColor;
  }
}
```

- [ ] **Step 3: Verify the heading component compiles**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass with no unused imports.

- [ ] **Step 4: Commit**

```powershell
git add src/components/ui/SectionHeading.tsx src/components/ui/SectionHeading.css
git commit -m "feat: add reusable section heading"
```

---

## Task 3: Project Card

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/ui/ProjectCard.css`

**Interfaces:**
- Consumes: `ProjectItem`, `ArrowUpRight`, and `useId`.
- Produces: `ProjectCard({ project })`, a single external link containing the preview, metadata, title, summary, and tags.

- [ ] **Step 1: Create `ProjectCard.tsx`**

```tsx
import { useId } from 'react'
import type { ProjectItem } from '../../data/types'
import { ArrowUpRight } from '../icons'
import './ProjectCard.css'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const id = useId()
  const titleId = `${id}-title`
  const externalId = `${id}-external`

  return (
    <a
      className="project-card"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={`${titleId} ${externalId}`}
    >
      <div className="project-card__media">
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          <span className="project-card__year">{project.year}</span>
        </div>

        <div className="project-card__title-row">
          <h3 id={titleId} className="project-card__title">
            {project.title}
          </h3>
          <ArrowUpRight
            className="project-card__arrow"
            width="20"
            height="20"
          />
        </div>

        <p className="project-card__summary">{project.description}</p>

        <ul
          className="project-card__tags"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>

        <span id={externalId} className="visually-hidden">
          project — opens in a new tab
        </span>
      </div>
    </a>
  )
}
```

- [ ] **Step 2: Create `ProjectCard.css`**

```css
.project-card {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.project-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-raised);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-base) var(--ease-out);
}

.project-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
}

.project-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  font-size: 0.75rem;
  line-height: 1.4;
}

.project-card__category {
  color: var(--color-accent-from);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-card__year {
  color: var(--color-text-muted);
  white-space: nowrap;
}

.project-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.project-card__title {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-wrap: balance;
}

.project-card__arrow {
  flex: none;
  color: var(--color-text-muted);
  transition:
    color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.project-card__summary {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  text-wrap: pretty;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}

.project-card__tag {
  padding: 5px 9px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface-raised);
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.4;
}

.project-card:focus-visible {
  border-color: var(--color-accent-from);
  border-radius: var(--radius-lg);
  outline-offset: 4px;
  transform: translateY(-2px);
}

.project-card:focus-visible .project-card__arrow {
  color: var(--color-accent-from);
  transform: translate(2px, -2px);
}

.project-card:focus-visible .project-card__media img {
  transform: scale(1.03);
}

@media (hover: hover) {
  .project-card:hover {
    border-color: var(--color-accent-from);
    transform: translateY(-2px);
  }

  .project-card:hover .project-card__arrow {
    color: var(--color-accent-from);
    transform: translate(2px, -2px);
  }

  .project-card:hover .project-card__media img {
    transform: scale(1.03);
  }
}

@media (max-width: 639px) {
  .project-card__body {
    padding: 20px;
  }

  .project-card__title {
    font-size: 1.125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card__media img,
  .project-card__arrow {
    transition: none;
  }

  .project-card:hover,
  .project-card:focus-visible,
  .project-card:hover .project-card__media img,
  .project-card:focus-visible .project-card__media img {
    transform: none;
  }

  .project-card:hover .project-card__arrow,
  .project-card:focus-visible .project-card__arrow {
    transform: none;
  }
}
```

- [ ] **Step 3: Verify the card component compiles**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass. The card is not mounted yet, so the page is unchanged.

- [ ] **Step 4: Commit**

```powershell
git add src/components/ui/ProjectCard.tsx src/components/ui/ProjectCard.css
git commit -m "feat: add project card"
```

---

## Task 4: Projects Section and Integration

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/sections/Projects.css`
- Modify: `src/App.tsx`
- Modify: `src/data/content.ts`

**Interfaces:**
- Consumes: `content.projectsHeading`, `content.projects`, `SectionHeading`, and `ProjectCard`.
- Produces: a rendered `#projects` section and an active `Projects` nav link.

- [ ] **Step 1: Add the Projects nav link**

In `src/data/content.ts`, update `nav` to:

```ts
const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
]
```

- [ ] **Step 2: Create `Projects.tsx`**

```tsx
import type { ProjectItem, ProjectsHeading } from '../../data/types'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'
import './Projects.css'

interface ProjectsProps {
  heading: ProjectsHeading
  projects: ProjectItem[]
}

export function Projects({ heading, projects }: ProjectsProps) {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index={heading.index}
          label={heading.label}
          title={heading.title}
          titleId="projects-title"
        >
          <p>{heading.intro}</p>
        </SectionHeading>

        <ul className="projects__grid">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `Projects.css`**

```css
.projects {
  padding-block: var(--section-padding);
  border-top: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
  margin-top: var(--space-7);
}

.projects__grid > li {
  display: flex;
  min-width: 0;
}

@media (min-width: 900px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

- [ ] **Step 4: Render Projects from `App.tsx`**

Add the import:

```tsx
import { Projects } from './components/sections/Projects'
```

Add the section after `Hero`:

```tsx
<main id="main" tabIndex={-1}>
  <Hero hero={content} tech={content.tech} />
  <Projects heading={content.projectsHeading} projects={content.projects} />
</main>
```

- [ ] **Step 5: Verify the integrated section**

Run:

```powershell
npm run build
npm run lint
```

Expected: both pass.

- [ ] **Step 6: Commit**

```powershell
git add src/components/sections/Projects.tsx src/components/sections/Projects.css src/App.tsx src/data/content.ts
git commit -m "feat: add projects section"
```

---

## Task 5: Final Verification

**Files:**
- Modify only if verification finds a defect.

**Interfaces:**
- Consumes: the complete Projects section, navbar, and placeholder assets.
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

1. Scroll past the hero. The section has a top border, the `01 / Selected work` eyebrow, the `Projects` h2, and the intro in the right column.
2. Two equal-height cards appear side by side with a 24px gap.
3. Both previews load; Atlas reads as an analytics dashboard, Nova as a warm storefront.
4. Each card shows category, year, title, arrow, summary, and three tags.
5. No horizontal scrollbar appears.

- [ ] **Step 4: Check the responsive breakpoints**

Check these widths:

1. `1024×900` — two columns; header remains two columns.
2. `900×900` — exactly two columns; header remains two columns.
3. `899×900` — one column; header stacks; cards are full width.
4. `768×900` — one column; no clipped content.
5. `640×800` — body padding reduces; tags wrap cleanly.
6. `360×800` — one column; title, summary, and tags wrap; no horizontal scroll.
7. `320×800` — the same, with no clipped focus ring or overflow.

At `200%` browser zoom on desktop, confirm the header and cards reflow without clipping.

- [ ] **Step 5: Check keyboard and link behavior**

1. Tab from the navbar into the first card. The whole card shows a visible focus ring.
2. The accessible name should include `Atlas` and `opens in a new tab`.
3. Press `Enter`; `https://example.com` opens in a new tab.
4. Tab to the second card and repeat for Nova.
5. Activate `Projects` in the navbar; the page scrolls to the section and the link receives the active state.
6. Scroll between Home and Projects; the active nav link changes appropriately.
7. Open the browser console: no errors, no React warnings, and no failed asset requests.

- [ ] **Step 6: Check hover and reduced motion**

1. Hover each card: the border shifts to violet, the card lifts 2px, the preview scales to 1.03, and the arrow moves up-right.
2. Enable `prefers-reduced-motion: reduce` in DevTools. Hover again: the border and arrow color still respond, but the card, image, and arrow do not transform.
3. Disable the emulation afterward.

- [ ] **Step 7: Rehearse a content replacement**

In `src/data/content.ts`, temporarily change the Atlas title to `Atlas Studio`, then confirm:

1. The card updates through HMR.
2. The card height stays balanced with Nova.
3. The accessible name updates.

Revert the title to `Atlas` and confirm the UI returns to its original state.

- [ ] **Step 8: Commit any verification fixes**

If Steps 3–7 required code changes, commit them:

```powershell
git add -A
git commit -m "fix: polish projects section"
```

If no changes were required, do not create an empty commit.

- [ ] **Step 9: Report the local commit set**

Run:

```powershell
git status --short
git log --oneline -5
```

Expected: a clean working tree and the task commits on `feat/projects-section`. Do not push.

---

## Final Acceptance Checklist

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] Projects renders after the hero with the `01 / Selected work` eyebrow and `Projects` heading.
- [ ] The navbar contains Home and Projects; the active link updates between them.
- [ ] Two equal-height cards appear at 900px and above; one column below 900px.
- [ ] Each card has a preview, category/year, title, arrow, summary, and tags.
- [ ] Each card is one external link with a visible keyboard focus ring and correct accessible name.
- [ ] Atlas and Nova previews load from local assets and are not distorted.
- [ ] Hover and focus states match the design.
- [ ] Reduced motion disables card and image transforms.
- [ ] No horizontal scrolling at 320px or at 200% zoom.
- [ ] No new dependencies were added.
- [ ] The working tree is clean and all changes are committed locally; nothing is pushed.
