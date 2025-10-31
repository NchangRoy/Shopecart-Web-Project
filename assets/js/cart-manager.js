/**
 * CART-MANAGER.JS - Gestion de l'ajout au panier via le HTML - VERSION CORRIGÉE ET GÉNÉRALISÉE
 * =============================================
 * Récupère directement les infos depuis le HTML des produits
 * Modifié pour fonctionner sur tous les types de pages (listes et détails, casques, caméras, téléphones, manettes, disques, ordinateurs, etc.)
 */

// ========================================
// VARIABLES GLOBALES
// ========================================

const CART_STORAGE_KEY = 'shopcart_cart';

// Mapping des images par défaut par marque
const DEFAULT_IMAGES = {
    'sennheiser': '/assets/images/C1.jpeg',
    'beats by dre': '/assets/images/C6.jpeg',
    'bose': '/assets/images/M2.png',
    'sony': '/assets/images/M2.png',
    'jbl': '/assets/images/C13.jpeg',
    'marshall': '/assets/images/M4.jpeg',
    'anker': '/assets/images/C7.jpeg',
    'skullcandy': '/assets/images/C5.jpeg',
    'jabra': '/assets/images/C4.jpeg',
    'akg': '/assets/images/C3.png',
    'audio-technica': '/assets/images/C7.jpeg',
    'default': '/assets/images/placeholder.png'
};

// ========================================
// FONCTIONS DE GESTION DU PANIER
// ========================================

/**
 * Ajoute un produit au panier en récupérant les infos depuis le HTML
 * @param {HTMLElement} productElement - L'élément HTML du produit
 * @param {number} quantity - Quantité (défaut: 1)
 * @param {string} color - Couleur (défaut: 'Défaut')
 */
function addToCartFromHTML(productElement, quantity = 1, color = 'Défaut') {
    try {
        console.log('🛒 Début ajout au panier...', productElement);
        
        // Extraire toutes les infos du HTML du produit
        const productData = extractProductInfoFromHTML(productElement);
        
        if (!productData) {
            console.error('❌ Impossible d\'extraire les données du produit');
            showNotification('Erreur: données produit non trouvées', 'error');
            return;
        }

        console.log('📦 Données extraites:', productData);

        let cart = getCartFromStorage();
        
        // Vérifier si le produit existe déjà dans le panier
        const existingItemIndex = cart.cart_items.findIndex(item => 
            item.nom === productData.name && item.couleur === color
        );
        
        if (existingItemIndex !== -1) {
            // CORRECTION: Ajouter la quantité spécifiée
            const newQuantity = cart.cart_items[existingItemIndex].quantite + quantity;
            
            
                cart.cart_items[existingItemIndex].quantite = newQuantity;
                showNotification(`${quantity} ${productData.name} ajouté(s) - Total: ${newQuantity}`, 'success');
            
        } else {
            // Nouveau produit - CORRECTION: vérifier aussi la limite
            const finalQuantity = quantity > 10 ? 10 : quantity;
            
            const cartItem = {
                id: generateUniqueId(),
                nom: productData.name,
                marque: productData.brand,
                prix: productData.price,
                quantite: finalQuantity,
                couleur: color,
                image: productData.image,
                note: productData.rating
            };
            
            cart.cart_items.push(cartItem);
            
            if (quantity > 10) {
                showNotification(`${productData.name} ajouté (quantité limitée à 10)`, 'warning');
            } else {
                showNotification(`${quantity} ${productData.name} ajouté(s) au panier`, 'success');
            }
        }
        
        // Sauvegarder le panier mis à jour
        saveCartToStorage(cart);
        
        // Mettre à jour le badge du panier
        updateCartBadge();
        
        console.log('✅ Produit ajouté au panier:', productData.name);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'ajout au panier:', error);
        showNotification('Erreur lors de l\'ajout au panier', 'error');
    }
}

/**
 * Extrait toutes les informations du produit depuis son HTML - VERSION CORRIGÉE ET GÉNÉRALISÉE
 * Ajout de plus de sélecteurs pour compatibilité avec tous les types de pages (casques, cams, tels, manettes, disques, ordinateurs, etc.)
 * @param {HTMLElement} productElement - L'élément du produit
 * @returns {Object} - Données du produit
 */
