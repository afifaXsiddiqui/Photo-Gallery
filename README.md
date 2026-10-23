# Curated Frames

A responsive photography gallery built with React, Vite and Tailwind CSS. It fetches 30 photographs from the [Picsum Photos API](https://picsum.photos/), lets you search by author, and lets you save favourites that persist across page refreshes.

## Features

- Fetches 30 photographs on load, with skeleton placeholders while loading
- Clear error message if the request fails, with a Try again button that re-fetches
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card shows the photograph, the author name and a heart button
- Live search by author name over the already-fetched photographs (no extra API calls), with a clear button and a result count
- Favourites managed with `useReducer` and saved to `localStorage`; switch between **All photos** and **Favourites**
- Empty states for no search matches and no favourites, and a fallback for images that fail to load
- Accessible: labelled controls, `aria-pressed` on hearts, visible keyboard focus, screen-reader loading and result messages

## About the photos and author names

- All images come from [Picsum Photos](https://picsum.photos/); the app fetches exactly `https://picsum.photos/v2/list?limit=30` and does not change the response.
- **Author names are demo labels.** Each photo id is mapped to one of 15 sample names (`src/utils/gallery.js`), so a photo always shows the same name. They are not the real photographers' names and are not photo credits. Search filters these displayed names.
- Picsum's list puts photos from the same shoot next to each other (the first ten are all laptops and desks), so the gallery shows them in a spread-out order. All 30 photos are still shown.

## Tech stack

- React 19 (functional components and hooks only)
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Fraunces and Instrument Sans fonts, self-hosted through `@fontsource-variable`
- No component libraries

## Project structure

```
src/
├── hooks/useFetchPhotos.js          # fetches photos; returns { photos, loading, error, retry }
├── reducers/favouritesReducer.js    # favourites reducer + localStorage loader
├── utils/gallery.js                 # demo author names and spread-out photo order
├── components/
│   ├── Gallery.jsx                  # uses the hook, reducer, useCallback and useMemo
│   ├── Header.jsx                   # wordmark and favourites shortcut
│   ├── Intro.jsx                    # editorial heading and photo count
│   ├── SearchBar.jsx                # search input with clear button
│   ├── ViewToggle.jsx               # All photos / Favourites switch
│   ├── PhotoGrid.jsx                # responsive 1 / 2 / 4 column grid
│   ├── PhotoCard.jsx                # one photograph with its heart button
│   ├── GallerySkeleton.jsx          # loading placeholders
│   ├── StatusMessage.jsx            # error and empty states
│   └── Icons.jsx                    # line icon set
├── App.jsx
├── index.css                        # Tailwind import and design tokens
└── main.jsx
```

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run oxlint
```
