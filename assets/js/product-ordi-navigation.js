// ============================================
// product-ordi-navigation.js - VERSION COMPLÈTE & CORRIGÉE
// ============================================

let isUpdating = false;
let observer = null;

// Fonction principale : attache les clics sur les cartes produits
function attachProductNavigation() {
    if (isUpdating) return;
    isUpdating = true;

    try {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Nettoyer les anciens événements (sans cloner)
            const handler = card._clickHandler;
            if (handler) {
                card.removeEventListener('click', handler);
            }

            const handleClick = function (e) {
                if (e.target.closest('.add-to-cart-btn')) return;
                e.preventDefault();

                let productInfo = {};

                // 1. Priorité : data-product (recommandé)
                const dataProduct = this.getAttribute('data-product');
                if (dataProduct) {
                    try {
                        productInfo = JSON.parse(dataProduct);
                    } catch (err) {
                        console.error('Erreur data-product:', err);
                    }
                }

                // 2. Sinon : extraire du DOM
                if (!productInfo.title) {
                    productInfo = {
                        brand: this.querySelector('.product-brand')?.textContent.trim() || '',
                        title: this.querySelector('.product-title-card')?.textContent.trim() || '',
                        price: this.querySelector('.product-price')?.textContent.trim() || '',
                        rating: this.querySelector('.rating-text')?.textContent.trim() || '',
                        image: this.querySelector('.product-image')?.src || '',
                        tag: this.querySelector('.product-tag')?.textContent.trim() || 'PREMIUM',
                        stars: Array.from(this.querySelectorAll('.stars-list i'))
                            .filter(i => i.classList.contains('fas') && !i.classList.contains('fa-star-half-alt')).length
                    };
                }

                sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
                window.location.href = 'product_ordi-detail.html';
            };

            // Stocker pour nettoyage futur
            card._clickHandler = handleClick;
            card.addEventListener('click', handleClick);
            card.style.cursor = 'pointer';
        });
    } finally {
        setTimeout(() => { isUpdating = false; }, 100);
    }
}

// Exporter pour pagination_ordi.js
window.attachProductNavigation = attachProductNavigation;

// ============================================
// INITIALISATION + OBSERVATION DES DEUX GRILLES
// ============================================
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

// ============================================
// AFFICHAGE DES DÉTAILS SUR product_ordi-detail.html
// ============================================
window.addEventListener('load', function () {
    if (!window.location.pathname.includes('product_ordi-detail.html')) return;

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

    updateElement('.product-title', product.title);
    updateElement('.new-tag', product.tag);
    updateElement('.main-price', product.price);
    updateElement('.rating-text', product.rating);

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
    if (mainImage && product.image) mainImage.src = product.image;

    // Miniatures
    document.querySelectorAll('.thumbnail img').forEach(thumb => {
        if (product.image) thumb.src = product.image;
    });

    // Sous-titre
    updateElement('.product-subtitle', `${product.brand} | Intel Core i7 | 16 Go RAM | SSD 512 Go`);
});

// ============================================
// GESTION DE LA GALERIE D'IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('#main-image');
    if (!mainImage) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const src = this.querySelector('img')?.getAttribute('data-image') || this.querySelector('img')?.src;
            if (src) mainImage.src = src;
        });
    });
});

// ============================================
// GESTION DES COULEURS & QUANTITÉ
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Couleurs
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            const color = this.getAttribute('data-color');
            if (color) document.querySelector('#selected-color').textContent = color;
        });
    });

    // Quantité
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const display = document.querySelector('.quantity-display');
            if (!display) return;
            let qty = parseInt(display.textContent) || 1;
            const isPlus = this.querySelector('i')?.classList.contains('fa-plus');
            if (isPlus) qty++;
            else if (qty > 1) qty--;
            display.textContent = qty;
        });
    });
});

