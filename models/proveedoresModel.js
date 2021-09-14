const bd = require('./../utils/bd');

const getAll = () => bd('proveedores').select(); 

const single = (id) => bd('proveedores').where({'id': id, eliminado: false}).select('nombre', 'mail'); 

const create = (obj) => bd('proveedores').insert(obj); 

const update = (id, obj) => bd('proveedores').where({'id': id}).update(obj);

const del = (id) => bd('proveedores').where({'id': id}).update({ eliminado: 1 });

module.exports = { getAll, single, create, update, del };