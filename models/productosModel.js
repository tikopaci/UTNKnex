const bd = require('./../utils/bd');

const getAll = () => bd('productos').select(); //GetAll con knex

const single = (id) => bd('productos').where({'id': id, eliminado: false}).select('nombre', 'precio', 'stock', 'id_proveedor'); //un getSingle usando el id de parametro y que no esté eliminado.

const create = (obj) => bd('productos').insert(obj); //Insert a la bd con knex

const update = (id, obj) => bd('productos').where({'id': id}).update(obj);

const del = (id) => bd('productos').where({'id': id}).update({ eliminado: 1 });

module.exports = { getAll, single, create, update, del };