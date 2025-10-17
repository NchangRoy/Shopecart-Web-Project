// product-navigation.js
// Gestion de la navigation vers les pages de détails des produits

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les cartes de produits
    const productCards = document.querySelectorAll('.product-card:not(.out-of-stock)');
    
    // Données des produits (peut être étendu ou chargé depuis une API)
    const productsData = {
        'HP 14 Laptop,Intel': {
            id: 1,
            brand: 'HP',
            name: 'HP 14 Laptop,Intel',
            price: '150.000 FCFA',
            rating: 4.4,
            reviews: 738,
            image: '../assets/images/img_Lap1.jpg',
            description: 'Ordinateur portable HP 14 pouces avec processeur Intel'
        },
        'Acer Aspire 15 Slim': {
            id: 2,
            brand: 'acer',
            name: 'Acer Aspire 15 Slim',
            price: '200.000 FCFA',
            rating: 4.9,
            reviews: 856,
            image: '../assets/images/img_Lap2.jpg',
            description: 'Acer Aspire 15 Slim AG15-32P-39R2|15.6" FHD 1920x1080 IPS'
        },
        'Dell inspiron 3530': {
            id: 3,
            brand: 'Dell',
            name: 'Dell inspiron 3530',
            price: '280.000 FCFA',
            oldPrice: '300.000 FCFA',
            rating: 4.6,
            reviews: 623,
            image: '../assets/images/img_Lap3.jpg',
            description: 'Dell Inspiron 3530 avec écran 15.6 pouces'
        },
        'Acer Aspire 3 A315-24P-R7VH': {
            id: 4,
            brand: 'acer',
            name: 'Acer Aspire 3 A315-24P-R7VH',
            price: '150.000 FCFA',
            rating: 4.4,
            reviews: 512,
            image: '../assets/images/img_Lap4.jpg',
            description: 'Acer Aspire 3 performant pour usage quotidien'
        },
        'ASUS ROG Strix G16 2025': {
            id: 5,
            brand: 'ASUS',
            name: 'ASUS ROG Strix G16 2025',
            price: '114.000 FCFA',
            rating: 4.7,
            reviews: 892,
            image: '../assets/images/img_Lap5.jpg',
            description: 'PC Gaming ASUS ROG Strix G16 haute performance'
        },
        'HP Touchscreen Laptop': {
            id: 6,
            brand: 'HP',
            name: 'HP Touchscreen Laptop',
            price: '71.000 FCFA',
            rating: 4.4,
            reviews: 445,
            image: '../assets/images/img_Lap6.jpg',
            description: 'HP Laptop avec écran tactile'
        },
        'Lenovo IdeaPad 1 student Laptop': {
            id: 7,
            brand: 'Lenovo',
            name: 'Lenovo IdeaPad 1 student Laptop',
            price: '201.000 FCFA',
            rating: 4.7,
            reviews: 678,
            image: '../assets/images/img_Lap7.jpg',
            description: 'Lenovo IdeaPad idéal pour les étudiants'
        },
        'Lenovo V-Series V15 Business Laptop': {
            id: 8,
            brand: 'Lenovo',
            name: 'Lenovo V-Series V15 Business Laptop',
            price: '200.000 FCFA',
            oldPrice: '300.000 FCFA',
            rating: 4.6,
            reviews: 534,
            image: '../assets/images/img_Lap8.jpg',
            description: 'Lenovo V15 pour usage professionnel'
        }
    };

    // Ajouter un gestionnaire de clic sur chaque carte de produit
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le bouton panier
            if (e.target.closest('.add-to-cart-btn')) {
                e.stopPropagation();
                return;
            }
            
            // Récupérer les informations du produit
            const productTitle = card.querySelector('.product-title-card')?.textContent.trim();
            const productBrand = card.querySelector('.product-brand')?.textContent.trim();
            const productPrice = card.querySelector('.product-price')?.textContent.trim();
            const oldPrice = card.querySelector('.old-price')?.textContent.trim();
            const productImage = card.querySelector('.product-image')?.src;
            
            // Récupérer la note (rating)
            const stars = card.querySelectorAll('.stars-list .fas.fa-star').length;
            const halfStars = card.querySelectorAll('.stars-list .fas.fa-star-half-alt').length;
            const rating = stars + (halfStars * 0.5);
            
            // Récupérer le nombre d'avis depuis le texte de rating
            const ratingTextElement = card.querySelector('.rating-text');
            let reviews = 738; // valeur par défaut
            if (ratingTextElement) {
                const ratingMatch = ratingTextElement.textContent.match(/\((\d+(?:\.\d+)?)\)/);
                if (ratingMatch) {
                    reviews = Math.floor(parseFloat(ratingMatch[1]) * 100); // Convertir note en nombre d'avis approximatif
                }
            }
            
            // Stocker les informations dans sessionStorage
            if (productTitle) {
                const productInfo = {
                    title: productTitle,
                    brand: productBrand,
                    price: productPrice,
                    oldPrice: oldPrice || null,
                    image: productImage,
                    rating: rating,
                    reviews: reviews,
                    description: `${productTitle} - ${productBrand}`,
                    // Récupérer les données supplémentaires si disponibles
                    ...(productsData[productTitle] || {})
                };
                
                console.log('Produit sélectionné:', productInfo); // Pour debug
                sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
                
                // Rediriger vers la page de détails
                window.location.href = '../pages/product_ordi-detail.html';
            }
        });
        
        // Ajouter un effet visuel au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Empêcher la navigation lors du clic sur le bouton "Ajouter au panier"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn:not(.disabled-btn)');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Afficher une notification (optionnel)
            showNotification('Produit ajouté au panier !');
        });
    });
});

// Fonction pour afficher une notification
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Ajouter l'animation
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
    document.head.appendChild(style);
    
    // Ajouter au document
    document.body.appendChild(notification);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}