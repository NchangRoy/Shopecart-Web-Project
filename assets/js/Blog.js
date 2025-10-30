document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ blog.js chargé - fonctionnalités activées");

  /* 
     Fonctions réutilisables
     --------------------------- */
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const storage = window.localStorage;

  /* 
     Gestionnaire d'état global
     --------------------------- */
  const AppState = {
    newsletterSubscribers: JSON.parse(storage.getItem('newsletterSubscribers')) || [],
    readArticles: JSON.parse(storage.getItem('readArticles')) || [],
    likes: JSON.parse(storage.getItem('articleLikes')) || {},
    readingProgress: {}
  };

  /* 
     Système de Likes pour Articles
     --------------------------- */
  function initLikeSystem() {
    const likeButtons = qsa('.like-btn');
    
    likeButtons.forEach(btn => {
      const articleId = btn.dataset.articleId;
      if (AppState.likes[articleId]) {
        btn.classList.add('liked');
        updateLikeCount(btn, AppState.likes[articleId]);
      }
      
      btn.addEventListener('click', () => toggleLike(btn, articleId));
    });
  }

  function toggleLike(button, articleId) {
    if (!AppState.likes[articleId]) {
      // Nouveau like
      AppState.likes[articleId] = 1;
      button.classList.add('liked');
      updateLikeCount(button, 1);
      lancerConfettis(button.parentElement, 15);
      showToast('❤️ Article ajouté à vos favoris !');
    } else {
      // Retirer le like
      delete AppState.likes[articleId];
      button.classList.remove('liked');
      updateLikeCount(button, 0);
      showToast('💔 Like retiré');
    }
    
    storage.setItem('articleLikes', JSON.stringify(AppState.likes));
  }

  function updateLikeCount(button, count) {
    const countElement = button.querySelector('.like-count') || document.createElement('span');
    if (!button.contains(countElement)) {
      countElement.className = 'like-count';
      button.appendChild(countElement);
    }
    countElement.textContent = count > 0 ? count : '';
  }

 
  /* 
     Animations et Effets Visuels
     --------------------------- */
  function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }

  // Animation simple "confettis" (création d'éléments)
  function lancerConfettis(parent = document.body, nombre = 30) {
    const frag = document.createDocumentFragment();
    const emojis = ['🎉', '✨', '🌟', '🎊', '🥳', '👍', '❤️', '🔥'];
    
    for (let i = 0; i < nombre; i++) {
      const p = document.createElement("span");
      p.className = "confetti-item";
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.position = "fixed";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${-5 - Math.random() * 10}vh`;
      p.style.fontSize = `${8 + Math.random() * 18}px`;
      p.style.opacity = `${0.6 + Math.random() * 0.4}`;
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.transition = `transform 2.5s cubic-bezier(0.1, 0.8, 0.3, 1), top 2.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 2.5s`;
      p.style.zIndex = "10000";
      frag.appendChild(p);
      
      // déclenchement d'un déplacement
      setTimeout(() => {
        p.style.top = `${80 + Math.random() * 30}vh`;
        p.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random()*720}deg)`;
        p.style.opacity = "0";
      }, 50);
      
      // suppression
      setTimeout(() => p.remove(), 3000);
    }
    parent.appendChild(frag);
  }

  // Petite notification toast
  function showToast(message, duree = 3000) {
    // Éviter les doublons
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
     Initialisation
     --------------------------- */
  function init() {
    initLikeSystem();
    
    console.log('les fonctionnalités sont initialisées');
  }

  // Démarrer l'application
  init();
});