document.addEventListener('DOMContentLoaded', () => {
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  passwordInputs.forEach(passwordInput => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('password-wrapper');
    
    passwordInput.parentNode.insertBefore(wrapper, passwordInput);
    wrapper.appendChild(passwordInput);

    const toggleIcon = document.createElement('i');
    toggleIcon.classList.add('fas', 'fa-eye', 'password-toggle-icon');
    
    wrapper.appendChild(toggleIcon);

    toggleIcon.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      toggleIcon.classList.toggle('fa-eye-slash');
    });
  });

  // --- Form Submission and Local Storage ---
  const form = document.querySelector('.login-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = form.querySelector('input[name="login"]');
      const nameInput = form.querySelector('input[name="username"]');
      const passwordInput = form.querySelector('input[name="password"]');
      const confirmPasswordInput = form.querySelector('input[name="confirm_password"]');

      if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
      const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      };
      localStorage.setItem('user', JSON.stringify(userData));
      alert('Compte créé avec succès! Vous allez être redirigé vers la page de connexion.');
      form.reset();
      window.location.href = 'login.html';
    });
  }
});
