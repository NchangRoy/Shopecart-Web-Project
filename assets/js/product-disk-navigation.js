// ============================================
// GESTION DE LA NAVIGATION VERS LES DÉTAILS PRODUIT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer tous les liens de produits
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Supprimer l'attribut href pour le remplacer par navigation JS
        card.removeAttribute('href');
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le bouton panier
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            e.preventDefault();
            
            // Extraire les informations du produit
            const productInfo = {
                brand: this.querySelector('.product-brand')?.textContent.trim() || '',
                title: this.querySelector('.product-title-card')?.textContent.trim() || '',
                price: this.querySelector('.product-price')?.textContent.trim() || '',
                rating: this.querySelector('.rating-text')?.textContent.trim() || '',
                image: this.querySelector('.product-image')?.src || '',
                tag: this.querySelector('.product-tag')?.textContent.trim() || 'Premium',
                stars: this.querySelectorAll('.stars-list .fa-star:not(.far)').length || 4
            };
            
            console.log('Produit sélectionné:', productInfo);
            
            // Stocker les informations dans sessionStorage
            sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
            
            // Déterminer le chemin correct vers la page de détails
            let detailPagePath;
            if (window.location.pathname.includes('/pages/')) {
                // Si on est dans le dossier pages
                detailPagePath = 'product_disk-detail.html';
            } else {
                // Si on est à la racine
                detailPagePath = 'pages/product_disk-detail.html';
            }
            
            // Rediriger vers la page de détails
            window.location.href = detailPagePath;
        });
    });
});


// ============================================
// AFFICHAGE DES DÉTAILS DU PRODUIT SUR LA PAGE DE DÉTAILS
// ============================================

// Attendre que la page soit complètement chargée
window.addEventListener('load', function() {
    // Vérifier si on est sur la page de détails
    if (window.location.pathname.includes('product_disk-detail.html') || 
        window.location.pathname.includes('product-detail')) {
        
        console.log('Page de détails détectée');
        
        // Récupérer les informations du produit
        const productData = sessionStorage.getItem('selectedProduct');
        
        if (productData) {
            const product = JSON.parse(productData);
            console.log('Données du produit récupérées:', product);
            
            // Mettre à jour le titre du produit
            const productTitle = document.querySelector('.product-title');
            if (productTitle && product.title) {
                productTitle.textContent = product.title;
                console.log('Titre mis à jour:', product.title);
            }
            
            // Mettre à jour le tag
            const newTag = document.querySelector('.new-tag');
            if (newTag && product.tag) {
                newTag.textContent = product.tag;
                console.log('Tag mis à jour:', product.tag);
            }
            
            // Mettre à jour le prix
            const mainPrice = document.querySelector('.main-price');
            if (mainPrice && product.price) {
                mainPrice.textContent = product.price;
                console.log('Prix mis à jour:', product.price);
            }
            
            // Mettre à jour la notation
            const ratingText = document.querySelector('.rating-text');
            if (ratingText && product.rating) {
                ratingText.textContent = product.rating;
                console.log('Note mise à jour:', product.rating);
            }
            
            // Mettre à jour les étoiles
            const starsDisplay = document.querySelector('.stars-list');
            if (starsDisplay && product.stars) {
                let starsHTML = '';
                for (let i = 0; i < 5; i++) {
                    if (i < product.stars) {
                        starsHTML += '<i class="fas fa-star"></i>';
                    } else {
                        starsHTML += '<i class="far fa-star"></i>';
                    }
                }
                starsDisplay.innerHTML = starsHTML;
                console.log('Étoiles mises à jour');
            }
            
            // Mettre à jour l'image principale
            const mainImage = document.querySelector('#main-image');
            if (mainImage && product.image) {
                mainImage.src = product.image;
                console.log('Image mise à jour');
            }
            
            // Mettre à jour toutes les miniatures avec la même image
            const thumbnails = document.querySelectorAll('.thumbnail img');
            thumbnails.forEach((thumb, index) => {
                if (product.image) {
                    thumb.src = product.image;
                    thumb.setAttribute('data-image', product.image);
                }
            });
            
            // Mettre à jour le sous-titre avec la marque
            const productSubtitle = document.querySelector('.product-subtitle');
            if (productSubtitle && product.brand) {
                productSubtitle.textContent = `${product.brand} | Intel Core i7 | 16 Go RAM | SSD 512 Go - Performance et élégance réunies`;
                console.log('Sous-titre mis à jour');
            }
            
            // Ajouter un indicateur visuel de chargement réussi
            console.log('✅ Mise à jour de la page de détails terminée');
            
        } else {
            console.log('❌ Aucune donnée produit trouvée dans sessionStorage');
        }
    }
});


