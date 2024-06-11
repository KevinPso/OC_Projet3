
// Récupération des travaux depuis l'API
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Ciblage de la classe gallery sur le document html
const gallerySection = document.querySelector(".gallery");

// Creation de la fonction asynchrone pour recuperer récupérer et afficher les travaux
export async function recupWorks(filteredWorks = works) {

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
  recupWorks();  


// Ajout des écouteurs d'événements pour les filtres
const filtreTous = document.getElementById("filtre-tous");
// Affichage de tous les elements
  filtreTous.addEventListener("click", function () {
    recupWorks();  
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
