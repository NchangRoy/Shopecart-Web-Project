document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ blog.js chargé - fonctionnalités du blog activées");

  // Fonctions utilitaires
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const storage = window.localStorage;

  // État des likes - BLOG SEULEMENT
  const BlogState = {
    likes: JSON.parse(storage.getItem('blogLikes')) || {}
  };

  /* 
     SYSTÈME DE LIKES - EXCLUSIVEMENT POUR LE BLOG
     --------------------------- */
  function initLikeSystem() {
    const likeButtons = qsa('.card .like-btn');
    
    console.log(`🎯 ${likeButtons.length} boutons like sur le blog`);
    
    likeButtons.forEach(btn => {
      const articleId = btn.dataset.articleId;
      
      // Initialiser l'état du bouton
      if (articleId && BlogState.likes[articleId]) {
        btn.classList.add('liked');
        updateLikeCount(btn, BlogState.likes[articleId]);
      }
      
      // Gérer le clic
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        handleBlogLike(btn, articleId);
      });
    });
  }

  function handleBlogLike(button, articleId) {
    if (!articleId) {
      console.error('❌ ID article manquant');
      return;
    }

    if (!BlogState.likes[articleId]) {
      // Ajouter like
      BlogState.likes[articleId] = 1;
      button.classList.add('liked');
      updateLikeCount(button, 1);
      showToast('❤️ Article liké sur le blog !');
    } else {
      // Retirer like
      delete BlogState.likes[articleId];
      button.classList.remove('liked');
      updateLikeCount(button, 0);
      showToast('💔 Like retiré');
    }
    
    // Sauvegarder les likes du blog
    storage.setItem('blogLikes', JSON.stringify(BlogState.likes));
  }

  function updateLikeCount(button, count) {
    let countElement = button.querySelector('.like-count');
    if (!countElement) {
      countElement = document.createElement('span');
      countElement.className = 'like-count';
      button.appendChild(countElement);
    }
    countElement.textContent = count > 0 ? count : '';
  }

  /* 
     INTERACTIONS DES CARTES
     --------------------------- */
  function initArticleCards() {
    const cards = qsa('.card');
    
    cards.forEach(card => {
      // Effet de survol
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });
    });
  }

  /* 
     NOTIFICATIONS TOAST
     --------------------------- */
  function showToast(message, duree = 3000) {
    const existingToast = qs("#__toast__");
    if (existingToast) existingToast.remove();
    
    const t = document.createElement("div");
    t.id = "__toast__";
    t.innerHTML = message;
    Object.assign(t.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      background: "rgba(0,0,0,0.9)",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      zIndex: 9999,
      fontSize: "14px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      transform: "translateY(100px)",
      opacity: "0",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    });
    
    document.body.appendChild(t);
    
    // Animation d'entrée
    setTimeout(() => {
      t.style.transform = "translateY(0)";
      t.style.opacity = "1";
    }, 10);
    
    // Animation de sortie
    setTimeout(() => {
      t.style.transform = "translateY(100px)";
      t.style.opacity = "0";
    }, duree - 300);
    
    // Suppression
    setTimeout(() => t.remove(), duree);
  }

  /* 
     INITIALISATION
     --------------------------- */
  function initBlog() {
    initLikeSystem();
    initArticleCards();
    
    console.log('🚀 Blog - Likes activés (blog seulement)');
    console.log('💾 État actuel:', BlogState.likes);
  }

  // Démarrer
  initBlog();
});