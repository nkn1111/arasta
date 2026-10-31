# Arasta Fortkochi

Brand & lead-capture website for **Arasta Fortkochi**, a specialty coffee house
in Fort Kochi, Kerala. Plain HTML/CSS/JS — no build step — deployed free on
GitHub Pages at [arasta.coffee](https://arasta.coffee).

## Structure

```
index.html          Single-page site (hero, languages marquee, experience grid, menu, numbers, story, gallery, visit, signup, footer)
css/style.css        All styling, theme colours as CSS custom properties in :root
js/main.js           Scroll progress, word reveal, count-up numbers, menu tabs, mobile nav, signup form (Formspree)
images/             Local photos (CC0 / Unsplash licence); credits in images/README.md
CNAME                Custom domain config for GitHub Pages (arasta.coffee)
```

## Run locally

Just open `index.html` in a browser, or serve it so relative paths behave
exactly like production:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before going live

1. **Lead capture**: sign up free at [formspree.io](https://formspree.io),
   create a form, and replace `YOUR_FORMSPREE_ID` in the signup form's
   `action` attribute in `index.html` with your real form ID.
2. **Photos**: most photos are free stock (CC0 / Unsplash). Swap in real
   Arasta photography when you have it; see `images/README.md`.
3. **Menu**: confirm the items in the menu section match what Arasta serves.

## Deploy (GitHub Pages)

1. Push to `main` on this repo's `origin`.
2. In GitHub → Settings → Pages, set the source to the `main` branch, root
   folder.
3. The committed `CNAME` file wires up the custom domain automatically. At
   your domain registrar for `arasta.coffee`, add:
   - `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `nkn1111.github.io`
4. Once DNS propagates, enable "Enforce HTTPS" in the Pages settings.

## Extending the site later

- Colours live in one place — the `:root` custom properties at the top of
  `css/style.css` — so retheming is a single-file change.
- Sections use consistent `.card` / `.btn` / `.section` classes, so a section
  (e.g. Menu) can be lifted into its own page later without restyling.
- If the site grows into a blog or many templated pages, consider GitHub
  Pages' built-in Jekyll support rather than hand-rolling more static HTML.
