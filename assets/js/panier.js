/**
 * PANIER.JS - Gestion du Panier d'Achat
 * =====================================
 * Ce fichier gère toute la logique du panier :
 * - Chargement des données depuis JSON
 * - Affichage dynamique des produits
 * - Calcul des totaux
 * - Modification de quantités
 * - Suppression d'articles
 * - Sauvegarde dans localStorage
 */

// ========================================
// VARIABLES GLOBALES
// ========================================

let cartData = null; // Stocke les données du panier
const CART_STORAGE_KEY = 'shopcart_cart'; // Clé pour localStorage

// ========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================

/**
 * Fonction principale qui se lance quand la page est chargée
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Initialisation du panier...');
    
    // Charger les données du panier
    loadCartData();
    
    // Écouter le clic sur le bouton de paiement
    document.getElementById('checkout-button').addEventListener('click', handleCheckout);
});

// ========================================
// CHARGEMENT DES DONNÉES
// ========================================

/**
 * Charge les données du panier depuis localStorage ou JSON
 */
async function loadCartData() {
    try {
        // Essayer de charger depuis localStorage d'abord
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        
        if (savedCart) {
            // Si des données existent dans localStorage, les utiliser
            console.log('📦 Chargement depuis localStorage');
            cartData = JSON.parse(savedCart);
            displayCart();
        } else {
            // Sinon, charger depuis le fichier JSON
            console.log('📄 Chargement depuis cart-data.json');
            const response = await fetch('/assets/data/cart-data.json');
            
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier JSON');
            }
            
            cartData = await response.json();
            
            // Sauvegarder dans localStorage
            saveCartToStorage();
            
            // Afficher le panier
            displayCart();
        }
    } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
        showError('Impossible de charger le panier. Veuillez réactualiser la page.');
    }
}

/**
 * Sauvegarde les données du panier dans localStorage
 */
function saveCartToStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
        console.log('💾 Panier sauvegardé dans localStorage');
    } catch (error) {
        console.error('❌ Erreur de sauvegarde:', error);
    }
}

// ========================================
// AFFICHAGE DU PANIER
// ========================================

/**
 * Affiche tous les articles du panier
 */
