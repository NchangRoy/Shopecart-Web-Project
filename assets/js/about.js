document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form form");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // empêche le rechargement de la page

        // Récupération des champs
        const name = form.querySelector('input[placeholder="Votre Nom"]').value.trim();
        const email = form.querySelector('input[placeholder="Votre Email"]').value.trim();
        const subject = form.querySelector('input[placeholder="Sujet"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        // Vérification des champs
        if (!name || !email || !message) {
            showNotification("❌ Veuillez remplir tous les champs obligatoires.", "error");
            return;
        }

        // Simulation d’envoi (avec une petite attente)
        showNotification("⏳ Envoi en cours...", "info");

        setTimeout(() => {
            showNotification(`✅ Merci ${name} ! Votre message a été envoyé avec succès.`, "success");
            form.reset(); // réinitialise les champs
        }, 2000);
    });

    // Fonction d’affichage des notifications
    function showNotification(message, type) {
        // Supprime les notifications existantes
        const existing = document.querySelector(".notification");
        if (existing) existing.remove();

        const notif = document.createElement("div");
        notif.classList.add("notification", type);
        notif.textContent = message;
        document.body.appendChild(notif);

        // Disparaît après 4 secondes
        setTimeout(() => notif.remove(), 4000);
    }
});