function extractProductInfoFromHTML(productElement) {
    try {
        console.log('🔍 Extraction des données depuis HTML...', productElement);

        // 1. Nom du produit - Ajout de sélecteurs pour détails cams/tels/manettes/disques/ordis
        let nameElement = productElement.querySelector('.product-title-card, .product-title, .product-name, h1.product, h1.name, h3, h4, .product-detail-title');
        const name = nameElement ? nameElement.textContent.trim() : 'Produit sans nom';
        console.log('📝 Nom trouvé:', name);

        // 2. Marque - Ajout de sélecteurs supplémentaires
        let brandElement = productElement.querySelector('.product-brand, .brand, .marque, .product-info p:first-child');
        let brand = brandElement ? brandElement.textContent.trim() : 'Marque inconnue';
        
        // Si pas de marque trouvée, essayer de l'extraire du nom
        if (brand === 'Marque inconnue') {
            brand = getBrandFromTitle(name);
        }
        console.log('🏷️ Marque trouvée:', brand);

        // 3. Prix - Ajout de sélecteurs pour détails (ex: .price, .main-price, .product-price)
        let priceElement = productElement.querySelector('.product-price, .price, .prix, .main-price, .price-section .price, .product-card-price');
        let price = 0;
        if (priceElement) {
            const priceText = priceElement.textContent.trim();
            console.log('💰 Texte prix:', priceText);
            // Supprimer "FCFA", espaces et convertir en nombre
            price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
        }
        console.log('💰 Prix converti:', price);

        // 4. Note/Rating - Ajout de sélecteurs pour différents formats
        let ratingElement = productElement.querySelector('.product-rating, .rating-text, .product-rate .rating-text, .stars, .rating-text-small');
        let rating = ratingElement ? parseFloat(ratingElement.textContent.trim().match(/\d+(\.\d+)?/)[0]) || 0 : 0;
        console.log('⭐ Note trouvée:', rating);

        // 5. Image - Ajout de sélecteurs pour miniatures et images principales
        let imageElement = productElement.querySelector('img.product-image, .main-image, .product-frame img, .product-image-wrapper img, img[src*="assets/images"]');
        const image = imageElement ? imageElement.src : DEFAULT_IMAGES[brand.toLowerCase()] || DEFAULT_IMAGES.default;
        console.log('🖼️ Image trouvée:', image);

        return {
            name,
            brand,
            price,
            rating,
            image
        };

    } catch (error) {
        console.error('❌ Erreur extraction:', error);
        return null;
    }
}

// ========================================
// FONCTIONS DE STOCKAGE
// ========================================

function getCartFromStorage() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : { cart_items: [] };
    } catch {
        return { cart_items: [] };
    }
}

function saveCartToStorage(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// ========================================
// INITIALISATION DES ÉCOUTEURS
// ========================================

/**
 * Initialise les écouteurs pour les boutons "Ajouter au panier" sur les pages listes
 */
function initAddToCartListeners() {
    console.log('🔧 Initialisation écouteurs ajout panier (listes)...');
    
    const addButtons = document.querySelectorAll('.add-to-cart-btn, .btn-outline, .btn-add-cart, .product-card-actions button'); // Ajout de classes pour autres pages
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Trouver l'élément produit parent (généralisé pour différents structures)
            const productElement = button.closest('.product-card, .product-frame, .product-detail-wrapper, .product-info, .product-detail-container, .product-detail-flex');
            if (!productElement) return;
            
            // Récupérer quantité et couleur (généralisé)
            const quantityInput = productElement.querySelector('.quantity-display, .qty') || document.querySelector('.quantity-display, .qty');
            const quantity = quantityInput ? parseInt(quantityInput.textContent) : 1;
            
            const colorSelector = productElement.querySelector('.color-option.active') || document.querySelector('.color-option.active');
            const color = colorSelector ? colorSelector.dataset.color : 'Défaut';
            
            addToCartFromHTML(productElement, quantity, color);
        });
    });
}

/**
 * Initialise les écouteurs pour la page détail (généralisé pour tous les types de détails)
 */
function initDetailPageListeners() {
    console.log('🔧 Initialisation page détail...');
    
    // Bouton "Ajouter au panier" (généralisé avec plus de classes)
    const detailAddBtn = document.querySelector('.btn-add, .btn-add-cart, .add-to-cart, .product-actions, .btn-add-to-cart');
    if (detailAddBtn) {
        console.log('✅ Bouton ajouter trouvé');
        detailAddBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDetailPageAddToCart();
        });
    } else {
        console.log('ℹ️ Bouton ajouter non trouvé (peut être normal)');
    }
    
    // Bouton "Acheter maintenant" (similaire à ajout pour simplicité)
    const buyNowBtn = document.querySelector('.btn-buy, .buy-now, .product-actions .btn-buy-it-now, .');
    if (buyNowBtn) {
        console.log('✅ Bouton acheter trouvé');
        buyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDetailPageBuyNow();
        });
    }
    
    // Gestion des quantités (généralisé)
    initQuantityControls();
    
    // Gestion des couleurs (généralisé)
    initColorSelectors();
    
    // Galerie d'images (généralisé)
    initImageGallery();
}

