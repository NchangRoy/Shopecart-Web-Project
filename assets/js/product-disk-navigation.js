// ============================================
// product-disk-navigation.js - VERSION RENOUVELÉE 2025
// Navigation optimisée pour produits de stockage
// ============================================

let isUpdating = false;
let observer = null;

// === FONCTION PRINCIPALE : ATTACHE LES CLICS ===
function attachProductNavigation() {
    if (isUpdating) return;
    isUpdating = true;

    try {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Nettoyer anciens événements
            const handler = card._clickHandler;
            if (handler) {
                card.removeEventListener('click', handler);
            }

            const handleClick = function (e) {
                // Ne pas intercepter les clics sur le bouton panier
                if (e.target.closest('.add-to-cart-btn')) return;
                e.preventDefault();

                let productInfo = {};

                // 1. Priorité : data-product
                const dataProduct = this.getAttribute('data-product');
                if (dataProduct) {
                    try {
                        productInfo = JSON.parse(dataProduct);
                    } catch (err) {
                        console.error('Erreur data-product:', err);
                    }
                }

                // 2. Extraire du DOM
                if (!productInfo.title) {
                    const brandEl = this.querySelector('.product-brand');
                    const titleEl = this.querySelector('.product-title-card');
                    const priceEl = this.querySelector('.product-price');
                    const ratingEl = this.querySelector('.rating-text');
                    const imageEl = this.querySelector('.product-image');
                    const tagEl = this.querySelector('.product-tag');
                    
                    const brand = brandEl?.textContent.trim() || '';
                    const title = titleEl?.textContent.trim() || '';
                    const capacity = title.match(/\d+\s?(TB|GB|To|Go)/i)?.[0] || '';
                    const type = title.includes('NVMe') ? 'NVMe' : 
                                 title.includes('SSD') ? 'SSD' : 
                                 title.includes('Externe') || title.includes('Portable') ? 'Externe' : 'HDD';
                    
                    productInfo = {
                        brand: brand,
                        title: title,
                        price: priceEl?.textContent.trim() || '',
                        rating: ratingEl?.textContent.trim() || '',
                        image: imageEl?.src || '',
                        tag: tagEl?.textContent.trim() || 'PREMIUM',
                        stars: Array.from(this.querySelectorAll('.stars-list i'))
                            .filter(i => i.classList.contains('fas') && !i.classList.contains('fa-star-half-alt')).length,
                        subtitle: `${brand} | ${capacity} | ${type} | Stockage fiable et performant`
                    };
                }

                // Sauvegarder dans sessionStorage
                sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
                window.location.href = 'product_disk-detail.html';
            };

            card._clickHandler = handleClick;
            card.addEventListener('click', handleClick);
            card.style.cursor = 'pointer';
        });
    } finally {
        setTimeout(() => { isUpdating = false; }, 100);
    }
}

// Exporter pour pagination_disk.js
window.attachProductNavigation = attachProductNavigation;

// === INITIALISATION + OBSERVATION ===
document.addEventListener('DOMContentLoaded', function () {
    attachProductNavigation();

    // Observer les deux grilles
    const grids = ['grid1', 'grid2'].map(id => document.getElementById(id)).filter(Boolean);

    if (grids.length > 0 && !observer) {
        observer = new MutationObserver(function (mutations) {
            let shouldUpdate = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });

            if (shouldUpdate && !isUpdating) {
                observer.disconnect();
                setTimeout(() => {
                    attachProductNavigation();
                    grids.forEach(grid => observer.observe(grid, { childList: true, subtree: true }));
                }, 50);
            }
        });

        grids.forEach(grid => {
            observer.observe(grid, { childList: true, subtree: true });
        });
    }
});

// === AFFICHAGE DÉTAILS SUR product_disk-detail.html ===
window.addEventListener('load', function () {
    if (!window.location.pathname.includes('product_disk-detail.html')) return;

    const productData = sessionStorage.getItem('selectedProduct');
    if (!productData) return;

    let product;
    try {
        product = JSON.parse(productData);
    } catch (err) {
        console.error('Erreur parsing produit:', err);
        return;
    }

    const updateElement = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && value) el.textContent = value;
    };

    // Mise à jour du titre de la page
    document.title = `${product.title} | Shopcart`;

    // Mise à jour des informations
    updateElement('.product-title', product.title);
    updateElement('.new-tag', product.tag);
    updateElement('.main-price', product.price);
    updateElement('.rating-text', product.rating);
    updateElement('.product-subtitle', product.subtitle || `${product.brand} | Stockage haute performance`);

    // Étoiles
    const starsDisplay = document.querySelector('.stars-list');
    if (starsDisplay && product.stars) {
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            starsHTML += i < product.stars
                ? '<i class="fas fa-star"></i>'
                : '<i class="far fa-star"></i>';
        }
        starsDisplay.innerHTML = starsHTML;
    }

    // Image principale
    const mainImage = document.querySelector('#main-image');
    if (mainImage && product.image) {
        mainImage.src = product.image;
        mainImage.alt = product.title;
    }

    // Miniatures (utiliser l'image du produit pour toutes)
    document.querySelectorAll('.thumbnail img').forEach(thumb => {
        if (product.image) {
            thumb.src = product.image;
            thumb.dataset.image = product.image;
        }
    });
});

