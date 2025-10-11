<<<<<<< HEAD
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
=======
#  Application d'Administration - Dashboard

Application web d'administration complète développée en **HTML, CSS et JavaScript natifs** sans framework.

##  Fonctionnalités

### Pages disponibles
-  **Dashboard** - Tableau de bord avec statistiques et graphiques
-  **Gestion des produits** - CRUD complet des produits
-  **Gestion des utilisateurs** - À implémenter
-  **Prédictions** - À implémenter
-  **Commandes** - À implémenter

### Caractéristiques principales
-  Design moderne et responsive
-  Compatible mobile, tablette et desktop
-  Accessible et sémantique
-  Performance optimisée
-  Code modulaire et maintenable
-  Commentaires exhaustifs en français

##  Structure du projet

```
project-root/
│
├── index.html                          # Page d'accueil
│
├── pages/
│   └── admin/
│       ├── dashboard.html              # Tableau de bord
│       ├── products.html               # Gestion des produits
│       ├── users.html                  # Gestion des utilisateurs (à créer)
│       ├── predictions.html            # Prédictions (à créer)
│       └── orders.html                 # Commandes (à créer)
│
├── assets/
│   ├── css/
│   │   ├── reset.css                   # Reset CSS
│   │   ├── variables.css               # Variables CSS
│   │   ├── layout.css                  # Structure de page
│   │   ├── sidebar.css                 # Barre latérale
│   │   ├── header.css                  # En-tête
│   │   ├── components.css              # Composants réutilisables
│   │   ├── dashboard.css               # Styles du dashboard
│   │   ├── products.css                # Styles des produits
│   │   └── responsive.css              # Media queries
│   │
│   ├── js/
│   │   ├── main.js                     # Script principal
│   │   ├── navigation.js               # Gestion de la navigation
│   │   ├── dashboard.js                # Logique du dashboard
│   │   └── products.js                 # Logique des produits
│   │
│   └── images/
│       ├── logo.png                    # Logo de l'application
│       └── product-placeholder.png     # Image placeholder
│
└── README.md                           # Ce fichier
```

##  Installation

### 1. Cloner ou télécharger le projet

```bash
git clone https://github.com/BalaAndegue/Shopecart-Web-Project.git
cd  Shopecart-web-project
```

### 2. Lancer un serveur local

#### Avec Python 3:
```bash
python -m http.server 8000
```

#### Avec PHP:
```bash
php -S localhost:8000
```

#### Avec Node.js (http-server):
```bash
npx http-server -p 8000
```

### 3. Accéder à l'application

Ouvrez votre navigateur et allez à : `http://localhost:8000`

##  Utilisation

### Navigation

- **Sidebar** : Menu de navigation principal (Dashboard, Products, Users, etc.)
- **Header** : Onglets ADMIN/SHOP et profil utilisateur
- **Mobile** : Bouton hamburger pour ouvrir/fermer la sidebar

### Dashboard

- Cartes statistiques avec tendances
- Actions rapides
- Graphiques de revenus (barres)
- Graphique de température (à implémenter avec Chart.js/D3.js)

### Gestion des produits

- **Tableau** : Liste complète des produits avec tri et filtrage
- **Recherche** : Barre de recherche en temps réel
- **Filtres** : Par catégorie, prix, stock, date
- **Actions** : Ajouter, modifier, supprimer des produits
- **Vue** : Toggle entre vue liste et vue grille
- **Sélection multiple** : Actions en masse sur les produits

## 🛠️ Personnalisation

### Variables CSS

Toutes les couleurs, espacements et dimensions sont définis dans `assets/css/variables.css` :

```css
:root {
    --color-primary: #5DADE2;
    --color-success: #7FD87F;
    --spacing-md: 1rem;
    /* ... */
}
```

### Configuration JavaScript

Configuration globale dans `assets/js/main.js` :

```javascript
const CONFIG = {
    apiBaseUrl: '/api',
    appName: 'Admin Dashboard',
    version: '1.0.0',
    debug: true
};
```

## 📊 Intégration de graphiques

### Option 1 : Chart.js (Recommandé)

