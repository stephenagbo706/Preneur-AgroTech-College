# Preneur AgroTech College Website

## Structure
- `index.html`
- `pages/` for inner pages
- `css/` for styles
- `js/` for scripts
- `assets/` for images/icons/videos
- `components/` for shared header, footer, and mobile menu

## How It Works
- `js/navigation.js` loads `components/header.html`, `components/menu.html`, and `components/footer.html` into each page.
- Links use `data-link` to stay consistent across `index.html` and pages.
- `js/focus.js` renders the Insights stories and supports `?story=0` style URLs.

## Run Locally
Component loading uses `fetch`, so use a simple local server instead of opening files directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in your browser.

## Customization
Search for `TODO:` comments in HTML/CSS/JS to find:
- Where to add your logo and images
- Where to update dates and program details
- Where to insert contact info and social links

Place your images in `assets/images/` and update the references noted by comments.
