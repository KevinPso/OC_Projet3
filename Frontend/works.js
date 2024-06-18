
// Récupération des travaux depuis l'API
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Ciblage de la classe gallery sur le document html
const gallerySection = document.querySelector(".gallery");

// Creation de la fonction asynchrone pour recuperer et afficher les travaux
async function recupWorks(filteredWorks) {
console.log(filteredWorks)

// Vider la section galerie
    gallerySection.innerHTML = "";

//Boucle for pour creer chaque element dans gallery
    for (let i = 0; i < filteredWorks.length; i++) {
    const work = filteredWorks[i];

    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
  
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;
  
    gallerySection.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
  }
}

// Exécution initiale de la fonction avec tous les travaux
  recupWorks(works);  


// Ajout des écouteurs d'événements pour chaque filtre
const filtreTous = document.getElementById("filtre-tous");

// Affichage de tous les elements
  filtreTous.addEventListener("click", function () {
    recupWorks(works);  
  });

const filtreObjets = document.getElementById("filtre-objets");

// Tri en fonction des categoryId
filtreObjets.addEventListener("click", function () {
    const workObjet = works.filter(function (works) {
        return works.categoryId === 1;
    });
    console.log(workObjet)
    recupWorks(workObjet);
});

const filtreAppart = document.getElementById("filtre-appart");
  filtreAppart.addEventListener("click", function (work) {
    const workAppart = works.filter(function (works) {
        return works.categoryId === 2;
    });
    console.log(workAppart)
    recupWorks(workAppart);
  });

const filtreHotel = document.getElementById("filtre-hotel");
  filtreHotel.addEventListener("click", function (work) {
    const workHotel = works.filter(function (works) {
        return works.categoryId === 3;
    });
    console.log(workHotel)
    recupWorks(workHotel);
  });


// Récupérer le token d'authentification depuis sessionStorage
const authToken = sessionStorage.getItem("authToken");

document.getElementById("btn-logout").addEventListener("click", function (event) {
    sessionStorage.removeItem("authToken");
    console.log("Utilisateur authentifié. Token:", authToken);
});

// Vérifier si le token est present
if (authToken) {
    console.log("Utilisateur authentifié. Token:", authToken);

// Afficher les éléments spécifiques à l'administrateur si le Token est present
    const adminControls = document.querySelector('.admin-controls');

    if (adminControls) {
        adminControls.style.display = 'block';
    }

    const adminBanner = document.querySelector('.admin-banner');
    if (adminBanner) {
        adminBanner.style.display = 'block';
    }

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.style.display = 'block';
    }

} else {
// Si le token n'est pas present dans le sessionStorage, on affiche le bouton Login, les filtres et le formulaire de contact 
    const btnLogin = document.getElementById("btn-login");
    if (btnLogin) {
        btnLogin.style.display = 'block';
    }

    const btnFiltres = document.getElementById("cache-filtre");
    if (btnFiltres) {
        btnFiltres.style.display = 'block';
    }
    
    const contactForm = document.getElementById("contact");
    if (contactForm) {
        contactForm.style.display = 'block';
    }
}

