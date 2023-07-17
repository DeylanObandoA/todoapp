
const URLTareas = "http://localhost:3000/api/task/"

//======================== GET TAREAS
export async function obtenerTareas() {
    let promesaTarea = fetch(URLTareas);
    let resultadoPromesas = await promesaTarea;
    let datosTarea = await resultadoPromesas.json();
    return datosTarea;
}




//========================== POST TAREAS
export async function postTareas(tareaParametro) {
    let promesaTarea = fetch(URLTareas, {
        method: "POST",
        body: JSON.stringify(
            {
                "task": tareaParametro,
                "check": false
            }
        ),
        headers: {
            "content-Type": "application/json"
        }
    });


    let resultado = await promesaTarea;

    if (resultado.status === 200 && resultado.ok === true) {

        let datosInsertados = await resultado.json();
        return datosInsertados;
    } else {
        console.log("No se logro insertar")
    }

}

// =================== PUT TAREAS

export async function marcarTarea(checkParametro, idTareaParametro) {
    let promesaTarea = fetch(URLTareas + idTareaParametro, {
        method: "PUT",
        body: JSON.stringify(
            {
                "check": checkParametro
            }),
        headers: {
            "content-type": "application/json"
        }
    });

    let resultados = await promesaTarea;

    if (resultados.status === 200 && resultados.ok === true) {

        let datosActualizados = await resultados.json();
        return datosActualizados;

    } else {
        console.log("no se logró actualizar");
    }
}


// ============== DELETE
export async function borrarTarea(idTareaEliminar) {
    let promesaBorrar = fetch(URLTareas + idTareaEliminar, {
        method: "DELETE",

    });
    let resultado = await promesaBorrar;

    if (resultado.status === 200 && resultado.ok === true) {

        let datosEliminados = await resultado.json();

        return datosEliminados;
    } else {
        console.log("Algo paso mal")
    }


}


export async function borrarTareaServer(label) {

    var getTareas = await obtenerTareas();

    for (let indexB = 0; indexB < getTareas.length; indexB++) {
        if (getTareas[indexB].task = label) {
            borrarTarea(getTareas[indexB].id)
            break;
        }
    }
}


export async function checkTAreas() {




}

// BUSCAR TAREAS
export async function buscarTareas(textoBuscar) {
    let promesaTarea = fetch(URLTareas);
    let resultadoPromesas = await promesaTarea;
    let datosTarea = await resultadoPromesas.json();

    let tareasFiltradas = datosTarea.filter((tarea) => {
        return tarea.task.includes(textoBuscar)
    })

    return tareasFiltradas;
}