// ============================================
// GESTION DE LA GALERIE D'IMAGES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('#main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Retirer la classe active de toutes les miniatures
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à la miniature cliquée
            this.classList.add('active');
            
            // Changer l'image principale
            const newImageSrc = this.querySelector('img').getAttribute('data-image') || 
                               this.querySelector('img').src;
            if (mainImage) {
                mainImage.src = newImageSrc;
            }
        });
    });
});


// ============================================
// GESTION DES COULEURS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.querySelector('#selected-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la classe active de toutes les options
            colorOptions.forEach(o => o.classList.remove('active'));
            
            // Ajouter la classe active à l'option cliquée
            this.classList.add('active');
            
            // Mettre à jour le texte de la couleur sélectionnée
            const colorName = this.getAttribute('data-color');
            if (selectedColorText && colorName) {
                selectedColorText.textContent = colorName;
            }
        });
    });
});


// ============================================
// GESTION DE LA QUANTITÉ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const quantityDisplay = document.querySelector('.quantity-display');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!quantityDisplay) return;
            
            let currentQuantity = parseInt(quantityDisplay.textContent);
            const icon = this.querySelector('i');
            
            // Vérifier si c'est le bouton plus ou moins
            if (icon && icon.classList.contains('fa-plus')) {
                currentQuantity++;
            } else if (icon && icon.classList.contains('fa-minus') && currentQuantity > 1) {
                currentQuantity--;
            }
            
            quantityDisplay.textContent = currentQuantity;
        });
    });
});


// ============================================
// GESTION DU PANIER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Bouton "Ajouter au panier"
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .btn-add');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Animation de feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Récupérer les informations du produit
            let productInfo;
            
            if (this.classList.contains('btn-add')) {
                // Sur la page de détails
                productInfo = {
                    title: document.querySelector('.product-title')?.textContent || '',
                    price: document.querySelector('.main-price')?.textContent || '',
                    quantity: parseInt(document.querySelector('.quantity-display')?.textContent) || 1,
                    color: document.querySelector('#selected-color')?.textContent || '',
                    image: document.querySelector('#main-image')?.src || ''
                };
            } else {
                // Sur la page de liste
                const card = this.closest('.product-card');
                productInfo = {
                    title: card.querySelector('.product-title-card')?.textContent || '',
                    price: card.querySelector('.product-price')?.textContent || '',
                    quantity: 1,
                    image: card.querySelector('.product-image')?.src || ''
                };
            }
            
            console.log('Produit ajouté au panier:', productInfo);
            
            // Afficher une notification
            showNotification('Produit ajouté au panier !', 'success');
            
            // Mettre à jour le compteur du panier
            updateCartCount();
        });
    });
    
    // Bouton "Acheter maintenant"
    const buyNowBtn = document.querySelector('.btn-buy');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            showNotification('Redirection vers le paiement...', 'info');
            
            // Simuler une redirection après 1 seconde
            setTimeout(() => {
                console.log('Redirection vers le panier');
                // window.location.href = '/panier.html';
            }, 1000);
        });
    }
});


// ============================================
// FONCTION DE NOTIFICATION
// ============================================

function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    // Ajouter l'animation CSS
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
    if (!document.querySelector('style[data-notification-style]')) {
        style.setAttribute('data-notification-style', 'true');
        document.head.appendChild(style);
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}


// ============================================
// MISE À JOUR DU COMPTEUR DU PANIER
// ============================================

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let currentCount = parseInt(cartCount.textContent) || 0;
        currentCount++;
        cartCount.textContent = currentCount;
        
        // Animation du compteur
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}


// ============================================
// GESTION DES FILTRES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.dropdown-content2 a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer le type de filtre
            const filterType = this.closest('.filter-dropdown').querySelector('.tag-button').textContent.trim().split(' ')[0];
            const filterValue = this.getAttribute('data-price') || 
                               this.getAttribute('data-brand') || 
                               this.getAttribute('data-rating');
            
            console.log(`Filtre appliqué: ${filterType} = ${filterValue}`);
            
            // Marquer le bouton de filtre comme actif
            const tagButton = this.closest('.filter-dropdown').querySelector('.tag-button');
            if (tagButton) {
                tagButton.classList.add('selected-tag');
            }
            
            // Fermer le dropdown
            const checkbox = this.closest('.filter-dropdown').querySelector('.filter-checkbox');
            if (checkbox) {
                checkbox.checked = false;
            }
            
            showNotification(`Filtre "${this.textContent.trim()}" appliqué`, 'info');
        });
    });
});