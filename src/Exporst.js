






// EXPORT CONTADORCHECKS






// EXPORT NOREPETIRTASKS

export function noRepetirTask() {
    var listaLabel = document.querySelectorAll("label");
    for (let i = 0; i < listaLabel.length; i++) {
        if (listaLabel[i].innerHTML.toUpperCase() == input.value.toUpperCase().trim()) {
            alert("Tarea Repetida: " + input.value.trim());
            return true;
        }
    }
    return false;
}





// OCULTAR TEXTO

export function ocultarTexto() {
    var listaTareas = ul.children.length;
    var noHayTareas = document.getElementById("noHayTareas");

    if (listaTareas != 0) {
        noHayTareas.classList.add("ocultar");
    } else {
        if (listaTareas == 0) {
            noHayTareas.classList.remove("ocultar");
        }
    }
}



// VARIABLES 

export var ul = document.getElementById("ulValor");

export var input = document.getElementById("input1");


// VARIABLES EXPORTS
