# The Susegad Courtyard

Marketing & booking site for a heritage vacation rental in Anjuna, Goa.
Content is config-driven from `src/lib/config.ts`; booking is delegated to Airbnb.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** with shadcn (base-nova / Base UI) components
- **framer-motion** for animation
- **Leaflet** for the interactive map (client-only, `ssr: false`)
- Deployed on **Vercel** via the GitHub integration

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start the dev server                 |
| `npm run build`       | Production build                     |
| `npm run start`       | Serve the production build           |
| `npm run lint`        | ESLint                               |
| `npm run typecheck`   | `tsc --noEmit`                       |

## Content model

All site copy, rooms, experiences, gallery, testimonials, contact details and
navigation live in [`src/lib/config.ts`](src/lib/config.ts). To update the site
(replace placeholder phone/email/photos with real data, adjust pricing, etc.)
edit that one file.

`NEXT_PUBLIC_SITE_URL` (see `.env.example`) overrides the canonical URL used for
SEO metadata, the sitemap and `robots.txt`.

## Project structure

```
src/
  app/                  # routes: /, /about, /explore, /contact + sitemap/robots
  components/
    cards/              # RoomCard, ExperienceCard
    layout/             # NavBar, FloatingNav, Footer
    sections/           # Hero, Map, Gallery, Testimonials, Availability
    ui/                 # shadcn (Base UI) primitives + PrimaryButton, AnimateIn
    widgets/            # RegionToggle (currency), WhatsAppFloat
  lib/                  # config.ts (content), types.ts, utils.ts (cn)
```

## CI

GitHub Actions (`.github/workflows/`) run lint, typecheck and build on every
push/PR to `main`, plus CodeQL, `npm audit` and Trivy secret scanning. Husky
runs `lint-staged` (eslint + tsc) on commit and a full build on `pre-push`.

## Notes

- Local mobile-audit tooling lives in `scripts/` (hardcoded to a NixOS
  chromium path; host-specific).
