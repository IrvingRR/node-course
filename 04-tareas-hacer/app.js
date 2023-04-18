require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
    console.clear();

    let opcion = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opcion = await inquirerMenu();

        switch (opcion) {
            case '1':
                const entrada = await leerInput('Description:');
                tareas.crearTarea(entrada);
                break;

            case '2':
               tareas.listadoCompleto();
            break;
            case '3': 
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': 
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': 
                const ids = await mostrarListadoCheckList(tareas.listarTareas);
                tareas.toggleCompletadas(ids);
            break;
            case '6': 
                const id = await listadoTareasBorrar(tareas.listarTareas);
                if(id !== '0') {
                    const ok = await confirmar('¿Quieres eliminar la tarea');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('¡Tarea eliminada exitosamente!'.green);
                    }
                }
            break
            default:
                break;
        }

        guardarDB(JSON.stringify(tareas.listarTareas));
        if(opcion !== '0') await pausa();

    } while(opcion !== '0');
};

main();