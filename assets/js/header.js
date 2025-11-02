// JavaScript pour gérer le menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('overlay');
  const searchBar = document.getElementById('searchBar');
  const userActions = document.getElementById('userActions');
  const categoriesLabel = document.getElementById('categoriesLabel');
  const dropdownContent = document.getElementById('dropdownContent');
  const accountButton = document.getElementById('accountButton');
  const loginButton = document.getElementById('loginButton');

  // Met à jour le badge et les boutons utilisateur
  updateCartBadge();
  updateUserButtons();

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
      closeMobileMenu();
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
        closeMobileMenu();
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

  // Fonction pour fermer le menu mobile
  function closeMobileMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    searchBar.classList.remove('active');
    userActions.classList.remove('active');
    hamburger.classList.remove('active');
    if (dropdownContent) dropdownContent.classList.remove('active');
  }

  // Écouter les changements de localStorage pour mettre à jour les boutons
  window.addEventListener('storage', function(e) {
    if (e.key === 'user') {
      updateUserButtons();
    }
  });
});

let cartData = null;
const CART_STORAGE_KEY = 'shopcart_cart';
const USER_STORAGE_KEY = 'user';

/**
 * Met à jour les boutons utilisateur selon l'état de connexion
 */
function updateUserButtons() {
  const accountButton = document.getElementById('accountButton');
  const loginButton = document.getElementById('loginButton');
  
  if (!accountButton || !loginButton) return;

  const user = localStorage.getItem(USER_STORAGE_KEY);
  
  if (user) {
    // Utilisateur connecté
    accountButton.style.display = 'flex';
    loginButton.style.display = 'none';
  } else {
    // Utilisateur non connecté
    accountButton.style.display = 'none';
    loginButton.style.display = 'flex';
  }
}

/**
 * Met à jour le badge du panier dans le header
 */
function updateCartBadge() {
  // Charger les données du panier pour compter le nombre d'éléments
  loadCartData();
  
  const cartBadge = document.querySelector('.cart-count');
  
  if (!cartBadge) {
    console.warn('⚠️ Badge du panier introuvable');
    return;
  }
  
  if (!cartData || !cartData.cart_items || cartData.cart_items.length === 0) {
    cartBadge.textContent = '0';
    return;
  }
  
  const totalItems = cartData.cart_items.reduce((sum, item) => sum + item.quantite, 0);
  cartBadge.textContent = totalItems;
}

/**
 * Charge les données du panier depuis localStorage ou JSON
 */
async function loadCartData() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    
    if (savedCart) {
      console.log('📦 Chargement depuis localStorage');
      cartData = JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement:', error);
    showError('Impossible de charger le panier. Veuillez réactualiser la page.');
  }
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
  console.error(message);
}