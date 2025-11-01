/* ==============================================================
   pagination-detail-disk.js - VERSION RENOUVELÉE 2025
   - PRODUITS SIMILAIRES DYNAMIQUES (50 produits de stockage)
   - REDIRECTION INSTANTANÉE AVEC SESSIONSTORAGE
   - OPTIMISÉ POUR DISQUES DURS, SSDS, NVME, EXTERNES
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    let isNavigating = false;

    /* -------------------------------------------------
       1. CHARGEMENT DU PRODUIT ACTUEL
       ------------------------------------------------- */
    const currentProductData = sessionStorage.getItem('selectedProduct');
    let product = null;

    if (currentProductData) {
        try {
            product = JSON.parse(currentProductData);
            document.title = `${product.title} | Shopcart`;
            document.querySelector('.product-title').textContent = product.title;
            document.querySelector('.product-subtitle').textContent = product.subtitle || `${product.brand} - Stockage fiable et performant`;
            document.querySelector('.main-price').textContent = product.price;
            document.querySelector('.new-tag').textContent = product.tag || 'PREMIUM';
            
            // Étoiles
            const starsDisplay = document.querySelector('.stars-list');
            if (starsDisplay && product.stars) {
                let starsHTML = '';
                for (let i = 0; i < 5; i++) {
                    starsHTML += i < product.stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                }
                starsDisplay.innerHTML = starsHTML;
            }
            
            // Note
            if (product.rating) {
                document.querySelector('.rating-text').textContent = product.rating;
            }
        } catch (e) {
            console.error("Erreur sessionStorage:", e);
        }
    }

    /* -------------------------------------------------
       2. GALERIE D'IMAGES
       ------------------------------------------------- */
    const mainImg = document.getElementById('main-image');
    const thumbnailContainer = document.querySelector('.thumbnail-row');

    if (mainImg && thumbnailContainer && product) {
        const gallery = [
            product.image,
            "../assets/images/img_disk2.png",
            "../assets/images/img_disk3.png",
            "../assets/images/img_disk4.png"
        ];
        
        mainImg.src = gallery[0];
        mainImg.alt = product.title;

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
       3. PRODUITS SIMILAIRES (100 produits)
       ------------------------------------------------- */
    const similarProducts = [
        // HDDs
        { name: "Seagate Barracuda 2TB", price: 50000, rating: 4.5, brand: "Seagate", image: "../assets/images/img_disk1.png" },
        { name: "WD Blue 1TB HDD", price: 45000, rating: 4.4, brand: "Western Digital", image: "../assets/images/img_disk2.png" },
        { name: "Toshiba Canvio Basics 4TB", price: 80000, rating: 4.6, brand: "Toshiba", image: "../assets/images/img_disk4.png" },
        { name: "Seagate IronWolf 8TB NAS", price: 150000, rating: 4.7, brand: "Seagate", image: "../assets/images/img_disk5.png" },
        { name: "Toshiba X300 6TB", price: 120000, rating: 4.5, brand: "Toshiba", image: "../assets/images/img_disk8.png" },
        { name: "Seagate Expansion 10TB", price: 200000, rating: 4.6, brand: "Seagate", image: "../assets/images/img_disk9.png" },
        { name: "WD Red Pro 4TB NAS", price: 110000, rating: 4.8, brand: "Western Digital", image: "../assets/images/img_disk10.png" },
        { name: "Toshiba P300 3TB", price: 70000, rating: 4.3, brand: "Toshiba", image: "../assets/images/img_disk12.png" },
        { name: "Seagate SkyHawk 6TB", price: 130000, rating: 4.7, brand: "Seagate", image: "../assets/images/img_disk13.png" },
        { name: "WD Purple 8TB", price: 160000, rating: 4.6, brand: "Western Digital", image: "../assets/images/img_disk14.png" },
        { name: "Toshiba N300 14TB NAS", price: 250000, rating: 4.9, brand: "Toshiba", image: "../assets/images/img_disk16.png" },
        { name: "Seagate FireCuda 2TB", price: 95000, rating: 4.5, brand: "Seagate", image: "../assets/images/img_disk1.png" },
        { name: "WD My Passport 5TB", price: 100000, rating: 4.9, brand: "Western Digital", image: "../assets/images/img_disk2.png" },
        { name: "Toshiba Canvio Advance 2TB", price: 60000, rating: 4.4, brand: "Toshiba", image: "../assets/images/img_disk4.png" },
        { name: "Seagate Backup Plus 5TB", price: 95000, rating: 4.6, brand: "Seagate", image: "../assets/images/img_disk5.png" },
        { name: "WD Elements 12TB", price: 220000, rating: 4.7, brand: "Western Digital", image: "../assets/images/img_disk6.png" },
        { name: "Toshiba MQ04 1TB", price: 40000, rating: 4.2, brand: "Toshiba", image: "../assets/images/img_disk8.png" },
        { name: "Seagate BarraCuda Pro 14TB", price: 240000, rating: 4.7, brand: "Seagate", image: "../assets/images/img_disk9.png" },
        { name: "WD Blue 8TB", price: 120000, rating: 4.4, brand: "Western Digital", image: "../assets/images/img_disk10.png" },
        { name: "Toshiba X300 PRO 20TB", price: 360000, rating: 4.6, brand: "Toshiba", image: "../assets/images/img_disk11.png" },
        
        // SSDs
        { name: "Samsung 970 EVO 500GB", price: 60000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk3.png" },
        { name: "WD Black SN850 1TB", price: 90000, rating: 4.9, brand: "Western Digital", image: "../assets/images/img_disk6.png" },
        { name: "Samsung T5 500GB", price: 70000, rating: 4.7, brand: "Samsung", image: "../assets/images/img_disk7.png" },
        { name: "Samsung 980 PRO 2TB", price: 180000, rating: 4.9, brand: "Samsung", image: "../assets/images/img_disk11.png" },
        { name: "Samsung QVO 4TB", price: 250000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk15.png" },
        { name: "Samsung T7 1TB", price: 110000, rating: 4.9, brand: "Samsung", image: "../assets/images/img_disk3.png" },
        { name: "Samsung 860 EVO 1TB", price: 85000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk7.png" },
        { name: "Samsung 870 EVO 1TB", price: 60000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk1.png" },
        { name: "Crucial MX500 2TB", price: 120000, rating: 4.7, brand: "Crucial", image: "../assets/images/img_disk2.png" },
        { name: "WD Blue SN580 1TB", price: 55000, rating: 4.6, brand: "Western Digital", image: "../assets/images/img_disk3.png" },
        { name: "Samsung 990 PRO 2TB", price: 180000, rating: 4.9, brand: "Samsung", image: "../assets/images/img_disk4.png" },
        { name: "Crucial T700 1TB", price: 100000, rating: 4.8, brand: "Crucial", image: "../assets/images/img_disk5.png" },
        { name: "SanDisk Extreme 2TB", price: 150000, rating: 4.7, brand: "SanDisk", image: "../assets/images/img_disk6.png" },
        { name: "Kingston KC3000 1TB", price: 70000, rating: 4.6, brand: "Kingston", image: "../assets/images/img_disk7.png" },
        { name: "Samsung 870 QVO 4TB", price: 240000, rating: 4.5, brand: "Samsung", image: "../assets/images/img_disk8.png" },
        { name: "Crucial P3 1TB", price: 45000, rating: 4.4, brand: "Crucial", image: "../assets/images/img_disk9.png" },
        { name: "WD Black SN850X 2TB", price: 160000, rating: 4.9, brand: "Western Digital", image: "../assets/images/img_disk10.png" },
        { name: "Samsung T9 4TB", price: 300000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk11.png" },
        { name: "Samsung 870 EVO 4TB", price: 240000, rating: 4.8, brand: "Samsung", image: "../assets/images/img_disk2.png" },
        { name: "Crucial BX500 1TB", price: 48000, rating: 4.3, brand: "Crucial", image: "../assets/images/img_disk3.png" },
        
        // Autres
        { name: "Kingston A400 960GB", price: 60000, rating: 4.2, brand: "Kingston", image: "../assets/images/img_disk5.png" },
        { name: "Crucial MX500 1TB", price: 70000, rating: 4.6, brand: "Crucial", image: "../assets/images/img_disk6.png" },
        { name: "Seagate Expansion 2TB", price: 55000, rating: 4.9, brand: "Seagate", image: "../assets/images/img_disk13.png" },
        { name: "WD Black SN7100 2TB", price: 140000, rating: 4.7, brand: "Western Digital", image: "../assets/images/img_disk4.png" },
        { name: "SK Hynix Gold P31 1TB", price: 65000, rating: 4.8, brand: "SK Hynix", image: "../assets/images/img_disk6.png" },
        { name: "MSI Spatium M480 2TB", price: 170000, rating: 4.7, brand: "MSI", image: "../assets/images/img_disk7.png" },
        { name: "Gigabyte Aorus Gen4 1TB", price: 60000, rating: 4.6, brand: "Gigabyte", image: "../assets/images/img_disk8.png" },
        { name: "Corsair MP600 Pro 4TB", price: 300000, rating: 4.8, brand: "Corsair", image: "../assets/images/img_disk9.png" },
        { name: "Sabrent Rocket 4 Plus 2TB", price: 190000, rating: 4.9, brand: "Sabrent", image: "../assets/images/img_disk10.png" },
        { name: "TeamGroup MP44 1TB", price: 55000, rating: 4.5, brand: "TeamGroup", image: "../assets/images/img_disk11.png" },
        { name: "Lexar NM800 Pro 2TB", price: 150000, rating: 4.7, brand: "Lexar", image: "../assets/images/img_disk12.png" },
        { name: "ADATA Legend 960 1TB", price: 70000, rating: 4.6, brand: "ADATA", image: "../assets/images/img_disk13.png" }
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

            const card = document.createElement('a');
            card.className = 'product-card similar-card';
            card.href = 'product_disk-detail.html';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.2s';
            card.style.animationDelay = `${i * 0.05}s`;

            card.onclick = (e) => {
                if (e.target.closest('.add-to-cart-btn')) return;
                e.preventDefault();
                
                if (isNavigating) return;
                isNavigating = true;

                sessionStorage.setItem('selectedProduct', JSON.stringify({
                    title: product.name,
                    price: `${product.price.toLocaleString()} FCFA`,
                    image: product.image,
                    subtitle: `${product.brand} - ${product.rating} étoiles`,
                    brand: product.brand,
                    rating: `(${product.rating})`,
                    tag: 'PREMIUM',
                    stars: Math.floor(product.rating)
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
        setTimeout(() => {
        grid.style.width = '100%';  // Réapplique width:100% pour forcer le resize
    }, 0);
    }

    function renderPagination(page) {
        const container = document.getElementById('similar-pagin');
        if (!container) return;

        container.innerHTML = '';

        const prev = document.createElement('button');
        prev.className = 'page-btn';
        prev.innerHTML = '<i class="fas fa-chevron-left"></i> Précédent';
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
        next.innerHTML = 'Suivant <i class="fas fa-chevron-right"></i>';
        next.disabled = page === totalSimilarPages;
        next.onclick = () => updatePage(page + 1);
        container.appendChild(next);
    }

    function updatePage(page) {
        if (page < 1 || page > totalSimilarPages) return;
        currentSimilarPage = page;
        displayProducts(page);
        renderPagination(page);
        
        // Scroll vers les produits similaires
        const section = document.querySelector('.products-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // LANCEMENT OBLIGATOIRE
    updatePage(1);

    console.log("✅ pagination-detail-disk.js chargé - Grid:", document.getElementById('similar-grid'));
});