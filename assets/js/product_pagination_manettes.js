// Fichier : product_pagination_manettes.js
// Version corrigée pour la pagination

// ---------------------- 1. DONNÉES ET CONFIGURATION ----------------------

const allProducts = [
    { name: "Manette PS5 DualSense", price: 69900, rating: 4.8, brand: "Sony", image: "assets/images/manette_ps5.png" },
    { name: "Manette Xbox Series X/S", price: 59900, rating: 4.5, brand: "Microsoft", image: "assets/images/manette_xbox.png" },
    { name: "Manette Nintendo Switch Pro", price: 64900, rating: 4.6, brand: "Nintendo", image: "assets/images/manette_switch.png" },
    { name: "Logitech F710 Wireless", price: 34900, rating: 4.0, brand: "Logitech", image: "assets/images/manette_logitech.png" },
    { name: "Razer Wolverine V2 Chroma", price: 149900, rating: 4.7, brand: "Razer", image: "assets/images/manette_razer.png" },
    { name: "SteelSeries Stratus Duo", price: 49900, rating: 4.1, brand: "SteelSeries", image: "assets/images/manette_steelseries.png" },
    { name: "Manette PS4 DualShock", price: 49900, rating: 4.4, brand: "Sony", image: "assets/images/manette_ps4.png" },
    { name: "Google Stadia Controller", price: 29900, rating: 3.5, brand: "Google", image: "assets/images/manette_stadia.png" },
    { name: "8BitDo Pro 2", price: 44900, rating: 4.3, brand: "8BitDo", image: "assets/images/manette_8bitdo.png" },
    { name: "Nacon Revolution Unlimited Pro", price: 129900, rating: 4.6, brand: "Nacon", image: "assets/images/manette_nacon.png" },
    { name: "Turtle Beach Recon Controller", price: 59900, rating: 4.2, brand: "Turtle Beach", image: "assets/images/manette_turtlebeach.png" },
    { name: "Astro C40 TR", price: 199900, rating: 4.9, brand: "Astro", image: "assets/images/manette_astro.png" },
    { name: "PowerA Enhanced Wired Controller", price: 24900, rating: 3.9, brand: "PowerA", image: "assets/images/manette_powera.png" },
    { name: "Thrustmaster eSwap X Pro", price: 179900, rating: 4.7, brand: "Thrustmaster", image: "assets/images/manette_thrustmaster.png" },
    { name: "Xbox Elite Series 2", price: 179900, rating: 4.8, brand: "Microsoft", image: "assets/images/manette_elite.png" },
    { name: "DualSense Edge", price: 239900, rating: 4.5, brand: "Sony", image: "assets/images/manette_dualsense_edge.png" },
    { name: "Nintendo Switch Joy-Con", price: 79900, rating: 4.0, brand: "Nintendo", image: "assets/images/manette_joycon.png" },
    { name: "HORI Real Arcade Pro 4", price: 159900, rating: 4.5, brand: "HORI", image: "assets/images/manette_hori.png" },
]; 

const pagination = {
    allProducts: allProducts,
    productsPerPage: 8,
    currentPage: 1,
    productContainerID: 'product-grid-container', // ID dans product_manette.html
    paginationContainerID: 'pagination-controls', // ID dans product_manette.html
    titleID: 'products-title' // ID dans product_manette.html pour le scroll
};

let totalPages;

// ---------------------- 2. FONCTION DE CRÉATION DE CARTE PRODUIT ----------------------

