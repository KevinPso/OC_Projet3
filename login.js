let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let btnConnexion = document.getElementById("connexion");

btnConnexion.addEventListener("click", (event) => {
    event.preventDefault();

    let email = inputEmail.value;
    let password = inputPassword.value;

    if (!email || !password) {
        alert("Veuillez remplir les champs email et mot de passe.");
        return;
    }

    // Requête POST à l'API pour la connexion
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })

    .then((response) => {
        console.log("HTTP status: ", response.status);

    // Vérification de la réponse HTTP
        if (!response.ok) {
            if (response.status === 401) {
                alert("Mot de passe incorrect.");
            } else if (response.status === 404) {
                alert("Utilisateur non trouvé.");
            } else {
                alert("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
            throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Réponse API: ", data);

    // Vérification des données de la réponse
        if (data.userId && data.token) {
            console.log("Connexion réussie");
    // Stocker le token pour les requêtes suivantes
            const authToken = data.token;
            sessionStorage.setItem("authToken", authToken);
            window.location.href = "./index.html";
        } else {
            console.log("Connexion échouée");
            alert("Email ou mot de passe incorrect.");
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
    });
});