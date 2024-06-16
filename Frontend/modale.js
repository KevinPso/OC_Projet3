const modale = document.getElementById("modale-1")
const btnModifier = document.getElementById("btn-modifier")
const span = document.querySelector(".close");

btnModifier.addEventListener("click", (event) => {
    event.preventDefault();
    modale.style.display = 'flex';
});

span.addEventListener("click", (event) => {
    event.preventDefault();
    modale.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == modale) {
        modale.style.display = 'none';
    }
}

const authToken = sessionStorage.getItem("authToken");
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
const galleryModale = document.querySelector(".gallery-modale");


async function recupWorks(modifWorks) {
    console.log(modifWorks)
    // Vider la section galerie
        galleryModale.innerHTML = "";
    
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

            galleryModale.appendChild(figureElement);
            figureElement.appendChild(boxImage);
            boxImage.appendChild(imageElement);
            boxImage.appendChild(cadreIcone);
            cadreIcone.appendChild(iconeSuppress);

      }
    }

    recupWorks(works);  


