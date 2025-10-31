// JavaScript pour gérer le menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('overlay');
  const searchBar = document.getElementById('searchBar');
  const userActions = document.getElementById('userActions');
  const categoriesLabel = document.querySelector('.categories-dropdown label');
  const dropdownContent = document.querySelector('.dropdown-content');

  //mets à jour le badge
  updateCartBadge()

  // Toggle menu mobile
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      searchBar.classList.toggle('active');
      userActions.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Fermer le menu en cliquant sur l'overlay
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      searchBar.classList.remove('active');
      userActions.classList.remove('active');
      hamburger.classList.remove('active');
      if (dropdownContent) dropdownContent.classList.remove('active');
    });
  }

  // Toggle dropdown des catégories sur mobile
  if (categoriesLabel) {
    categoriesLabel.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        if (dropdownContent) {
          dropdownContent.classList.toggle('active');
        }
      }
    });
  }

  // Fermer le menu en cliquant sur un lien
  const navItems = document.querySelectorAll('.nav-links a:not(.categories-dropdown label)');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        searchBar.classList.remove('active');
        userActions.classList.remove('active');
        hamburger.classList.remove('active');
        if (dropdownContent) dropdownContent.classList.remove('active');
      }
    });
  });

  // Fermer le dropdown si on clique en dehors
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && dropdownContent && dropdownContent.classList.contains('active')) {
      if (!e.target.closest('.categories-dropdown')) {
        dropdownContent.classList.remove('active');
      }
    }
  });
});

let cartData = null; // Stocke les données du panier

/**
 * Met à jour le badge du panier dans le header
 */
function updateCartBadge() {
    // Utiliser la classe 'cart-count' au lieu d'un ID
    const cartBadge = document.querySelector('.cart-count');
    
    // Vérifier que l'élément existe
    if (!cartBadge) {
        console.warn('⚠️ Badge du panier introuvable');
        return;
    }
    
    if (!cartData || !cartData.cart_items || cartData.cart_items.length === 0) {
        cartBadge.textContent = '0';
        return;
    }
    
    // Compter le nombre total d'articles
    const totalItems = cartData.cart_items.reduce((sum, item) => sum + item.quantite, 0);
    cartBadge.textContent = totalItems;
}