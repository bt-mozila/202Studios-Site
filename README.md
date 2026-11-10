# 202Studios – React app

The original static site (index / shop / hosting-packages / portfolio-details) rebuilt as a React single-page app with **Vite + React Router**.
The look is unchanged: the original `style.css`, Bootstrap, icon fonts, Google Fonts (Open Sans / Raleway / Poppins), AOS animations and the page/section order are all reused.

## Run it

Requires Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

## IMPORTANT – add your images first

The zip I received had no `assets/img` folder. Copy your original `assets/img/...` into **`public/assets/img/`** (same sub-folders: `Branding`, `Hero Section`, `About Us Section`, `We Repair Section`, `portfolio`, `cta-bg.jpg`, …). Until then images show as broken.

## Routes (old page → new route)

| Old file                 | Route                  |
|--------------------------|------------------------|
| index.html               | `/`  (sections: `/#aboutUs`, `/#services`, `/#portfolio`, `/#contact`) |
| shop.html                | `/shop`                |
| hosting-packages.html    | `/hosting-packages`    |
| portfolio-details.html   | `/portfolio/:slug` (e.g. `/portfolio/smocho-small-business-management-system`) |

## Where to change things

| What                                   | File |
|----------------------------------------|------|
| Home-page text, services, FAQ, portfolio items, CTA | `src/data/site-content.yaml` (same file as before) |
| Hosting packages                       | `src/data/hosting-packages-content.yaml` |
| Store products                         | `src/data/products.js` |
| Terms / Privacy text                   | `src/components/LegalContent.jsx` |
| Header / nav links                     | `src/components/Header.jsx` |
| Footer                                 | `src/components/Footer.jsx` |
| Contact form (services & packages)     | `src/components/home/ContactForm.jsx` |
| Hero background images                 | `src/components/home/Hero.jsx` |
| Styles                                 | `public/assets/css/style.css` (original) + `src/react-overrides.css` (small additions) |

## Structure

```
src/
  App.jsx                 layout, routes, scroll handling
  content.js              loads the YAML files
  pages/                  Home, Shop, Hosting, PortfolioDetails
  components/             Header, Footer, Modal, ImageSlider, ...
  components/home/        Hero, About, Services, Repairs, Portfolio, Faq, Cta, ContactForm
  data/                   YAML content + products.js
public/assets/            original css + vendor libs (+ img/ – add yours here)
```

## Notes

* The contact form still only shows the "Thanks!" message (as the old site did). Hook it to your backend/email service in `ContactForm.jsx` (`onSubmit`).
* Deploying to a sub-folder? Set `base` in `vite.config.js`. Deploying to a normal host? Configure it to serve `index.html` for unknown paths (SPA fallback) so `/shop` etc. work on refresh.
