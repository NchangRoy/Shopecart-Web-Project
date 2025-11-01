/* ==============================================================
   product_detail_ordi.js
   - PRODUITS SIMILAIRES AFFICHÉS + REDIRECTION INSTANTANÉE
   - 100% TESTÉ ET FONCTIONNEL
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    let isNavigating = false;

    /* -------------------------------------------------
       1. CHARGEMENT DU PRODUIT ACTUEL
       ------------------------------------------------- */
    const currentProductData = sessionStorage.getItem('currentProduct');
    let product = null;

    if (currentProductData) {
        try {
            product = JSON.parse(currentProductData);
            document.getElementById('page-title').textContent = `${product.name} | Shopcart`;
            document.querySelector('.product-title').textContent = product.name;
            document.querySelector('.product-subtitle').textContent = product.subtitle || 'Détails du produit';
            document.querySelector('.main-price').textContent = `${product.price.toLocaleString()} FCFA`;
        } catch (e) {
            console.error("Erreur sessionStorage:", e);
        }
    }

    /* -------------------------------------------------
       2. GALERIE D'IMAGES
       ------------------------------------------------- */
    const mainImg = document.getElementById('main-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');

    if (mainImg && thumbnailContainer && product) {
        const gallery = product.gallery || [product.image];
        mainImg.src = gallery[0];
        mainImg.alt = product.name;

        thumbnailContainer.innerHTML = '';
        gallery.forEach((imgSrc, index) => {
            const thumbDiv = document.createElement('div');
            thumbDiv.className = 'thumbnail';
            if (index === 0) thumbDiv.classList.add('active');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Vue ${index + 1}`;
            img.dataset.image = imgSrc;
            img.loading = 'lazy';

            thumbDiv.appendChild(img);
            thumbnailContainer.appendChild(thumbDiv);
        });

        thumbnailContainer.querySelectorAll('.thumbnail img').forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImg.classList.add('loading');
                const newImg = new Image();
                newImg.onload = () => {
                    mainImg.src = thumb.src;
                    mainImg.alt = thumb.alt;
                    mainImg.classList.remove('loading');
                };
                newImg.src = thumb.src;

                thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.closest('.thumbnail').classList.add('active');
            });
        });
    }

    /* -------------------------------------------------
       3. PRODUITS SIMILAIRES
       ------------------------------------------------- */
    const similarProducts = [
        { name: "Dell XPS 15", price: 1250000, rating: 4.8, brand: "Dell", image: "../assets/images/img_Lap1.jpg" },
        { name: "HP Spectre x360 16", price: 1450000, rating: 4.7, brand: "HP", image: "../assets/images/img_Lap2.jpg" },
        { name: "Lenovo ThinkPad X1 Carbon", price: 1550000, rating: 4.9, brand: "Lenovo", image: "../assets/images/img_Lap3.jpg" },
        { name: "Dell Inspiron 14", price: 580000, rating: 4.3, brand: "Dell", image: "../assets/images/img_Lap4.jpg" },
        { name: "HP Pavilion x360", price: 690000, rating: 4.4, brand: "HP", image: "../assets/images/img_Lap5.jpg" },
        { name: "Lenovo IdeaPad 5", price: 520000, rating: 4.2, brand: "Lenovo", image: "../assets/images/img_Lap6.jpg" },
        { name: "Dell Latitude 5540", price: 1050000, rating: 4.6, brand: "Dell", image: "../assets/images/img_Lap7.jpg" },
        { name: "HP Envy x360 15", price: 880000, rating: 4.5, brand: "HP", image: "../assets/images/img_Lap8.jpg" },
        { name: "Lenovo Yoga 9i", price: 980000, rating: 4.7, brand: "Lenovo", image: "../assets/images/img_Lap12.jpg" },
        { name: "Dell Alienware m15", price: 1850000, rating: 4.8, brand: "Dell", image: "../assets/images/img_Lap13.jpg" },
        { name: "HP Omen 15", price: 1250000, rating: 4.6, brand: "HP", image: "../assets/images/img_Lap14.jpg" },
        { name: "Lenovo Legion 7", price: 1480000, rating: 4.7, brand: "Lenovo", image: "../assets/images/img_Lap15.jpg" },
        { name: "Dell Precision 5560", price: 1650000, rating: 4.8, brand: "Dell", image: "../assets/images/img_Lap16.jpg" },
        { name: "HP ZBook Fury 17", price: 1950000, rating: 4.9, brand: "HP", image: "../assets/images/img_Lap1.jpg" },
        { name: "Lenovo ThinkPad P15", price: 1750000, rating: 4.8, brand: "Lenovo", image: "../assets/images/img_Lap2.jpg" },
        { name: "Dell Vostro 14", price: 480000, rating: 4.1, brand: "Dell", image: "../assets/images/img_Lap3.jpg" },
        { name: "Dell XPS 17", price: 1850000, rating: 4.9, brand: "Dell", image: "../assets/images/img_Lap4.jpg" },
        { name: "HP Spectre 13", price: 1150000, rating: 4.6, brand: "HP", image: "../assets/images/img_Lap5.jpg" },
        { name: "Lenovo ThinkPad E14", price: 650000, rating: 4.4, brand: "Lenovo", image: "../assets/images/img_Lap6.jpg" },
        { name: "Dell Inspiron 15", price: 620000, rating: 4.2, brand: "Dell", image: "../assets/images/img_Lap7.jpg" },
        { name: "HP Pavilion 14", price: 550000, rating: 4.3, brand: "HP", image: "../assets/images/img_Lap8.jpg" },
        { name: "Lenovo IdeaPad Flex 5", price: 680000, rating: 4.5, brand: "Lenovo", image: "../assets/images/img_Lap12.jpg" },
        { name: "Dell G16 Gaming", price: 1350000, rating: 4.7, brand: "Dell", image: "../assets/images/img_Lap13.jpg" },
        { name: "HP Victus 16", price: 1050000, rating: 4.6, brand: "HP", image: "../assets/images/img_Lap14.jpg" },
        { name: "Lenovo Legion Slim 5", price: 1180000, rating: 4.7, brand: "Lenovo", image: "../assets/images/img_Lap15.jpg" },
        { name: "Dell Latitude 9440", price: 1450000, rating: 4.8, brand: "Dell", image: "../assets/images/img_Lap16.jpg" },
        { name: "HP EliteBook 845", price: 1250000, rating: 4.7, brand: "HP", image: "../assets/images/img_Lap1.jpg" },
        { name: "Lenovo ThinkPad T14", price: 950000, rating: 4.6, brand: "Lenovo", image: "../assets/images/img_Lap2.jpg" },
        { name: "Dell Vostro 16", price: 720000, rating: 4.4, brand: "Dell", image: "../assets/images/img_Lap3.jpg" },
        { name: "HP ProBook 450", price: 680000, rating: 4.5, brand: "HP", image: "../assets/images/img_Lap4.jpg" },
        { name: "Lenovo V15", price: 450000, rating: 4.2, brand: "Lenovo", image: "../assets/images/img_Lap5.jpg" },
        { name: "Dell Inspiron 13", price: 850000, rating: 4.6, brand: "Dell", image: "../assets/images/img_Lap6.jpg" }
    ];

    const productsPerPage = 8;
    let currentSimilarPage = 1;
    const totalSimilarPages = Math.ceil(similarProducts.length / productsPerPage);

    function displayProducts(page) {
        const grid = document.getElementById('similar-grid');
        if (!grid) {
            console.error("Erreur : #similar-grid introuvable !");
            return;
        }

        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const items = similarProducts.slice(start, end);

        grid.innerHTML = '';

        items.forEach((product, i) => {
            const fullStars = Math.floor(product.rating);
            const hasHalf = (product.rating % 1) >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

            const card = document.createElement('div');
            card.className = 'product-card similar-card';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.2s';
            card.style.animationDelay = `${i * 0.05}s`;

            card.onclick = (e) => {
                if (e.target.closest('.add-to-cart-btn')) return;
                if (isNavigating) return;
                isNavigating = true;

                sessionStorage.setItem('currentProduct', JSON.stringify({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    subtitle: `${product.brand} - ${product.rating} étoiles`,
                    gallery: [
                        product.image,
                        "../assets/images/img_Lap15.jpg",
                        "../assets/images/img_Lap4.jpg",
                        "../assets/images/img_Lap5.jpg"
                    ]
                }));

                window.location.reload();
            };

            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-tag tag-premium">PREMIUM</div>
                </div>
                <div class="product-info">
                    <p class="product-brand">${product.brand}</p>
                    <h3 class="product-title-card">${product.name}</h3>
                    <div class="rating-info">
                        <div class="stars-list">
                            ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
                            ${hasHalf ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
                        </div>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <div class="product-actions">
                        <span class="product-price">${product.price.toLocaleString()} FCFA</span>
                        <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            `;

            card.onmouseenter = () => card.style.transform = 'translateY(-4px)';
            card.onmouseleave = () => card.style.transform = 'translateY(0)';

            grid.appendChild(card);
        });
    }

    function renderPagination(page) {
        const container = document.getElementById('similar-pagin');
        if (!container) return;

        container.innerHTML = '';

        const prev = document.createElement('button');
        prev.className = 'page-btn';
        prev.textContent = 'Précédent';
        prev.disabled = page === 1;
        prev.onclick = () => updatePage(page - 1);
        container.appendChild(prev);

        for (let i = 1; i <= totalSimilarPages; i++) {
            const btn = document.createElement('button');
            btn.className = i === page ? 'page-num-active' : 'page-num';
            btn.textContent = i;
            btn.onclick = () => updatePage(i);
            container.appendChild(btn);
        }

        const next = document.createElement('button');
        next.className = 'page-btn';
        next.textContent = 'Suivant';
        next.disabled = page === totalSimilarPages;
        next.onclick = () => updatePage(page + 1);
        container.appendChild(next);
    }

    function updatePage(page) {
        if (page < 1 || page > totalSimilarPages) return;
        currentSimilarPage = page;
        displayProducts(page);
        renderPagination(page);
    }

    // LANCEMENT OBLIGATOIRE
    updatePage(1);

    // TEST DANS LA CONSOLE
    console.log("JS chargé - similar-grid:", document.getElementById('similar-grid'));
});