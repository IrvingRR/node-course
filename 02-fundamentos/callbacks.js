const empleados = [
    {
        id: 1,
        nombre: 'Irving'
    },

    {
        id: 2,
        nombre: 'Andrea'
    },

    {
        id: 3,
        nombre: 'Perla'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },

    {
        id: 2,
        salario: 1500
    }
]

const ID = 3;

// Creamos la función para obtener a un empleado de nuestra lista de empleados por ID
const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id);

    if(empleado) {
        callback(null, empleado);
    } else {
        callback(`Empleado con ID ${ id } no existe.`);
    }
}

const getSalario = (id, callback) => {

    const salario = salarios.find(salario => salario.id === id);

    if(salario) {
        callback(null, salario);
    } else {
        callback(`El salario con el ID ${ id } no existe`);
    }

}

// Callback que queremos ejecutar
const callbackEmpleado = (error, empleado) => {
    if(error) {
        console.log('ERROR');
        return console.log(error);
    } 

    console.log('Empleado encontrado');
    return console.log(empleado);
}

const callbackSalario = (error, salario) => {
    if(error) {
        console.log('ERROR');
        return console.log(error);
    }

    console.log('Salario encontrado');
    return console.log(salario);
}

// Ejecutamos nuestra funcion y le pasamos el callback que queremos ejecutar
getEmpleado(ID, callbackEmpleado);
getSalario(ID, callbackSalario);