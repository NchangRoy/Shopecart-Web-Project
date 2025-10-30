document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ blog.js chargé - fonctionnalités activées");

  /* 
     fonctions réutilisables
     --------------------------- */
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const storage = window.localStorage;

  // Animation simple "confettis" (création d'éléments)
  function lancerConfettis(parent = document.body, nombre = 30) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < nombre; i++) {
      const p = document.createElement("span");
      p.className = "confetti-item";
      p.textContent = "🎉";
      p.style.position = "fixed";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${-5 - Math.random() * 10}vh`;
      p.style.fontSize = `${8 + Math.random() * 18}px`;
      p.style.opacity = `${0.6 + Math.random() * 0.4}`;
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.transition = `transform 2.5s linear, top 2.5s linear, opacity 2.5s`;
      frag.appendChild(p);
      // déclenchement d'un déplacement
      setTimeout(() => {
        p.style.top = `${80 + Math.random() * 30}vh`;
        p.style.transform = `translateY(20px) rotate(${Math.random()*720}deg)`;
        p.style.opacity = "0";
      }, 50);
      // suppression
      setTimeout(() => p.remove(), 3000);
    }
    parent.appendChild(frag);
  }

  // Petite notification toast
  function showToast(message, duree = 3000) {
    if (qs("#__toast__")) return; // éviter multiples
    const t = document.createElement("div");
    t.id = "__toast__";
    t.textContent = message;
    Object.assign(t.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      background: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      zIndex: 9999,
      fontSize: "14px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), duree);
  }
});