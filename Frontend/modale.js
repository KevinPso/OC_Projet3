const modale = document.getElementById("modale-1")

const btnModifier = document.getElementById("btn-modifier")
btnModifier.addEventListener("click", (event) => {
    event.preventDefault();
    modale.style.display = 'flex';
});

window.onclick = function(event) {
    if (event.target == modale) {
        modale.style.display = 'none';
    }
}


async function init() {
    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    const contenuModale = document.querySelector(".contenu-modale");
    contenuModale.appendChild(span);
    span.addEventListener("click", (event) => {
        event.preventDefault();
        modale.style.display = 'none';
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
init()


const works = await fetch("http://localhost:5678/api/works").then(works => works.json());


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
                        // Recharger les images disponibles après suppression
                        const updatedWorks = await fetch("http://localhost:5678/api/works").then(works => works.json());
                        recupWorks(updatedWorks);
                    } else {
                        console.error(`Failed to delete work ID ${work.id}`);
                    }
                } catch (error) {
                    console.error(`Error deleting work ID ${work.id}:`, error);
                }
            });

            const galleryModale = document.querySelector(".gallery-modale");

            galleryModale.appendChild(figureElement);
            figureElement.appendChild(boxImage);
            boxImage.appendChild(imageElement);
            boxImage.appendChild(cadreIcone);
            cadreIcone.appendChild(iconeSuppress);
      }
    }
recupWorks(works);  


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
   
    // Reprise du Span
    const spanClose = document.createElement("span");
    spanClose.classList.add("close");
    spanClose.innerHTML = "&times;";
    spanClose.addEventListener("click", () => {
        modale.style.display = 'none';
    });
    contenuModale.appendChild(spanClose);

    // Mise en place du Formulaire
    const form = document.createElement("form");

    const boxFichier = document.createElement("div");
    boxFichier.classList.add("box-fichier");
    form.appendChild(boxFichier);

    const iconeImage = document.createElement("i")
    iconeImage.classList.add("fa-regular", "fa-image", "fa-xl");
    form.appendChild(iconeImage);

    const input = document.createElement("input");
    input.type = "file";
    input.classList.add("btn-ajout-photo");
    form.appendChild(input);

    const descriptionFichier = document.createElement("p");
    descriptionFichier.classList.add("description-fichier");
    form.appendChild(descriptionFichier);

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
    option1.value = "categorie1";
    option1.textContent = "Objets";
    const option2 = document.createElement("option");
    option2.value = "categorie2";
    option2.textContent = "Appartements";
    const option3 = document.createElement("option");
    option3.value = "categorie3";
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

    contenuModale.appendChild(form);
}


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

