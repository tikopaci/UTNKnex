const bd = require('./../utils/bd');

const getAll = () => bd('usuarios').select(); 

const getSingle = (id) => bd('usuarios').where({ 'id': id, eliminado: false }).select('nombre', 'mail', 'pass', 'telefono', 'direccion');

const validacion = (username, pass) => bd('usuarios').where({ 'username': username, 'pass': pass }).select();

const create = (obj) => bd('usuarios').insert(obj);  

const update = (id, obj) => bd('usuarios').where({ 'id': id }).update(obj);

const del = (id) => bd('usuarios').where({'id': id}).update({ eliminado: 1 });

module.exports = { getAll, getSingle, create, update, validacion, del };