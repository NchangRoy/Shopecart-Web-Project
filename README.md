
# TP2 - Ajout de JavaScript Vanilla : Dynamisme & Interactivité

## Objectif

Améliorer le site e-commerce statique du **TP1** en y intégrant du **JavaScript natif (vanilla)** pour ajouter des fonctionnalités dynamiques et interactives :
- Carrousel infini (slider)
- Pagination des produits
- Filtrage par catégorie/prix
- Panier dynamique avec `localStorage`
- Recherche en temps réel
- Navigation fluide (scroll, menu mobile)
- Validation de formulaires (login/register)

**Contrainte** : Aucun framework JS (React, Vue, etc.) ni bibliothèque externe (jQuery). Tout en **vanilla JS**, **HTML5**, **CSS3**.

---

## Livrable

Site **interactif**, testable localement, avec :
- Toutes les pages du TP1 enrichies de JS.
- Persistance du panier entre sessions (`localStorage`).
- Navigation fluide et responsive.
- Code modulaire dans `/assets/js/`.

---

## Contributions par Équipe


- Équipe 1 (A, B, C) : Page landing (`index.html`) avec structure (Header, Footer, Navigation) et contenu de la section d'accueil.
- Équipe 2 (D, E, F) : Pages liste produits (`products.html`) et détails produit (`product-detail.html`) avec grille produits et fiche individuelle (photo, description, prix).
- Équipe 3 (G, H, I) : Pages login (`login.html`) et register (`register.html`) avec formulaires HTML et stylisation CSS.
- Équipe 4 (J, K, L) : Pages about us (`about.html`) et contact (`contact.html`) avec structure, contenu textuel et formulaire.
- Équipe 5 (A) : Intégration finale et setup Git, assurant la cohésion graphique et l'assemblage de toutes les pages avec placeholders pour panier, commande/paiement.
---

## Installation & Lancement

1. Ouvrez `index.html` dans un navigateur moderne (Chrome, Firefox, Edge).
2. Assurez-vous que tous les fichiers JS sont chargés depuis `/assets/js/`.
3. Testez :
   - Le carrousel sur la page d'accueil.
   - La pagination sur `products.html`.
   - Le panier en ajoutant/supprimant des produits.
   - La recherche en direct.

> **Note** : Aucun serveur requis. Tout fonctionne en local.

---

## Structure du Dépôt (Focus TP2)

```
/Shopecart-Web-Project/
├── index.html
├── login.html
├── register.html
├── about.html
├── contact.html
├── panier.html
├── pages/
│   ├── products.html
│    ├── product-detail.html 
│   └──
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── style-*.css
│   ├── images/
│   │   ├── shopcart-logo.png
│   │   ├── hero-bg.png
│   │   ├── product*.jpg
│   │   └── icons/
│   └── js/
│       ├── carousel_infinite.js
│       ├── navigation_tel.js
│       ├── product_pagination.js
│       ├── product_pagination_cam.js
│       ├── product_filters.js
│       ├── product_filters_cam.js
│       ├── search_live.js
│       ├── panier.js
│       ├── newsletter.js
│       └── utils.js
├── tp1/              ← Code statique (base)
├── tp2/              ← Code enrichi JS (actuel)
├── tp3/              ← CMS (WordPress/WooCommerce)
├── tp4/              ← Laravel + API
├── docs/
│   ├── figma/
│   ├── repartition-tp2.pdf
│   └── captures/
├── README.md
└── .gitignore
```

---

## Fonctionnalités Implémentées (TP2)

| Fonctionnalité | Fichier JS | Description |
|----------------|-----------|-----------|
| **Carrousel infini** | `carousel_infinite.js` | Défilement automatique + navigation manuelle |
| **Menu mobile** | `navigation_tel.js` | Toggle menu hamburger sur mobile |
| **Pagination** | `product_pagination*.js` | 9 produits/page, boutons Préc/Suiv |
| **Filtrage** | `product_filters*.js` | Par catégorie, prix, disponibilité |
| **Recherche live** | `search_live.js` | Filtre les produits au fur et à mesure |
| **Panier dynamique** | `panier.js` | Ajout/suppression, mise à jour quantité, `localStorage` |
| **Newsletter** | `newsletter.js` | Validation email + message succès |
| **Scroll fluide** | `utils.js` | `scrollTo()` sur les liens d’ancrage |

---

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, Animations, Media Queries
- **JavaScript (ES6+)** : DOM manipulation, `localStorage`, `fetch` (mock), événements
- **Outils** : VS Code, Git, GitHub, Figma (design)

---

## Difficultés & Solutions (Retour d'Expérience)

| Problème | Solution |
|--------|---------|
| **Conflits DOM entre JS** | Modularisation via IIFE + `data-js` attributes |
| **Panier perdu au rechargement** | Utilisation de `localStorage` + `JSON.parse/stringify` |
| **Carrousel saccadé** | `requestAnimationFrame` + CSS `transform` |
| **Pagination sur mobile** | Boutons fixes en bas + `scrollIntoView` |
| **Recherche lente** | Débounce (`setTimeout`) sur `input` |

---

## Prochaines Étapes (TP3 & TP4)

- **TP3** : Migration vers **WordPress + WooCommerce** (thème custom, extensions).
- **TP4** : **Laravel 11** + API REST, authentification, dashboard admin.

---

## Contribution Git

```bash
git checkout -b feat/carousel-equipe1
git add assets/js/carousel_infinite.js
git commit -m "feat: carrousel infini avec auto-play - Équipe 1"
git push origin feat/carousel-equipe1
```
→ Créez une **Pull Request** vers `tp/2-js-dynamic`.

---

## Fichiers Clés
- `index.html` → Carrousel + Hero + Recherche
- `products.html` → Grille + Pagination + Filtres
- `panier.html` → Panier dynamique
- `/assets/js/panier.js` → Logique panier + `localStorage`
- `/assets/js/carousel_infinite.js` → Carrousel fluide

---

## Licence
**MIT** - Projet éducatif. Libre réutilisation dans un cadre pédagogique.

---

## Équipe & Contact
- **Professeur** : Mme .....
- **GitHub** : `github.com/Delmat237/Shopecart-Web-Project.git `
- **Issues** : Suivi des bugs et tâches
- **Discussions** : Coordination d’équipe

---

**Fin du TP2 — Prochain TP : CMS & WooCommerce**
