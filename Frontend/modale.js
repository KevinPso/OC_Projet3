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