// IMPORT DE MIS EXPORTS

import { noRepetirTask, ocultarTexto, ul, input } from "./Exporst.js";

// IMPORT DE MIS VARIABLES



// IMPORT DE LAS APIS-DIVS

import { postTareas, marcarTarea, borrarTarea, obtenerTareas, borrarTareaServer, buscarTareas } from "./divisionesAPI.js";

// FIN DE IMPORTS


// GET TAREAS

// var getTasks = await obtenerTareas()

// console.log("Hola Mundo", getTasks);

// DELETE TAREAS
// AGARRE TODAS LAS TAREAS DEL GET LAS RECORRA CON UN FOR DARLE UNA  (IF) SI LA FUNCION QUE LE DOY GET.TASK = LI PARAMETRO  LI.TEXTCONTENT


// var resultadoEliminar = await borrarTarea()

// console.log("ELIMINO", resultadoEliminar)




// POST TAREAS


// var postT = await postTareas("sacar al gato");
// console.log(postT)


// PUT TAREAS

// var putTarea = await marcarTarea(true);
// console.log(putTarea);

// TAREAS CHECK

// function agregarAyuda(){




// }



// TAREAS INICIALES

var listaTareasGlobal = [];

async function crearTareasIniciales() {
    listaTareasGlobal = await obtenerTareas();
    console.log("Mi lista al iniciar la aplicacion", listaTareasGlobal)

    for (let indiceTareas = 0; indiceTareas < listaTareasGlobal.length; indiceTareas++) {
        const tarea = listaTareasGlobal[indiceTareas];
        const textTarea = tarea.task;
        agregarTarea(textTarea, tarea.id, tarea.check);

    }
    contadorChecks();
}


// VARIABLES DE MI CODIGO

var button = document.querySelector(".btn");

var contenedorCero = document.getElementById("contedorCero");

var botonBuscar = document.getElementById("search-btn");
var inputBuscar = document.getElementById("search");

inputBuscar.addEventListener("keyup", buscarPorTeclado);



// INICO DE MI CODIGO   


async function tareaEvento(e) {
    e.preventDefault();
    var textoTarea = input.value.trim();

    var respuestaAgregar = await postTareas(textoTarea)
    listaTareasGlobal = [...respuestaAgregar]
    var ultimaTarea = respuestaAgregar.pop()

    const idTarea = ultimaTarea.id;
    const checkTarea = ultimaTarea.check;

    agregarTarea(textoTarea, idTarea, checkTarea);

}



button.addEventListener("click", tareaEvento)

function agregarTarea(textoTarea, idTarea, checkTarea) {
    if (textoTarea.trimStart() == "" || textoTarea.trimEnd() == "") {
        alert("Agregue Tarea");
        return false;
        // basurero.style.display = "none";
    } else if (noRepetirTask()) {

    } else {
        var text = textoTarea;

        var check = document.createElement("input");
        check.type = "checkbox";
        check.className = "checkbox";
        check.checked = checkTarea;
        check.id = idTarea

        var labelCheck = document.createElement("label");
        labelCheck.classList.add("checkContainer");

        var divCheck = document.createElement("div")
        divCheck.classList.add("checkmark");

        labelCheck.appendChild(check)
        labelCheck.appendChild(divCheck)

        const li = document.createElement("li");
        li.classList.add("liValor");

        var label = document.createElement("label");
        label.textContent = text;

        li.appendChild(labelCheck);
        li.appendChild(label);
        li.appendChild(addDeleteBtn());
        ulValor.appendChild(li);

        check.addEventListener("change", (evento) => {
            contadorChecks(evento)
            var miCheck = evento.target;
            marcarTarea(miCheck.checked, miCheck.id)
        });
        ocultarTexto()

        input.value = "";
        input.focus();
        // ocultar.style.display = "none";



    }
};


// BOTON DE ELIMINAR

function addDeleteBtn() {
    var deleteBtn = document.createElement("button");
    var span = document.createElement("span");

    deleteBtn.className = "btn-delete";
    span.textContent = "Delete"

    deleteBtn.appendChild(span)

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        var item = e.currentTarget.parentElement;
        console.log(item)

        ul.removeChild(item);

        borrarTareaServer(item.textContent);
        contadorChecks();
        ocultarTexto()
    });
    contadorChecks();
    input.addEventListener("click", function () {
        contadorChecks();
    });
    return deleteBtn;
};

function borrador() {
    var items = document.querySelector(span);
    if (items.length === 0) {
        empty.style.display = "block";
    }
};



//  CONTADOR 

function contadorChecks() {
    var contadorChecks = 0;
    var listaChecks = document.querySelectorAll("input[type='checkbox']");
    // console.log("Tareas =", listaChecks.length);

    for (let index = 0; index < listaChecks.length; index++) {
        if (listaChecks[index].checked) {
            contadorChecks++;

            console.log("Soy bipolar", contadorChecks)
        }

    }
    contenedorCero.textContent = contadorChecks;

}




// NO REPETIR TAREAS




// OCULTAR TEXT




// FUNCTION DE APIS


async function buscarPorTeclado(eventoD) {
    eventoD.preventDefault();

    ulValor.innerHTML = "";



    listaTareasGlobal = await buscarTareas(inputBuscar.value);
    console.log("Mi lista al iniciar la aplicacion", listaTareasGlobal)

    for (let indiceTareas = 0; indiceTareas < listaTareasGlobal.length; indiceTareas++) {
        const tarea = listaTareasGlobal[indiceTareas];
        const textTarea = tarea.task;
        agregarTarea(textTarea, tarea.id, tarea.check);
        contadorChecks();
    }

    inputBuscar.focus();

}

crearTareasIniciales();

borrarTareaServer();