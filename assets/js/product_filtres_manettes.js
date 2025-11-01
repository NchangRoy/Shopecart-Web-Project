document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('#products-for-you-grid .product-card');
    const filterDropdownLinks = document.querySelectorAll('.tag-buttons-group .dropdown-content a');
    const allFiltersButton = document.querySelector('.filter-button.primary-filter');
    const filterNone = document.getElementById('none'); // Utilisé pour fermer le dropdown après clic

    let activeFilters = {
        price: null,
        brand: null,
        rating: null
    };

    const applyFilters = () => {
        let matchingCards = [];
        
        productCards.forEach(card => {
            let matches = true;

            const brand = card.dataset.brand ? card.dataset.brand.toLowerCase() : '';
            const price = parseFloat(card.dataset.priceRaw) || 0;
            const rating = parseFloat(card.dataset.ratingRaw) || 0;

            // 1. Filtrage par Marque
            if (activeFilters.brand) {
                const filterBrandNormalized = activeFilters.brand.toLowerCase();
                if (!brand.includes(filterBrandNormalized)) {
                    matches = false;
                }
            }

            // 2. Filtrage par Prix
            if (matches && activeFilters.price) {
                const [minStr, maxStr] = activeFilters.price.split('-');
                const minPrice = parseFloat(minStr);
                const maxPrice = maxStr === '+' ? Infinity : parseFloat(maxStr);

                if (price < minPrice || price > maxPrice) {
                    matches = false;
                }
            }

            // 3. Filtrage par Note (LOGIQUE STRICTE)
            if (matches && activeFilters.rating) {
                const minRating = parseFloat(activeFilters.rating);

                // Détermine la fourchette stricte
                let lowerBound, upperBound;
                
                if (minRating === 5) {
                    // Pour 5.0, on veut [4.75, 5.1] (souvent 4.8, 4.9, 5.0)
                    lowerBound = 4.75;
                    upperBound = 5.1; // Pour inclure 5.0 exact
                } else if (minRating === 4.5) {
                    // Pour 4.5, on veut [4.25, 4.75[
                    lowerBound = 4.25;
                    upperBound = 4.75; 
                } else {
                    // Pour 4, 3, 2, 1 (strict sur l'entier/demi-étoile) : [N.0, N.5[
                    lowerBound = minRating;
                    upperBound = minRating + 0.5;
                }
                
                if (rating < lowerBound || rating >= upperBound) {
                    matches = false;
                }
            }
            
            // Masquer/Afficher l'élément
            if (matches) {
                matchingCards.push(card);
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
            
            // Applique le style pour masquer/afficher
            card.style.display = matches ? '' : 'none';
        });
        
        // Optionnel : Afficher un message si aucun produit ne correspond
        const productGrid = document.getElementById('products-for-you-grid');
        let noResultsMessage = productGrid.querySelector('.no-results-message');
        
        if (matchingCards.length === 0) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.classList.add('no-results-message');
                noResultsMessage.textContent = "Aucun produit ne correspond à ces critères de filtre.";
                productGrid.appendChild(noResultsMessage);
            }
            noResultsMessage.style.display = '';
        } else {
            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        }
    };

   
    const resetFilters = () => {
        activeFilters = { price: null, brand: null, rating: null };
        productCards.forEach(card => {
            card.style.display = ''; // Réinitialiser l'affichage
            card.classList.remove('filtered-out');
        });
        
        const noResultsMessage = document.querySelector('#products-for-you-grid .no-results-message');
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }

        filterNone.checked = true; 
    };

    // --- Écouteurs d'Événements ---

    filterDropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Identifie le type de filtre et met à jour l'état (avec désactivation des autres catégories)
            const dataAttributes = e.currentTarget.dataset;
            
            // Un seul filtre est actif à la fois (marque, prix ou note)
            activeFilters.price = dataAttributes.price || null;
            activeFilters.brand = dataAttributes.brand || null;
            activeFilters.rating = dataAttributes.rating || null;
            
            applyFilters();

            // Fermer le dropdown
            filterNone.checked = true;
        });
    });

    // Gérer le bouton "Tous les filtres" pour réinitialiser
    allFiltersButton.addEventListener('click', () => {
        resetFilters();
    });
});