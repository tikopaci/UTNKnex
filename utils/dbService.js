const bd = require('./bd');

const getAll = (tableName) => bd(tableName).select('*');

const getSingle = (tableName, idRef, id) => bd(tableName).select('*').where({idRef : id});

const innerJoin = (table1, table2, foreign, primary) => bd(table1).join(table2).select();

module.exports = { getAll, getSingle };