/**
 * Gère l'ajout au panier depuis la page détail
 */
function handleDetailPageAddToCart() {
    // Sélectionner l'élément produit principal (généralisé pour cams/tels/manettes/disques/ordis)
    const productElement = document.querySelector('.product-detail-wrapper, .product-info, .product-detail-section, .product-detail-container, .product-detail-flex');
    if (!productElement) return;
    
    const quantityDisplay = document.querySelector('.quantity-display, .qty');
    const quantity = quantityDisplay ? parseInt(quantityDisplay.textContent) : 1;
    
    const selectedColor = document.querySelector('#selected-color') || document.querySelector('.selected-color-text span');
    const color = selectedColor ? selectedColor.textContent : 'Défaut';
    
    addToCartFromHTML(productElement, quantity, color);
}

/**
 * Gère "Acheter maintenant" (ajout au panier + redirection panier)
 */
function handleDetailPageBuyNow() {
    handleDetailPageAddToCart();
    window.location.href = '/panier.html';
}

// ========================================
// AUTRES FONCTIONS (quantité, couleurs, galerie)
// ========================================

function initQuantityControls() {
    const quantityDisplay = document.querySelector('.quantity-display, .qty');
    const quantityBtns = document.querySelectorAll('.quantity-btn, .qty-btn, button[data-action="decrease"], button[data-action="increase"]');
    
    if (quantityDisplay && quantityBtns.length > 0) {
        const decreaseBtn = Array.from(quantityBtns).find(btn => 
            btn.textContent.trim() === '-' || 
            btn.innerHTML.includes('minus') || 
            btn.classList.contains('decrease') || 
            btn.classList.contains('minus') || 
            btn.dataset.action === 'decrease' ||
            btn.querySelector('.fa-minus, .fa-chevron-left, .fa-minus-circle')
        );
        
        const increaseBtn = Array.from(quantityBtns).find(btn => 
            btn.textContent.trim() === '+' || 
            btn.innerHTML.includes('plus') || 
            btn.classList.contains('increase') || 
            btn.classList.contains('plus') || 
            btn.dataset.action === 'increase' ||
            btn.querySelector('.fa-plus, .fa-chevron-right, .fa-plus-circle')
        );
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let quantity = parseInt(quantityDisplay.textContent);
                if (quantity > 1) {
                    quantityDisplay.textContent = quantity - 1;
                }
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let quantity = parseInt(quantityDisplay.textContent);
                if (quantity < 10) {
                    quantityDisplay.textContent = quantity + 1;
                } else {
                    showNotification('Quantité maximale: 10 articles', 'warning');
                }
            });
        }
    }
}

function initColorSelectors() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.querySelector('#selected-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            if (selectedColorText) {
                selectedColorText.textContent = this.dataset.color;
            }
        });
    });
}

function initImageGallery() {
    const mainImage = document.querySelector('#main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            if (mainImage) {
                const newImage = this.querySelector('img').dataset.image || this.querySelector('img').src;
                mainImage.src = newImage;
            }
        });
    });
}

// ========================================
// NOTIFICATIONS ET UTILITAIRES
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    return colors[type] || '#2196F3';
}

function updateCartBadge() {
    const cart = getCartFromStorage();
    const totalItems = cart.cart_items.reduce((sum, item) => sum + item.quantite, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    console.log('🔄 Badge mis à jour:', totalItems, 'articles');
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getBrandFromTitle(title) {
    const brands = ['Sennheiser', 'Beats by Dre', 'Bose', 'Sony', 'JBL', 'Marshall', 'Anker', 'Jabra', 'AKG', 'Skullcandy', 'Audio-Technica', 'Nikon', 'Itel', 'Razer', 'Microsoft', 'Seagate', 'Western Digital', 'Dell', 'HP', 'Lenovo', 'Asus']; // Ajout de marques pour autres catégories
    for (const brand of brands) {
        if (title.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    return 'Autre';
}

// ========================================
// INITIALISATION GLOBALE
// ========================================

function initCartManager() {
    console.log('🛒 Initialisation du gestionnaire de panier...');
    initAddToCartListeners(); // Pour listes
    initDetailPageListeners(); // Pour détails (appel toujours, sans risque si éléments absents)
    updateCartBadge();
    console.log('✅ Gestionnaire de panier initialisé');
}

// Démarrer quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartManager);
} else {
    initCartManager();
}

// Export pour utilisation globale
window.addToCartFromHTML = addToCartFromHTML;
window.updateCartBadge = updateCartBadge;