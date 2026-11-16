# TemplateForge — Modular Project

This project reorganizes the supplied TemplateForge source into smaller files.
The existing gallery, template preview/download generation, GitHub template
library, motion effects, prompt generator, and injected neon styling are kept.

## Run

1. Extract the ZIP.
2. Open the `TemplateForge_Modular` folder in VS Code.
3. Start a local web server from this folder, for example:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in your browser.

A local server is recommended because the GitHub template library uses fetch/API
requests that may not work when opening `index.html` directly with `file://`.

## File layout

- `index.html` — page shell and script/style loading order
- `css/style.css` — main site and gallery styling
- `css/generator.css` — AI prompt generator styling
- `css/responsive.css` — utility and responsive styling
- `js/app.js` — shared helpers and gallery rendering
- `js/downloads.js` — generated template HTML and ZIP downloads
- `js/template-pages.js` — page content and template preview helpers
- `js/github-templates.js` — Learning Zone GitHub template library
- `js/motion.js` — reveal, tilt, and parallax effects
- `js/ai-generator.js` — prompt generator and local fallback
- `js/neon-effects.js` — neon hero styling
- `js/main.js` — starts the gallery after all scripts load

## AI API key security

The uploaded source contained a hard-coded OpenRouter API key, including a copy
in `api.txt`. Those credentials have deliberately **not** been copied into this
project. Treat the exposed key as compromised and revoke/rotate it in your
OpenRouter account. The prompt generator's local fallback remains available.
For live AI generation, send requests through a backend server and keep the
replacement API key in a server-side environment variable; do not put it in
browser JavaScript or a text file shipped to visitors.
