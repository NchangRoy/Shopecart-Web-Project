# Shopecart Web Project

## Présentation du Projet
Ce dépôt contient le projet de programmation web pour l'année 2025, réalisé en groupe de 12 étudiants (équipes E1 à E4 avec rotation des rôles :
frontend, backend, intégration, tests). L'objectif est de développer un site e-commerce "Shopecart" (vitrine d'électronique et accessoires) à travers 4 TPs progressifs :

- **TP1** : Site statique from scratch (HTML/CSS).
- **TP2** : Interactions dynamiques avec JavaScript (panier, formulaires).
- **TP3** : E-commerce avec CMS (ex. WordPress + WooCommerce).
- **TP4** : Développement complet avec Laravel (backend full-stack).

Le projet respecte une charte graphique cohérente (bleu dominant, navigation simple, responsive) .
Chaque TP est évalué sur l'organisation Git (20%), la contribution individuelle (30%), la qualité technique (30%) et la présentation finale (20%).

## Installation et Usage
### Prérequis
- Navigateur web moderne (Chrome, Firefox).
- Pour TP3 : Serveur local (ex. XAMPP pour PHP/MySQL) et CMS installé (WordPress).
- Pour TP4 : PHP 8+, Composer, Laravel, MySQL.
- Git pour cloner le dépôt.

### Étapes d'Installation
1. Clonez le dépôt : `git clone https://github.com/Delmat237/shopecart-web-project.git`.
2. Naviguez dans le dossier : `cd shopecart-web-project`.
3. Changez de branche selon le TP (voir nomenclature des branches ci-dessous) : `git checkout tp1-static`.
4. Pour les TPs backend :
   - TP3 : Installez WordPress localement, importez le thème depuis `/tp3/theme/`, et configurez WooCommerce.
   - TP4 : Exécutez `composer install`, configurez `.env` (base de données), puis `php artisan migrate` et `php artisan serve`.

### Usage
- Ouvrez les fichiers HTML directement pour TP1/TP2.
- Pour TP3/TP4, lancez le serveur local et accédez via `localhost`.
- Testez les fonctionnalités : navigation, ajout au panier, validation commande, etc.

## Structure du Dépôt
- `/assets/` : CSS, images, JS communs.
- `/tp1/` : Site statique (HTML/CSS).
- `/tp2/` : Ajouts JS (panier dynamique).
- `/tp3/` : Thème CMS et extensions.
- `/tp4/` : Application Laravel complète.
- `/docs/` : Designs Figma (captures), répartition des tâches, et documents du cours.

## Contributions
Chaque étudiant doit committer sur des branches dédiées avec des messages clairs (ex. "feat: ajout formulaire contact - Équipe 3"). 
Utilisez les issues GitHub pour tracker les tâches. Rotation des rôles visible via commits.

## Technologies Utilisées
- Frontend : HTML5, CSS3, JavaScript (vanilla).
- CMS : WordPress/Joomla/Drupal + WooCommerce.
- Backend : Laravel (PHP), MySQL.
- Outils : Git, Figma pour designs.

## Difficultés et Solutions (Retour d'Expérience)
- À remplir après chaque TP : ex. "Intégration JS dans TP2 : Résolu via localStorage pour persistance panier."

Pour plus de détails sur chaque TP, consultez les READMEs dédiés dans les dossiers correspondants.

## Licence
MIT - Projet éducatif.
