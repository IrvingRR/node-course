require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.cyan} Crear tarea` },
            { value: '2', name: `${'2.'.cyan} Listar tareas` },
            { value: '3', name: `${'3.'.cyan} Listar tareas completadas` },
            { value: '4', name: `${'4.'.cyan} Listar tareas pendientes` },
            { value: '5', name: `${'5.'.cyan} Completar tarea(s)` },
            { value: '6', name: `${'6.'.cyan} Borrar tarea` },
            { value: '0', name: `${'0.'.cyan} Salir` },
        ]
    }
];

const inquirerMenu = async () => {
    // console.clear();
    console.log('******************************'.cyan);
    console.log('   Seleccione una opción'.cyan);
    console.log('******************************\n'.cyan);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
     await inquirer.prompt([{ type: 'input', name: 'enter', message: `Presione ${ 'ENTER'.red } para continuar.` }]);
    console.clear();
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'entrada',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
         }
    ];

   const { entrada } = await inquirer.prompt(question);
   return entrada;
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${index + 1}. ${tarea.descripcion} `
        };
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${index + 1}. ${tarea.descripcion}`,
            checked: tarea.completado ? true : false
        };
    });

    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList };