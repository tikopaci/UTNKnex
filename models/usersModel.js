const bd = require('./../utils/bd');

//const getAll = () => bd('usuarios').select(); 
const getAll = () => dbService.getAll('usuarios');

const getSingle = (id) => bd('usuarios').where({ 'id': id, eliminado: false }).select('nombre', 'mail', 'pass', 'telefono', 'direccion');

const login = (username, pass) => bd('usuarios')
    .where({ username, pass })
    .select('username', 'id');

const create = (obj) => bd('usuarios').insert(obj);  

const update = (id, obj) => bd('usuarios').where({ 'id': id }).update(obj);

const del = (id) => bd('usuarios').where({'id': id}).update({ eliminado: 1 });

module.exports = { getAll, getSingle, create, update, login, del };