// Cette fonction est le point clé de l'adaptation : elle crée la structure HTML
// du produit en utilisant VOS classes CSS.
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card'; // VOTRE CLASSE

    // 1. Image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image'; // VOTRE CLASSE
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    imageContainer.appendChild(image);
    
    // 2. Info
    const infoContainer = document.createElement('div');
    infoContainer.className = 'product-info'; // VOTRE CLASSE
    
    const nameLink = document.createElement('a');
    nameLink.href = '#'; 
    nameLink.className = 'product-name';
    nameLink.textContent = product.name;
    
    const brandSpan = document.createElement('span');
    brandSpan.className = 'product-brand';
    brandSpan.textContent = product.brand;

    const priceSpan = document.createElement('span');
    priceSpan.className = 'product-price'; // VOTRE CLASSE
    const formattedPrice = (product.price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }); // Assurez-vous du bon format de devise
    priceSpan.textContent = formattedPrice;

    // 3. Rating
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'product-rating'; // VOTRE CLASSE
    const starCount = Math.round(product.rating);
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        // Utilisez la librairie Font Awesome (déjà incluse dans votre HTML)
        star.className = (i < starCount ? 'fas' : 'far') + ' fa-star'; 
        ratingDiv.appendChild(star);
    }
    const ratingText = document.createElement('span');
    ratingText.textContent = ` (${product.rating})`;
    ratingDiv.appendChild(ratingText);

    // 4. Bouton
    const buyBtn = document.createElement('button');
    buyBtn.className = 'buy-button'; // VOTRE CLASSE
    buyBtn.textContent = 'Ajouter au panier';

    // Assemblage
    infoContainer.appendChild(nameLink);
    infoContainer.appendChild(brandSpan);
    infoContainer.appendChild(ratingDiv);
    infoContainer.appendChild(priceSpan);
    infoContainer.appendChild(buyBtn);

    productCard.appendChild(imageContainer);
    productCard.appendChild(infoContainer);

    return productCard;
}

// ---------------------- 3. FONCTIONS D'AFFICHAGE ET DE RENDU ----------------------

function displayProducts(pagination) {
    // Utilise l'ID 'product-grid-container'
    const container = document.getElementById(pagination.productContainerID); 
    if (!container) {
        console.error(`Conteneur de produits introuvable : #${pagination.productContainerID}`);
        return;
    }
    container.innerHTML = ''; // Vider le conteneur

    const startIndex = (pagination.currentPage - 1) * pagination.productsPerPage;
    const endIndex = startIndex + pagination.productsPerPage;
    
    const productsToShow = pagination.allProducts.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

function renderPagination(pagination) {
    // Utilise l'ID 'pagination-controls'
    const pagin = document.getElementById(pagination.paginationContainerID); 
    if (!pagin) {
        console.error(`Contrôles de pagination introuvables : #${pagination.paginationContainerID}`);
        return;
    }
    pagin.innerHTML = ''; // Vider les contrôles

    const { currentPage } = pagination;
    
    // Bouton Previous - Utilise la classe page-btn de votre camarade
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.className = 'page-btn'; 
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1, pagination);
    pagin.appendChild(prevBtn);

    // Créer les boutons de pagination
    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let page = startPage; page <= endPage; page++) {
        const btn = document.createElement('button');
        btn.textContent = page;
        // Utilise les classes page-num/page-num-active de votre camarade
        btn.className = (page === currentPage) ? 'page-num-active' : 'page-num'; 
        btn.onclick = () => goToPage(page, pagination);
        pagin.appendChild(btn);
    }
    
    // Bouton Next - Utilise la classe page-btn de votre camarade
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'page-btn'; 
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1, pagination);
    pagin.appendChild(nextBtn);
}


// ---------------------- 4. FONCTIONS DE CONTRÔLE ----------------------

function updateDisplay(pagination) {
    displayProducts(pagination);
    renderPagination(pagination);
}

function goToPage(page, pagination) {
    if (page < 1 || page > totalPages) return; 
    pagination.currentPage = page;
    updateDisplay(pagination)
    // Utilise l'ID 'products-title' pour le scroll
    const title = document.getElementById(pagination.titleID); 
    if (title) {
        title.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Calculer le nombre total de pages
    totalPages = Math.ceil(pagination.allProducts.length / pagination.productsPerPage);
    
    // Afficher la première page
    if (pagination.allProducts.length > 0) {
        updateDisplay(pagination);
    } else {
         const container = document.getElementById(pagination.productContainerID);
         if (container) {
             container.innerHTML = '<p>Aucun produit disponible pour l\'instant.</p>';
         }
         const pagin = document.getElementById(pagination.paginationContainerID);
         if (pagin) {
             pagin.innerHTML = '';
         }
    }
});