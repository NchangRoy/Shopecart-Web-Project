// JavaScript pour gérer le menu mobile
    document.addEventListener('DOMContentLoaded', function() {
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('navLinks');
      const overlay = document.getElementById('overlay');
      const searchBar = document.getElementById('searchBar');
      const userActions = document.getElementById('userActions');
      const categoriesLabel = document.querySelector('.categories-label');
      const dropdownContent = document.querySelector('.dropdown-content');

      // Toggle menu mobile
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        searchBar.classList.toggle('active');
        userActions.classList.toggle('active');
        hamburger.classList.toggle('active');
      });

      // Fermer le menu en cliquant sur l'overlay
      overlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        searchBar.classList.remove('active');
        userActions.classList.remove('active');
        hamburger.classList.remove('active');
        dropdownContent.classList.remove('active');
      });

      // Toggle dropdown des catégories sur mobile
      if (categoriesLabel) {
        categoriesLabel.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownContent.classList.toggle('active');
          }
        });
      }

      // Fermer le menu en cliquant sur un lien
      const navItems = document.querySelectorAll('.nav-links a[href]:not(.categories-label)');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            searchBar.classList.remove('active');
            userActions.classList.remove('active');
            hamburger.classList.remove('active');
            dropdownContent.classList.remove('active');
          }
        });
      });
    });