// === GESTION GALERIE D'IMAGES ===
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('#main-image');
    if (!mainImage) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const src = this.querySelector('img')?.getAttribute('data-image') || this.querySelector('img')?.src;
            if (src) {
                mainImage.style.opacity = '0.5';
                setTimeout(() => {
                    mainImage.src = src;
                    mainImage.style.opacity = '1';
                }, 150);
            }
        });
    });
});

// === GESTION COULEURS/FORMATS & QUANTITÉ ===
document.addEventListener('DOMContentLoaded', function () {
    // Sélection de format (couleurs)
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            const format = this.getAttribute('data-color');
            if (format) {
                const selectedEl = document.querySelector('#selected-color');
                if (selectedEl) selectedEl.textContent = format;
            }
        });
    });

    // Gestion quantité
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const display = document.querySelector('.quantity-display');
            if (!display) return;
            
            let qty = parseInt(display.textContent) || 1;
            const isPlus = this.querySelector('i')?.classList.contains('fa-plus');
            
            if (isPlus) {
                qty++;
            } else if (qty > 1) {
                qty--;
            }
            
            display.textContent = qty;
            
            // Animation
            display.style.transform = 'scale(1.2)';
            setTimeout(() => { display.style.transform = 'scale(1)'; }, 150);
        });
    });
});

// === PANIER & NOTIFICATIONS ===
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add-to-cart-btn, .btn-add').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let productInfo = {};
            
            if (this.classList.contains('btn-add')) {
                // Bouton "Ajouter au panier" sur la page détail
                productInfo = {
                    title: document.querySelector('.product-title')?.textContent || '',
                    price: document.querySelector('.main-price')?.textContent || '',
                    quantity: parseInt(document.querySelector('.quantity-display')?.textContent) || 1,
                    format: document.querySelector('#selected-color')?.textContent || '',
                    image: document.querySelector('#main-image')?.src || ''
                };
            } else {
                // Bouton panier sur les cartes produits
                const card = this.closest('.product-card');
                if (!card) return;
                
                productInfo = {
                    title: card.querySelector('.product-title-card')?.textContent || '',
                    price: card.querySelector('.product-price')?.textContent || '',
                    quantity: 1,
                    image: card.querySelector('.product-image')?.src || ''
                };
            }

            // Sauvegarder dans le panier (localStorage)
            let cart = [];
            try {
                cart = JSON.parse(localStorage.getItem('cart') || '[]');
            } catch (e) {
                cart = [];
            }
            
            cart.push(productInfo);
            localStorage.setItem('cart', JSON.stringify(cart));

            showNotification('✓ Produit ajouté au panier !', 'success');
            updateCartCount();
        });
    });
});

function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 100px; right: 20px; 
        background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#ef4444'};
        color: white; padding: 15px 25px; border-radius: 8px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000; animation: slideIn 0.3s ease; 
        font-weight: 500; font-size: 14px;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    // Ajouter les keyframes si nécessaire
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn { 
                from { transform: translateX(400px); opacity: 0; } 
                to { transform: translateX(0); opacity: 1; } 
            }
            @keyframes slideOut { 
                from { transform: translateX(0); opacity: 1; } 
                to { transform: translateX(400px); opacity: 0; } 
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function updateCartCount() {
    const count = document.querySelector('.cart-count');
    if (count) {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (e) {
            cart = [];
        }
        
        count.textContent = cart.length;
        count.style.transform = 'scale(1.3)';
        count.style.background = '#ef4444';
        setTimeout(() => {
            count.style.transform = 'scale(1)';
            count.style.background = '';
        }, 200);
    }
}

// === GESTION FILTRES ===
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.dropdown-content2 a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterType = this.closest('.filter-dropdown').querySelector('.tag-button').textContent.trim().split(' ')[0];
            const filterValue = this.getAttribute('data-price') || 
                              this.getAttribute('data-brand') || 
                              this.getAttribute('data-type') ||
                              this.getAttribute('data-capacity') ||
                              this.getAttribute('data-rating');
            
            console.log(`Filtre appliqué: ${filterType} = ${filterValue}`);
            
            // Marquer le filtre comme actif
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
    
    // Reset des filtres
    const primaryFilter = document.querySelector('.primary-filter');
    if (primaryFilter) {
        primaryFilter.addEventListener('click', function() {
            document.querySelectorAll('.tag-button').forEach(btn => {
                btn.classList.remove('selected-tag');
            });
            showNotification('Tous les filtres réinitialisés', 'info');
        });
    }
});

console.log('✅ product-disk-navigation.js chargé');