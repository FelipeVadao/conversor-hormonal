# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (usually http://localhost:5173)
npm run build      # Type-check with tsc then build with Vite
npm run lint       # ESLint
npm run preview    # Serve the production build locally
```

Deploy to Vercel (production):
```bash
vercel deploy --prod --scope felipevadaos-projects
```

## Architecture

Single-page React + TypeScript app with no backend. All logic runs in the browser.

**Data flow:** `src/data/compounds.ts` is the single source of truth for all compounds. Each entry has an `id`, a `nameKey` (i18n key), a `type` (`injectable` | `oral`), and optional `noteKey` / `sideEffectsKey` i18n keys. The converter components filter this array by type and use the keys to look up translated strings.

**i18n:** `src/i18n/index.ts` initialises i18next with two locales (`pt-BR` and `en`) from `src/i18n/locales/`. All user-facing strings live in those JSON files — nothing is hardcoded in components except unit symbols (`mg`, `ml`). Adding a new compound requires an entry in `compounds.ts` and the corresponding keys in both locale files.

**Theme:** Dark mode is toggled via a `dark` class on `<html>`. State lives in `App.tsx` and is not persisted. Tailwind's `@custom-variant dark` is configured in `index.css` to scope dark styles to `.dark` descendants.

**Styling:** Tailwind v4 (via `@tailwindcss/vite` plugin). Responsive breakpoints use the `sm:` prefix (≥640 px) for desktop variants; mobile-first defaults target phones. Shared input/label class strings are declared as module-level constants (`INPUT_CLASS`, `LABEL_CLASS`) inside each converter file.

**Converters:** `InjectableConverter` handles mg↔ml conversion using a user-supplied concentration value and a toggle for conversion direction. `OralConverter` divides desired dose by mg-per-tablet and formats the result with common fractions (¼, ½, ¾).
