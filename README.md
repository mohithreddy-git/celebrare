# Celebrare Pre-Screening: Editorial Photo Gallery

A high-finish, strictly compliant Photo Gallery web application built with React, Vite, and Tailwind CSS v4. Developed for the Celebrare React Engineering Internship pre-screening assignment.

---

## Technical Overview & Design Philosophy

The application provides a quiet, refined editorial gallery experience. Photographs are fetched from the Lorem Picsum public API, displayed in a responsive 4/2/1-column grid, filtered by author in real time without extraneous network requests, and marked as favorites using a pure `useReducer` implementation persisted to `localStorage`.

### Strict Brief Compliance
- **Zero Component / UI Libraries**: Completely authored by hand with utility CSS. No MUI, Tailwind UI, shadcn/ui, Radix, Lucide, FontAwesome, or external icon packs. The heart icon is an accessible inline SVG component.
- **Functional Components & Hooks Only**: Zero class components.
- **`useReducer` for Favorites**: Favorites state is managed exclusively via `useReducer` with lazy initialization and defensive `localStorage` validation. `useState` is never used for the favorites list.
- **Custom Hook Architecture**: `useFetchPhotos` encapsulates all network interaction, lifecycle cleanup with `AbortController`, and error states. `Gallery` never calls `fetch` directly.
- **Strict Performance Optimization**: `useCallback`, `useMemo`, and `React.memo` are applied with honest architectural rationale.

---

## 7 Requirements ↔ File Traceability Matrix

| Requirement | Description | Primary Implementation File(s) | Key Mechanisms |
| :--- | :--- | :--- | :--- |
| **R1: Project Setup** | React + Vite + Tailwind CSS v4 | [`package.json`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/package.json)<br>[`vite.config.js`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/vite.config.js)<br>[`eslint.config.js`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/eslint.config.js) | `@tailwindcss/vite`, ESLint flat config with React Hooks rules. |
| **R2: Fetch Photos** | Fetch 30 photos with loading spinner & error handling | [`src/hooks/useFetchPhotos.js`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/hooks/useFetchPhotos.js)<br>[`src/components/Spinner.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/Spinner.jsx)<br>[`src/components/ErrorMessage.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/ErrorMessage.jsx) | `AbortController` unmount cleanup, `res.ok` status validation, human-readable error messaging. |
| **R3: Responsive Grid** | 4-col desktop, 2-col tablet, 1-col mobile with 4:3 cards | [`src/components/PhotoGrid.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/PhotoGrid.jsx)<br>[`src/components/PhotoCard.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/PhotoCard.jsx) | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, `aspect-[4/3]`, sized 800×600 images, WCAG AA contrast backdrop. |
| **R4: Search Filter** | Real-time author search with empty state | [`src/components/SearchBar.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/SearchBar.jsx)<br>[`src/components/Gallery.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/Gallery.jsx) | In-memory `useMemo` filter on `[photos, query]`. Zero API calls or reloads on typing. "No photos found" feedback. |
| **R5: Favourites with useReducer** | Pure reducer, lazy initializer, `localStorage` persistence | [`src/reducers/favouritesReducer.js`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/reducers/favouritesReducer.js)<br>[`src/components/Gallery.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/Gallery.jsx) | `TOGGLE_FAVOURITE` action, `loadFavourites` lazy initializer with try/catch and array validation, `useEffect` persistence. |
| **R6: Custom Hook** | `useFetchPhotos` returning `{ photos, loading, error }` | [`src/hooks/useFetchPhotos.js`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/hooks/useFetchPhotos.js) | Returns exact object contract. Resilient to React 18/19 StrictMode double-invocations. Loading initialized to true. |
| **R7: useCallback + useMemo** | Memoized handlers & filtered list | [`src/components/Gallery.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/Gallery.jsx)<br>[`src/components/PhotoCard.jsx`](file:///Users/buthukurimohithreddy/ecsproject/celebrare/src/components/PhotoCard.jsx) | `useCallback` on toggle handler + `React.memo(PhotoCard)` prevents unneeded re-renders of 29 cards. `useMemo` protects filter calculation. |

---

## Getting Started

### Prerequisites
- Node.js >= 18 (Tested on Node v20/v22/v26)
- npm >= 9

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Launches the Vite development server at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Compiles and bundles production-ready assets into the `dist/` directory.

### Code Quality & Linting
```bash
npm run lint
```
Executes ESLint across all JavaScript and JSX source files with zero errors.

---

## Directory Structure
```
photo-gallery/
├─ index.html
├─ package.json
├─ vite.config.js
├─ eslint.config.js
├─ .gitignore
├─ README.md
├─ docs/
│  └─ CODE_ANALYSIS.pdf
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ constants.js
   ├─ components/
   │  ├─ Header.jsx
   │  ├─ SearchBar.jsx
   │  ├─ Gallery.jsx
   │  ├─ PhotoGrid.jsx
   │  ├─ PhotoCard.jsx
   │  ├─ HeartIcon.jsx
   │  ├─ Spinner.jsx
   │  └─ ErrorMessage.jsx
   ├─ hooks/
   │  └─ useFetchPhotos.js
   └─ reducers/
      └─ favouritesReducer.js
```
