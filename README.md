# Baugus Gallery

Portfolio site for Bryant Baugus, an urban designer working across landscape
architecture, architecture, and urban design projects in Mississippi.

Live: https://bryantbaugus.github.io/Baugus-Gallery/

## Stack

Plain HTML/CSS/JS, no build step. Three.js, pdf.js, d3, and topojson-client are
loaded from CDN (via an import map for the ES module packages). Everything else
is native browser JS (ES modules) — open `index.html` through any static file
server to run it locally, e.g.:

```
python -m http.server 8000
```

## Structure

- `index.html`, `css/style.css` — page shell and design tokens
- `js/data.js` — project data (the `PROJECTS` array)
- `js/main.js` — view state, filtering, project detail, gallery crossfade overlay, CV overlay wiring
- `js/globe.js` — the 3D US map (three.js), lazy-loaded only when the Map tab is opened
- `js/cv-viewer.js` — renders the CV PDF page-by-page via pdf.js, lazy-loaded on first open
- `assets/` — optimized project imagery and the CV PDF