```html
<!-- Ajouter dans le <head> -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

```javascript
// Dans dashboard.js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
            label: 'Revenus',
            data: [300, 350, 250, 320, 400],
            borderColor: '#5DADE2',
            tension: 0.4
        }]
    }
});
```

### Option 2 : D3.js

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

### Option 3 : Canvas API natif

Le code est déjà préparé dans `dashboard.js` avec la fonction `drawSimpleChart()`.

## 🔌 Connexion à une API

### Configuration

Modifier `apiBaseUrl` dans `main.js` :

```javascript
const CONFIG = {
    apiBaseUrl: 'https://votre-api.com/api',
};
```

### Exemple de requêtes

#### Charger les produits

```javascript
// Dans products.js
function loadProducts() {
    fetch(`${CONFIG.apiBaseUrl}/products`)
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => {
            console.error('Erreur:', error);
            App.showNotification('Erreur de chargement', 'danger');
        });
}
```

#### Ajouter un produit

```javascript
function addProduct(productData) {
    fetch(`${CONFIG.apiBaseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        App.showNotification('Produit ajouté avec succès', 'success');
        loadProducts();
    });
}
```

##  Personnalisation du thème

### Modifier les couleurs

Éditez `assets/css/variables.css` :

```css
:root {
    /* Couleur principale */
    --color-primary: #5DADE2;        /* Bleu par défaut */
    --color-primary: #8B5CF6;        /* Violet */
    --color-primary: #10B981;        /* Vert */
    
    /* Couleurs sémantiques */
    --color-success: #7FD87F;
    --color-danger: #FF6B6B;
    --color-warning: #FFB74D;
}
```

### Mode sombre (à implémenter)

```css
/* Dans variables.css */
@media (prefers-color-scheme: dark) {
    :root {
        --color-bg-white: #1a1a1a;
        --color-text-primary: #ffffff;
        --color-bg-light: #2a2a2a;
    }
}
```

## 📱 Responsive Design

Le projet est entièrement responsive avec 4 breakpoints :

- **Desktop** : > 1024px
- **Tablette** : 768px - 1024px
- **Mobile** : 480px - 768px
- **Petit mobile** : < 480px

### Tester la responsivité

1. Ouvrir les DevTools (F12)
2. Cliquer sur l'icône mobile/tablette
3. Tester différentes tailles d'écran

## 🧪 Tests

### Tests manuels

1. **Navigation**
   -  Ouvrir/fermer la sidebar sur mobile
   -  Cliquer sur tous les liens du menu
   -  Vérifier les onglets ADMIN/SHOP

2. **Produits**
   -  Ouvrir le modal d'ajout
   -  Remplir et soumettre le formulaire
   -  Rechercher un produit
   -  Sélectionner plusieurs produits
   -  Tester les filtres

3. **Dashboard**
   -  Vérifier l'affichage des statistiques
   -  Cliquer sur les actions rapides
   -  Changer les filtres de graphiques

##  Débogage

### Mode debug

Activé par défaut dans `main.js` :

```javascript
const CONFIG = {
    debug: true  // Affiche les logs dans la console
};
```

### Console du navigateur

Ouvrir avec F12 et regarder :
- **Console** : Messages de log et erreurs
- **Network** : Requêtes réseau
- **Elements** : Structure HTML/CSS

## 📝 Ajouter une nouvelle page

### 1. Créer le fichier HTML

```html
<!-- pages/admin/nouvelle-page.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Page - Administration</title>
    
    <!-- Fichiers CSS -->
    <link rel="stylesheet" href="../../assets/css/reset.css">
    <link rel="stylesheet" href="../../assets/css/variables.css">
    <link rel="stylesheet" href="../../assets/css/layout.css">
    <link rel="stylesheet" href="../../assets/css/sidebar.css">
    <link rel="stylesheet" href="../../assets/css/header.css">
    <link rel="stylesheet" href="../../assets/css/components.css">
    <link rel="stylesheet" href="../../assets/css/responsive.css">
</head>
<body>
    <!-- Copier la structure de dashboard.html ou products.html -->
</body>
</html>
```

### 2. Ajouter au menu

Dans la sidebar de toutes les pages :

```html
<li class="menu-item">
    <a href="nouvelle-page.html" class="menu-link">
        <span class="menu-icon">🆕</span>
        <span>Nouvelle Page</span>
    </a>
</li>
```

### 3. Créer le fichier CSS (optionnel)

```css
/* assets/css/nouvelle-page.css */
.nouvelle-page-container {
    /* Vos styles spécifiques */
}
```

### 4. Créer le fichier JS (optionnel)

```javascript
/* assets/js/nouvelle-page.js */
(function() {
    'use strict';
    
    function initNouvellePage() {
        console.log('Nouvelle page initialisée');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNouvellePage);
    } else {
        initNouvellePage();
    }
})();
```

## 🔒 Sécurité

### Bonnes pratiques implémentées

-  Échappement des entrées utilisateur
-  Validation côté client
-  Protection CSRF (à implémenter côté serveur)
-  Tokens d'authentification dans localStorage

### À implémenter côté serveur

- Validation des données
- Protection contre les injections SQL
- Rate limiting
- HTTPS obligatoire
- Tokens JWT avec expiration

##  Déploiement

### Serveur Apache

1. Copier tous les fichiers dans `/var/www/html/`
2. Configurer `.htaccess` si nécessaire

### Serveur Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /var/www/admin;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Netlify / Vercel

1. Connecter le dépôt Git
2. Configurer le dossier de build : `./`
3. Déployer

##  Ressources

### Documentation CSS
- [MDN CSS Reference](https://developer.mozilla.org/fr/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com)

### Documentation JavaScript
- [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info)

### Bibliothèques de graphiques
- [Chart.js](https://www.chartjs.org)
- [D3.js](https://d3js.org)
- [ApexCharts](https://apexcharts.com)

### Icônes
- [Font Awesome](https://fontawesome.com)
- [Material Icons](https://fonts.google.com/icons)
- [Heroicons](https://heroicons.com)

##  Contribution

### Ajouter une fonctionnalité

1. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
2. Coder et commenter en français
3. Tester sur tous les breakpoints
4. Commit : `git commit -m "Ajout: ma fonctionnalité"`
5. Push : `git push origin feature/ma-fonctionnalite`

### Standards de code

- **HTML** : Sémantique, accessible, indenté avec 4 espaces
- **CSS** : BEM ou classes utilitaires, commentaires pour chaque section
- **JavaScript** : ES6+, commentaires JSDoc, fonctions pures

#
## Auteur

Bala Andegue FRancois Lionnel.

##  Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier la console du navigateur pour les erreurs

---

**Version** : 1.0.0  
**Dernière mise à jour** : Octobre 2025  
**Technologies** : HTML5, CSS3,
>>>>>>> origin/feature/1-e1-adminstatic-BALA
