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

const getEmpleado = (id) => {
    const empleado = empleados.find(empleado => empleado.id === id);

    const promesa = new Promise((resolve, reject) => {
        (empleado) 
            ? resolve(empleado)
            : reject(`No existe el empleado con el id ${id}`);
    });

    return promesa;
}

const getSalario = (id) => {
    const salario = salarios.find(salario => salario.id === id);

    const promesa = new Promise((resolve, reject) => {
        (salario) 
            ? resolver(salario)
            : reject(`No existe el salario con el id ${id}`);
    });

    return promesa;
}

getEmpleado(ID)
    .then(empleado => console.log(empleado))
    .catch(error => console.log(error));

getSalario(ID)
    .then(salario => console.log(salario))
    .catch(error => console.log(error));
