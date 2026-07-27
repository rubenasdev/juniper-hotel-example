# Juniper Hotel & Retreat

An editorial hospitality experience for a fictional retreat in Comporta, built as a responsive React application with cinematic GSAP motion.

## Highlights

- Route-level code splitting with dedicated modules for every main experience
- Scoped GSAP timelines with automatic cleanup and responsive motion contexts
- ScrollTrigger sequences, pinned sections, parallax and card-to-stage transitions
- Reduced-motion support across CSS and JavaScript animation paths
- Accessible dialogs, focus management, keyboard tabs and semantic controls
- Abortable video preloading that behaves correctly under React Strict Mode
- External language state integrated through `useSyncExternalStore`
- Responsive layouts for desktop and mobile without a component framework

## Stack

- React 19
- Vite 8
- GSAP 3 with ScrollTrigger
- Lucide React
- ESLint with the React Hooks ruleset

## Project structure

```text
src/
  components/       Shared layout, media and interaction components
  config/           Responsive media-query constants
  data/             Static media and domain data
  hooks/            Reusable browser and animation lifecycle hooks
  i18n-runtime/     JSX runtime adapter for text localization
  lib/              Configured third-party libraries
  pages/            Route-level page modules and lazy route registry
  styles/           Global and responsive presentation layers
```

## Architecture

The application uses a deliberately small client-side navigation layer because the experience has a fixed route map and no server data requirements. Each route is loaded through `React.lazy`, producing independent production chunks while retaining native links as a browser fallback.

GSAP is registered once in `src/lib/gsap.js`. Component animation is created through `useGsapContext`, scoped to a local root ref and reverted on dependency changes or unmount. Responsive timelines use `gsap.matchMedia`, and all motion-heavy paths respect `prefers-reduced-motion`.

Language is modeled as an external store. The custom JSX runtime localizes text nodes and accessibility attributes during element creation, while a language change remounts the active presentation tree to keep static editorial copy consistent without DOM mutation observers.

## Local development

```bash
npm install
npm run dev
```

The development server runs at `http://127.0.0.1:5190`.

## Quality checks

```bash
npm run check
```

This runs the React/ESLint checks followed by a production Vite build.

## Media

Local video and image attribution is documented in `public/media/CREDITS.md`. Remote editorial photography is loaded from Unsplash and Pexels URLs contained in the data modules.
