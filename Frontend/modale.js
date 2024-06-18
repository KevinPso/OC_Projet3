// Gestion de l'affichage de la modale
const modale = document.getElementById("modale-1")

const btnModifier = document.getElementById("btn-modifier")
btnModifier.addEventListener("click", (event) => {
    event.preventDefault();
    modale.style.display = 'flex';
});

// Gestion de la fermeture de la modale si click a l'exterieur
window.onclick = function(event) {
    if (event.target == modale) {
        modale.style.display = 'none';
        reloadGallery();
    }
}

// Fonction pour actualiser la section Gallery
async function reloadGallery() {
    const reload = await fetch("http://localhost:5678/api/works").then(works => works.json());
    const gallerySection = document.querySelector(".gallery");
    gallerySection.innerHTML = "";

    for (let i = 0; i < reload.length; i++) {
        const work = reload[i];
    
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

// Fonction pour la creation du menu initial de la modale : Galerie Photo
async function init() {
    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    const contenuModale = document.querySelector(".contenu-modale");
    contenuModale.appendChild(span);
    span.addEventListener("click", (event) => {
        event.preventDefault();
        modale.style.display = 'none';
        reloadGallery();
    }); 

    const galleryModale = document.createElement("div");
    galleryModale.classList.add("gallery-modale");
    contenuModale.appendChild(galleryModale);

    const separation = document.createElement("div");
    separation.classList.add("separation");
    contenuModale.appendChild(separation);

    const btnAjouter = document.createElement("button");
    btnAjouter.id = 'btn-ajouter';
    btnAjouter.textContent = "Ajouter une Photo";
    contenuModale.appendChild(btnAjouter);

    const titreModale = document.createElement("div");
    titreModale.classList.add("titre-modale");

    const galeriePhoto = document.createElement("h3");
    galeriePhoto.textContent = "Galerie Photo";

    titreModale.appendChild(galeriePhoto);
    contenuModale.insertBefore(titreModale, galleryModale);
}
// Premiere execution de la fonction
init();

// Recuperation des travaux sur l'API
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Fonction pour recuperer les travaux et les afficher sur la modale
async function recupWorks(modifWorks) {
    const galleryModale = document.querySelector(".gallery-modale");
    const authToken = sessionStorage.getItem("authToken");
    console.log(modifWorks)
    
        //Boucle for pour creer chaque element dans gallery
        for (let i = 0; i < modifWorks.length; i++) {
            const work = modifWorks[i];

            const figureElement = document.createElement("figure");
        
            const boxImage = document.createElement("div");
            boxImage.classList.add("image-modale");

            const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;

            const cadreIcone = document.createElement("div");
            cadreIcone.classList.add("cadre-icone");

            const iconeSuppress = document.createElement("i")
            iconeSuppress.classList.add("fa-solid", "fa-trash-can", "fa-xs");
        
            iconeSuppress.addEventListener("click", async () => {
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        }
                    });
    
                    if (response.ok) {
                        console.log(`Work ID ${work.id} deleted`);
                        // Actualisation des images disponibles après suppression
                        const updatedWorks = await fetch("http://localhost:5678/api/works").then(works => works.json());
                        galleryModale.innerHTML = "";
                        recupWorks(updatedWorks);
                    } else {
                        console.error(`Failed to delete work ID ${work.id}`);
                    }
                } catch (error) {
                    console.error(`Error deleting work ID ${work.id}:`, error);
                }
            });

            galleryModale.appendChild(figureElement);
            figureElement.appendChild(boxImage);
            boxImage.appendChild(imageElement);
            boxImage.appendChild(cadreIcone);
            cadreIcone.appendChild(iconeSuppress);
      }
    }
// Premiere execution de la fonction
recupWorks(works);  


// Fonction pour gerer le bouton Ajouter
async function btnAjouter() {
    const btnAjouter = document.getElementById("btn-ajouter")
    const contenuModale = document.querySelector(".contenu-modale");
    
    btnAjouter.addEventListener("click", (event) => {
        event.preventDefault();
        contenuModale.innerHTML = "";
        init();
        ajouterWorks(works)
    });
}
btnAjouter()


