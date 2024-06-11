

// Creation de la fonction asynchrone pour recuperer les Travaux
async function recupWorks() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Ciblage de la classe gallery sur le document html
    const gallerySection = document.querySelector(".gallery");

//Boucle for pour creer chaque element dans gallery
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

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

// Execution de la fonction
  recupWorks(); 