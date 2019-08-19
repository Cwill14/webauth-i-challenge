const db = require('../data/db-config.js');

module.exports = {
    addUser,
    getUsers
}

function addUser(user) {
    return db('users').insert(user);
}

function getUsers() {
    return db('users');
}