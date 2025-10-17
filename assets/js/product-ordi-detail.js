// product-detail.js
// Gestion de l'affichage des détails du produit

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les informations du produit depuis sessionStorage
    const productInfo = JSON.parse(sessionStorage.getItem('selectedProduct'));
    
    // Si aucun produit n'est sélectionné, rediriger vers la liste
    if (!productInfo) {
        console.warn('Aucun produit sélectionné, redirection...');
        showNotification('Veuillez sélectionner un produit', 'warning');
        setTimeout(() => {
            window.location.href = 'products_ordi.html';
        }, 2000);
        return;
    }
    
    console.log('✅ Produit chargé:', productInfo);
    
    // Mettre à jour les informations du produit sur la page
    updateProductDetails(productInfo);
    
    // Gestion de la galerie d'images
    initImageGallery();
    
    // Gestion de la sélection des couleurs
    initColorSelection();
    
    // Gestion de la quantité
    initQuantityControls();
    
    // Gestion des boutons d'action
    initActionButtons();
});

// Mettre à jour les détails du produit
function updateProductDetails(product) {
    console.log('📝 Mise à jour des détails:', product);
    
    // MARQUE (titre principal)
    const productBrand = document.getElementById('product-brand');
    if (productBrand) {
        productBrand.textContent = product.brand || 'Marque';
        console.log('✓ Marque mise à jour:', product.brand);
    }
    
    // NOM DU PRODUIT (sous-titre)
    const productName = document.getElementById('product-name');
    if (productName) {
        productName.textContent = product.title || 'Nom du produit';
        console.log('✓ Nom mis à jour:', product.title);
    }
    
    // PRIX
    const productPrice = document.getElementById('product-price');
    if (productPrice) {
        productPrice.textContent = product.price || '0 FCFA';
        console.log('✓ Prix mis à jour:', product.price);
    }
    
    // BADGE (Nouveau/Promo/etc)
    const productBadge = document.getElementById('product-badge');
    if (productBadge && product.oldPrice) {
        productBadge.textContent = 'PROMO';
        productBadge.style.backgroundColor = '#E91E63';
    }
    
    // NOTATION ET AVIS
    const ratingText = document.getElementById('product-rating');
    if (ratingText) {
        const rating = product.rating || 4.5;
        const reviews = product.reviews || 738;
        ratingText.textContent = `${rating.toFixed(1)} (${reviews} avis)`;
        console.log('✓ Rating mis à jour:', rating);
        
        // Mettre à jour les étoiles
        updateStars(rating);
    }
    
    // IMAGE PRINCIPALE
    const mainImage = document.getElementById('main-image');
    if (mainImage && product.image) {
        mainImage.src = product.image;
        mainImage.alt = product.title || 'Produit';
        console.log('✓ Image mise à jour:', product.image);
        
        // Mettre à jour aussi le premier thumbnail
        const firstThumbnail = document.querySelector('.thumbnail img');
        if (firstThumbnail) {
            firstThumbnail.src = product.image;
            firstThumbnail.setAttribute('data-image', product.image);
        }
    }
    
    console.log('✅ Tous les détails ont été mis à jour');
}

// Mettre à jour l'affichage des étoiles selon la note
function updateStars(rating) {
    const starsContainer = document.getElementById('product-stars');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating % 1) >= 0.5;
    
    // Ajouter les étoiles pleines
    for (let i = 0; i < fullStars; i++) {
        starsContainer.innerHTML += '<i class="fas fa-star"></i>';
    }
    
    // Ajouter demi-étoile si nécessaire
    if (hasHalfStar) {
        starsContainer.innerHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Compléter avec des étoiles vides
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsContainer.innerHTML += '<i class="far fa-star"></i>';
    }
    
    console.log(`✓ Étoiles: ${fullStars} pleines, ${hasHalfStar ? '1 demi' : '0 demi'}, ${emptyStars} vides`);
}

// Initialiser la galerie d'images
function initImageGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Retirer la classe active de tous les thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active au thumbnail cliqué
            this.classList.add('active');
            
            // Changer l'image principale
            const newImageSrc = this.querySelector('img').getAttribute('data-image') || 
                               this.querySelector('img').src;
            
            if (mainImage) {
                // Animation de transition
                mainImage.style.opacity = '0';
                mainImage.style.transition = 'opacity 0.2s';
                setTimeout(() => {
                    mainImage.src = newImageSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// Initialiser la sélection de couleurs
function initColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selected-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la classe active de toutes les options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Ajouter la classe active à l'option cliquée
            this.classList.add('active');
            
            // Mettre à jour le texte de la couleur sélectionnée
            const colorName = this.getAttribute('data-color');
            if (selectedColorText && colorName) {
                selectedColorText.textContent = colorName;
            }
            
            // Animation
            this.style.transform = 'scale(1.15)';
            this.style.transition = 'transform 0.2s';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Initialiser les contrôles de quantité
function initQuantityControls() {
    const quantityDisplay = document.getElementById('quantity-value');
    const minusBtn = document.getElementById('btn-minus');
    const plusBtn = document.getElementById('btn-plus');
    
    let quantity = 1;
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                updateQuantityDisplay(quantity, quantityDisplay);
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            if (quantity < 99) {
                quantity++;
                updateQuantityDisplay(quantity, quantityDisplay);
            }
        });
    }
}

// Mettre à jour l'affichage de la quantité
function updateQuantityDisplay(quantity, displayElement) {
    if (displayElement) {
        displayElement.textContent = quantity;
        
        // Animation
        displayElement.style.transform = 'scale(1.2)';
        displayElement.style.transition = 'transform 0.15s';
        setTimeout(() => {
            displayElement.style.transform = 'scale(1)';
        }, 150);
    }
}

// Initialiser les boutons d'action
function initActionButtons() {
    const btnBuy = document.getElementById('btn-buy-now');
    const btnAdd = document.getElementById('btn-add-cart');
    
    if (btnBuy) {
        btnBuy.addEventListener('click', function() {
            const quantity = document.getElementById('quantity-value')?.textContent || 1;
            const color = document.getElementById('selected-color')?.textContent || 'Non spécifiée';
            const productName = document.getElementById('product-name')?.textContent || 'ce produit';
            
            showNotification(`🚀 Achat immédiat: ${quantity} x ${productName} - Couleur: ${color}`, 'success');
            
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (btnAdd) {
        btnAdd.addEventListener('click', function() {
            const quantity = document.getElementById('quantity-value')?.textContent || 1;
            const color = document.getElementById('selected-color')?.textContent || 'Non spécifiée';
            const productName = document.getElementById('product-name')?.textContent || 'Produit';
            
            showNotification(`✅ ${quantity} x ${productName} ajouté au panier - Couleur: ${color}`, 'success');
            
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Mettre à jour le compteur du panier
            updateCartCount(parseInt(quantity));
        });
    }
}

// Mettre à jour le compteur du panier
function updateCartCount(addedQuantity = 1) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + addedQuantity;
        
        // Animation
        cartCount.style.transform = 'scale(1.3)';
        cartCount.style.transition = 'transform 0.2s';
        cartCount.style.backgroundColor = '#10b981';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
            setTimeout(() => {
                cartCount.style.backgroundColor = '#ef4444';
            }, 300);
        }, 200);
    }
}

// Fonction pour afficher une notification
function showNotification(message, type = 'info') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 350px;
        font-size: 14px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.getElementById('notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}