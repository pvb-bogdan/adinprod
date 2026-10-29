# adinprod.ro

Site de prezentare pentru SC ADIN PROD INTERNATIONAL SRL, refăcut cu Nuxt 4, Tailwind CSS și `@nuxtjs/i18n`. Se generează static și se urcă în `public_html` pe cPanel.

## Rulare locală

Necesită Node.js 20 sau mai nou.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Generare pentru cPanel

```bash
npm run generate   # rezultatul este în .output/public
```

Conținutul folderului `.output/public` se urcă în `public_html`.

## Unde se modifică textele

| Ce | Fișier |
| --- | --- |
| Date firmă (adresă, emailuri, telefoane, WhatsApp, Facebook) | `data/company.ts` |
| Produse, specificații, imagini de produs | `data/products.ts` |
| Imaginile din slider | `data/hero.ts` |
| Meniu, titluri, butoane, texte de pagină, SEO | `i18n/locales/ro.json` (și `en.json`) |
| Culori | `app/assets/css/main.css` (`@theme`) |

Imaginile sunt în `public/images/`. Unde informația lipsește apare `[PLACEHOLDER]`.