function displayCart() {
    // Cacher l'indicateur de chargement
    document.getElementById('loading-indicator').style.display = 'none';
    
    // Récupérer le conteneur des articles
    const cartItemsContainer = document.getElementById('cart-items-container');
    
    // Vérifier si le panier est vide
    if (!cartData.cart_items || cartData.cart_items.length === 0) {
        showEmptyCart();
        return;
    }
    
    // Afficher le contenu du panier
    document.getElementById('cart-content-wrapper').style.display = 'flex';
    document.getElementById('empty-cart-message').style.display = 'none';
    
    // Vider le conteneur
    cartItemsContainer.innerHTML = '';
    
    // Créer une carte pour chaque article
    cartData.cart_items.forEach((item, index) => {
        const cartItemElement = createCartItemElement(item, index);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Mettre à jour les totaux
    updateSummary();
    
    // Mettre à jour le badge du panier dans le header
    updateCartBadge();
    
    console.log('✅ Panier affiché avec succès');
}

/**
 * Crée l'élément HTML pour un article du panier
 * @param {Object} item - L'article du panier
 * @param {number} index - L'index de l'article dans le tableau
 * @returns {HTMLElement} - L'élément div de la carte produit
 */
function createCartItemElement(item, index) {
    // Créer l'élément principal
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.index = index; // Stocker l'index pour la manipulation
    
    // Créer les étoiles de notation
    const stars = generateStars(item.note);
    
    // Construire le HTML de la carte
    cartItem.innerHTML = `
        <!-- Image du produit -->
        <img src="${item.image}" alt="${item.nom}" class="item-image" onerror="this.src='/assets/images/placeholder.png'">
        
        <!-- Détails du produit -->
        <div class="item-details">
            <h3 class="item-name">${item.nom}</h3>
            <p class="item-brand">${item.marque}</p>
            <p class="item-color">
                <i class="fas fa-palette"></i>
                Couleur: ${item.couleur}
            </p>
            <div class="item-rating">
                <span class="stars">${stars}</span>
                <span class="rating-value">${item.note}/5</span>
            </div>
        </div>
        
        <!-- Actions (prix, quantité, suppression) -->
        <div class="item-actions">
            <p class="item-price">${item.prix.toFixed(2)} XAF</p>
            
            <!-- Contrôles de quantité -->
            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" onclick="changeQuantity(${index}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantite}</span>
                <button class="quantity-btn increase-btn" onclick="changeQuantity(${index}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <!-- Bouton supprimer -->
            <button class="remove-btn" onclick="removeItem(${index})">
                <i class="fas fa-trash-alt"></i>
                Supprimer
            </button>
        </div>
    `;
    
    return cartItem;
}

/**
 * Génère les étoiles de notation en HTML
 * @param {number} rating - Note sur 5
 * @returns {string} - HTML des étoiles
 */
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating); // Étoiles pleines
    const hasHalfStar = rating % 1 !== 0; // Étoile à moitié
    const emptyStars = 5 - Math.ceil(rating); // Étoiles vides
    
    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Étoile à moitié (si note décimale)
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Étoiles vides
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

/**
 * Affiche le message de panier vide
 */
function showEmptyCart() {
    document.getElementById('loading-indicator').style.display = 'none';
    document.getElementById('cart-content-wrapper').style.display = 'none';
    document.getElementById('empty-cart-message').style.display = 'block';
    
    // Mettre à jour le badge à 0
    updateCartBadge();
}

// ========================================
// GESTION DES QUANTITÉS
// ========================================

/**
 * Modifie la quantité d'un article
 * @param {number} index - Index de l'article dans le tableau
 * @param {number} change - Changement de quantité (+1 ou -1)
 */
function changeQuantity(index, change) {
    const item = cartData.cart_items[index];
    const newQuantity = item.quantite + change;
    
    // Vérifier que la quantité reste positive
    if (newQuantity < 1) {
        // Si la quantité devient 0, demander confirmation pour supprimer
        if (confirm(`Voulez-vous supprimer "${item.nom}" du panier ?`)) {
            removeItem(index);
        }
        return;
    }
    
    // Limiter à un maximum de 10 par article
    if (newQuantity > 10) {
        alert('Quantité maximale: 10 articles par produit');
        return;
    }
    
    // Mettre à jour la quantité
    item.quantite = newQuantity;
    
    // Sauvegarder dans localStorage
    saveCartToStorage();
    
    // Réafficher le panier
    displayCart();
    
    console.log(`📊 Quantité mise à jour: ${item.nom} x${newQuantity}`);
}

// ========================================
// SUPPRESSION D'ARTICLES
// ========================================

/**
 * Supprime un article du panier
 * @param {number} index - Index de l'article à supprimer
 */
function removeItem(index) {
    const item = cartData.cart_items[index];
    
    // Récupérer l'élément DOM
    const cartItemElement = document.querySelector(`.cart-item[data-index="${index}"]`);
    
    // Ajouter l'animation de suppression
    cartItemElement.classList.add('removing');
    
    // Attendre la fin de l'animation avant de supprimer
    setTimeout(() => {
        // Supprimer l'article du tableau
        cartData.cart_items.splice(index, 1);
        
        // Sauvegarder dans localStorage
        saveCartToStorage();
        
        // Réafficher le panier
        displayCart();
        
        console.log(`🗑️ Article supprimé: ${item.nom}`);
        
        // Afficher une notification
        showNotification(`"${item.nom}" a été supprimé du panier`, 'success');
    }, 500); // Durée de l'animation (0.5s)
}

// ========================================
// CALCUL ET AFFICHAGE DES TOTAUX
// ========================================

/**
 * Met à jour le résumé de commande (totaux)
 */
function updateSummary() {
    // Calculer le sous-total
    const subtotal = cartData.cart_items.reduce((total, item) => {
        return total + (item.prix * item.quantite);
    }, 0);
    
    // Calculer la réduction
    const discountAmount = subtotal * (cartData.discount_percentage / 100);
    
    // Calculer les frais de livraison
    const shippingCost = cartData.shipping_cost || 0;
    
    // Calculer le total final
    const total = subtotal - discountAmount + shippingCost;
    
    // Mettre à jour l'affichage
    document.getElementById('subtotal-value').textContent = `${subtotal.toFixed(2)} XAF`;
    
    if (discountAmount > 0) {
        document.getElementById('discount-value').textContent = `-${discountAmount.toFixed(2)} XAF`;
    } else {
        document.getElementById('discount-value').textContent = '0.00 XAF';
    }
    
    if (shippingCost > 0) {
        document.getElementById('shipping-value').textContent = `${shippingCost.toFixed(2)} XAF`;
    } else {
        document.getElementById('shipping-value').textContent = 'Gratuite';
    }
    
    document.getElementById('total-value').textContent = `${total.toFixed(2)} XAF`;
    
    // Mettre à jour le compteur d'articles
    const totalItems = cartData.cart_items.reduce((sum, item) => sum + item.quantite, 0);
    document.getElementById('total-items').textContent = totalItems;
}

/**
 * Met à jour le badge du panier dans le header
 */
function updateCartBadge() {
    // Utiliser la classe 'cart-count' au lieu d'un ID
    const cartBadge = document.querySelector('.cart-count');
    
    // Vérifier que l'élément existe
    if (!cartBadge) {
        console.warn('⚠️ Badge du panier introuvable');
        return;
    }
    
    if (!cartData || !cartData.cart_items || cartData.cart_items.length === 0) {
        cartBadge.textContent = '0';
        return;
    }
    
    // Compter le nombre total d'articles
    const totalItems = cartData.cart_items.reduce((sum, item) => sum + item.quantite, 0);
    cartBadge.textContent = totalItems;
}

// ========================================
// PAIEMENT
// ========================================

/**
 * Gère le clic sur le bouton "Procéder au paiement"
 */
function handleCheckout() {
    if (!cartData.cart_items || cartData.cart_items.length === 0) {
        alert('Votre panier est vide !');
        return;
    }
    
    // Calculer le total
    const total = document.getElementById('total-value').textContent;
    
    // Afficher une confirmation
    const confirmMessage = `Procéder au paiement pour un montant de ${total} ?\n\n` +
                          `Nombre d'articles: ${cartData.cart_items.length}`;
    
    if (confirm(confirmMessage)) {
        console.log('💳 Redirection vers la page de paiement...');
        
        // Ici, vous redirigeriez vers la page de paiement
         window.location.href = '/orderDetails.html';
        
        // Pour la démo, afficher un message
        // showNotification('Redirection vers le paiement...', 'info');
        
        // Simuler une redirection après 2 secondes
        setTimeout(() => {
            alert('Page de paiement à implémenter !');
        }, 2000);
    }
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

/**
 * Affiche un message d'erreur
 * @param {string} message - Message d'erreur
 */
function showError(message) {
    document.getElementById('loading-indicator').style.display = 'none';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
    `;
    
    document.querySelector('.cart-container').prepend(errorDiv);
}

/**
 * Affiche une notification temporaire
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Afficher avec animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Masquer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// FONCTIONS EXPORTÉES (accessibles globalement)
// ========================================

// Ces fonctions doivent être accessibles depuis le HTML (onclick)
window.changeQuantity = changeQuantity;
window.removeItem = removeItem;