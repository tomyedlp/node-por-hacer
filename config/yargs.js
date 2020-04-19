const description = {
    demand: true,
    alias: 'd',
    desc: "Descripción de la tarea"
};

const complete = {
    demand: true,
    alias: 'c',
    type: 'boolean',
    default: true,
    desc: "marca como completado o pendiente la tarea"
}


const crear = { description }
const borrar = { description }
const actualizar = { complete, description }


const argv = require("yargs")
                .command('listar', 'Listar las tareas')
                .command('crear', 'Crear una tarea', crear)
                .command('actualizar', 'Actualizar una tarea', actualizar)
                .command('borrar', 'Borrar una tarea', borrar)
                .help()
                .argv;

module.exports = {
    argv
}