// Fonction pour ajouter de nouveaux travaux sur l'API
async function ajouterWorks() {
    
    const contenuModale = document.querySelector(".contenu-modale");

    // Suppression du menu precedent
    const delTitle = document.querySelector(".titre-modale");
    delTitle.style.display = 'none';

    const delSeparation = document.querySelector(".separation");
    delSeparation.style.display = 'none';

    const delBtn = document.getElementById("btn-ajouter");
    delBtn.style.display = 'none';

    const delGalery = document.querySelector(".gallery-modale");
    delGalery.classList.remove("gallery-modale");

    // Ajout des nouveaux elements
    const titreModale2 = document.createElement("div");
    titreModale2.classList.add("titre-modale");
    
    const ajoutPhoto = document.createElement("h3");
    ajoutPhoto.textContent = "Ajout Photo";

    titreModale2.appendChild(ajoutPhoto);
    contenuModale.appendChild(titreModale2);

    // Configuration de l'icone 'precedent'
    const iconeBack = document.createElement("i")
    iconeBack.classList.add("fa-solid", "fa-arrow-left", "fa-xl");
    contenuModale.appendChild(iconeBack);
    iconeBack.addEventListener("click", async () => {
        contenuModale.innerHTML = "";
        const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
        init();
        recupWorks(works);
        btnAjouter()
    });
   
    // Reprise du Span avec rechargement de la Galerie
    const spanClose = document.createElement("span");
    spanClose.classList.add("close");
    spanClose.innerHTML = "&times;";
    spanClose.addEventListener("click", () => {
        modale.style.display = 'none';
        reloadGallery();
    });
    contenuModale.appendChild(spanClose);

    // Mise en place du Formulaire pour importer une image avec son titre et choix de la categorie
    const form = document.createElement("form");

    const boxFichier = document.createElement("div");
    boxFichier.classList.add("box-fichier");
    form.appendChild(boxFichier);

    const iconeImage = document.createElement("i")
    iconeImage.classList.add("fa-regular", "fa-image", "fa-xl");
    boxFichier.appendChild(iconeImage);

    const input = document.createElement("input");
    input.type = "file";
    input.id = 'fileInput';
    input.classList.add("btn-ajout-photo");

    input.addEventListener('change', function(event) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.textContent = "";
      
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
      
          reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function() {
              imagePreview.innerHTML = "";
              imagePreview.appendChild(image);
            
            };
            input.style.display = 'none';
          };
      
          reader.readAsDataURL(event.target.files[0]);
        }
      });

    boxFichier.appendChild(input);

    const ajouterPhoto = document.createElement("p");
    ajouterPhoto.classList.add("ajouter-photo");
    ajouterPhoto.textContent = "+ Ajouter Photo"
    boxFichier.appendChild(ajouterPhoto);

    const descriptionFichier = document.createElement("p");
    descriptionFichier.classList.add("description-fichier");
    descriptionFichier.textContent = "jpg, png : 4mo max"
    boxFichier.appendChild(descriptionFichier);

    const imagePreview = document.createElement("div");
    imagePreview.classList.add("image-preview");
    imagePreview.id = 'imagePreview';
    boxFichier.appendChild(imagePreview);

    const labelTitre = document.createElement("label");
    labelTitre.textContent = "Titre";
    form.appendChild(labelTitre);

    const inputTitre = document.createElement("input");
    inputTitre.type = "text";
    form.appendChild(inputTitre);

    const labelCategorie = document.createElement("label");
    labelCategorie.textContent = "Categorie";
    form.appendChild(labelCategorie);

    const inputCategorie = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = 1;
    option1.textContent = "Objets";
    const option2 = document.createElement("option");
    option2.value = 2;
    option2.textContent = "Appartements";
    const option3 = document.createElement("option");
    option3.value = 3;
    option3.textContent = "Hotels & Restaurants";

    inputCategorie.appendChild(option1);
    inputCategorie.appendChild(option2);
    inputCategorie.appendChild(option3);
    form.appendChild(inputCategorie);

    const separation = document.createElement("div");
    separation.classList.add("separation");
    form.appendChild(separation);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Valider";
    submitButton.id = 'btn-valider';
    form.appendChild(submitButton);

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Récupération des valeurs du formulaire
        const titre = inputTitre.value;
        const categorie = inputCategorie.value;
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        // Vérification si un fichier est sélectionné
        if (!file || !titre || !categorie) {
            alert("Veuillez remplir tous les champs et sélectionner un fichier.");
            return;
        }

        // Préparation des données à envoyer à l'API en utilisant FormData
        const formData = new FormData();
        const authToken = sessionStorage.getItem("authToken");
        formData.append('image', file); // Ajoute l'image en tant que fichier
        formData.append('title', titre); // Ajoute le titre
        formData.append('category', categorie); // Ajoute la catégorie

        try {
            // Envoi des données à l'API
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi des données à l\'API.');
            }

        } catch (error) {
            console.error('Erreur:', error);
        }

        contenuModale.innerHTML = "";
        init();
        const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
        recupWorks(works);  
        btnAjouter()
    });

    contenuModale.appendChild(form);
}