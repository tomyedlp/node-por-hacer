const fs = require('fs');

let listadoPorHacer = [];


const borrar = (description) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.description !== description);

    if(listadoPorHacer.length === nuevoListado.length) {
        return "No se encontró esa tarea";
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return "Eliminado!";
    }
}


const actualizar = (description, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.description === description);

    if(index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if(err) {
            throw new Error("No se pudo grabar", err);
        } else {
            console.log("Almacenado en la base de datos.");
        }
    });
}

const crear = (description) => {
    cargarDB();
    let porHacer = {
        description,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}