// ✅ Récupérer l'utilisateur connecté
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

// ✅ Si aucun utilisateur n'est connecté → redirection vers login
//if (!currentUser) {
    //alert("Vous devez d'abord vous connecter !");
    //window.location.href = "login.html"; // change si ton fichier login a un autre nom
//}

// ✅ Pré-remplir les champs du formulaire avec les données de l'utilisateur
window.onload = () => {
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
    document.getElementById("phone").value = currentUser.phone || "";
    document.getElementById("address").value = currentUser.address || "";
};

// ✅ Enregistrer les modifications du profil
function saveProfile() {
    let updatedUser = {
        ...currentUser,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    // ✅ Remplacer l'ancien user dans la liste users
    users = users.map(user => 
        user.email === currentUser.email ? updatedUser : user
    );

    // ✅ Sauvegarder dans localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    alert("✅ Profil mis à jour avec succès !");
}

// ✅ Modifier le mot de passe
function updatePassword() {
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Vérifications
    if (oldPassword !== currentUser.password) {
        alert("❌ Ancien mot de passe incorrect !");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("❌ Les mots de passe ne correspondent pas !");
        return;
    }

    // ✅ Mettre à jour le mot de passe
    currentUser.password = newPassword;
    users = users.map(user => 
        user.email === currentUser.email ? currentUser : user
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert("✅ Mot de passe changé avec succès !");
}
