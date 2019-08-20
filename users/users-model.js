const db = require('../data/db-config.js');

module.exports = {
    addUser,
    findUser,
    getUsers,
    findId
}

function addUser(user) {
    return db('users').insert(user);
}

function findUser(filter) {
    return db('users').where(filter);
}

function getUsers() {
    return db('users');
}

function findId(id) {
    return db('users')
        .where({ id })
}