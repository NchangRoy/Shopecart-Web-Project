# TP1 - Site Web Statique from Scratch (HTML & CSS)

## Objectif
Construire un site vitrine e-commerce statique avec pages : accueil (landing), liste produits, détails produit, panier (statique), commande/paiement (formulaires), login/register, contact, about us. Respecter l'organisation en dossiers (/assets/css, /assets/images, etc.) et une charte graphique cohérente (mise en page, navigation, footer), selon la fiche TP jointe.

**Note** : Le tableau de bord (dashboard) n'est pas requis pour TP1, car il est hors du scope de ce TP statique. Il sera abordé dans les TPs ultérieurs, notamment TP4 avec Laravel.

## Livrable
Site statique fonctionnel, testable localement.

## Contributions par Équipe
- Équipe 1 (A, B, C) : Page landing (`index.html`) avec structure (Header, Footer, Navigation) et contenu de la section d'accueil.
- Équipe 2 (D, E, F) : Pages liste produits (`products.html`) et détails produit (`product-detail.html`) avec grille produits et fiche individuelle (photo, description, prix).
- Équipe 3 (G, H, I) : Pages login (`login.html`) et register (`register.html`) avec formulaires HTML et stylisation CSS.
- Équipe 4 (J, K, L) : Pages about us (`about.html`) et contact (`contact.html`) avec structure, contenu textuel et formulaire.
- Équipe 5 (M) : Intégration finale et setup Git, assurant la cohésion graphique et l'assemblage de toutes les pages avec placeholders pour panier, commande/paiement.

## Installation Spécifique
Ouvrez `index.html` dans un navigateur moderne (Chrome, Firefox).

## Fichiers Clés
- `index.html` : Page d'accueil.
- `/assets/css/main.css` : Styles globaux.
- `/assets/images/` : Répertoire des images produits.
- `/assets/css/style-login.css`, `/assets/css/style-contact.css` : Styles spécifiques.

## Arborescence Proposée
```
shopecart-web-project/
├── index.html
├── products.html
├── product-detail.html
├── login.html
├── register.html
├── about.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── style-login.css
│   │   ├── style-contact.css
│   │   └── style-product.css
│   └── images/
│       ├── product1.jpg
│       ├── product2.jpg
│       └── ...
├── README.md
└── .gitignore
```

Voir la répartition des tâches pour plus de détails.
