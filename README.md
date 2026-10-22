# Rikcy Tano — Portfolio

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

In-page copy, navigation, links, UI labels, and asset references live in
`src/data/content.ts` as the `content` object. Replace the placeholder
values with your real details.

### Page metadata

Static document metadata lives in `index.html`: `<title>`, description,
Open Graph tags, and theme colour. Update those separately; social preview
crawlers read the HTML, not the React app.

The `content` object already includes empty `projects`, `experience`, and
`socials` arrays for later bricks.

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
