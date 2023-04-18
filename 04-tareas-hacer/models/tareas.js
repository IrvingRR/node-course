const Tarea = require("./tarea");
const colors = require('colors');

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listarTareas() {
        const tareas = Object.values(this._listado).map(tarea => tarea);
        return tareas;
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        if(tareas.length > 0) {
            tareas.forEach(tarea => {
                this._listado[tarea.id] = tarea;
            });

        } else {
            console.log('No hay tareas por el momento'.yellow);
        }
    }

    listadoCompleto() {
        console.log();
        Object.values(this._listado).forEach((tarea, index) => {
            let estado = tarea.completado ? 'Completada'.green : 'Pendiente'.red;
            
            console.log(`${colors.green(index + 1)}: ${tarea.descripcion} ${'::'.yellow} ${estado} `);
        });
    }

    listarPendientesCompletadas(completadas = true) {

       
        Object.values(this._listado).forEach((tarea, index) => {
            let estado = tarea.completado ? 'Completada'.green : 'Pendiente'.red;

            if(completadas) {
                if(tarea.completado) {
                    console.log(`${colors.green(index + 1)}: ${tarea.descripcion} ${'::'.yellow} ${colors.green(tarea.completado)} `);
                }
            } else {
                if(!tarea.completado) {
                    console.log(`${colors.green(index + 1)}: ${tarea.descripcion} ${'::'.yellow} ${estado} `);
                }
            }
    
             
            
        });
    }

    borrarTarea(id) { delete this._listado[id]; }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completado) {
                tarea.completado = new Date().toISOString();
            }
        });

        Object.values(this._listado).forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completado = null;
            }
        })
    }
}

module.exports = Tareas;