# Translation Management App

A React application for managing interface keyword translations across multiple languages.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To run tests:

```bash
npm run test
```

## Pages

| Route | Description |
|---|---|
| `/` | Public view — browse keywords and switch languages |
| `/dashboard` | Management dashboard — edit, add, reorder, import/export |

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **React Router DOM v7** for routing
- **@dnd-kit** for drag-and-drop reordering
- **Zod** for schema validation on localStorage data
- **Vitest** + **Testing Library** for unit tests

## Architecture

```
src/
  constants/     # preset keywords, languages, routes, storage keys
  contexts/      # TranslationsContext — single source of truth
  hooks/         # useModal, useKeywordSearch
  lib/           # storage helpers, importExport, cn utility
  pages/
    dashboard/   # DashboardPage, KeywordRow, AddKeywordModal, ImportExportModal
    public/      # PublicPage, KeywordCard
  routes/        # createBrowserRouter config
  store/         # loadState / saveState with Zod validation
  tests/         # unit tests for storage, state, and search hook
  types/         # Keyword, Language, AppState
```

**Separation of concerns:**
- `lib/storage.ts` handles all localStorage read/write with safe JSON parsing
- `store/appState.ts` owns schema validation and the default preset fallback
- `contexts/TranslationsContext.tsx` owns application state and all mutation operations — no prop drilling
- Page components only render and delegate actions to the context

## Assumptions

- Active language selection is shared between both pages via the same context, so switching language on the public view also affects the dashboard and vice versa.
- A keyword's identifier (`key`) can be renamed after creation. The `id` field (UUID) is the stable internal reference.
- When a new keyword is added with a translation for only one language, the other languages intentionally have no entry in the `translations` map. The UI treats a missing or empty value as "no translation yet" uniformly.
- Corrupted or missing localStorage silently falls back to the preset keyword list without surfacing an error to the user.
- The preset list is only used as the initial seed. Once the user makes any change, their data in localStorage takes precedence on every subsequent load.

## Incomplete Features

The following optional features from the assignment were not implemented:

- **Animations** — language switching and row reordering have no transition animations beyond the default dnd-kit drag transform.
- **Keyboard-accessible reordering** — no explicit keyboard handler for reordering rows without a pointer device.

All core requirements are fully implemented.

## Optional Features Implemented

- **Search / filtering** — live keyword search on both pages, case-insensitive, ignores whitespace-only queries.
- **Delete keyword** — trash icon on each dashboard row.
- **Rename keyword** — pencil icon inline edit on each row; confirmed with Enter or blur.
- **Import / Export** — JSON download and upload (with drag-and-drop onto the drop zone) via the Import / Export modal. Import validates the file schema with Zod before applying.
- **RTL support** — translation inputs and public view text use the correct `dir` attribute for Persian (right-to-left).
- **Unit tests** — storage helpers, state loading/saving, and the search hook are covered.

