const db = require('../database/dbConfig')

module.exports = {
    save,
    find,
    findbByUserName
}

function save(user) {
   return db('users').insert(user).then(id => findById(id[0]))
}

function find() {
   return db('users')
}

function findbByUserName(username) {
    return db('users').where({username}).first()
}

function findById(id) {
    return db('users').where({id}).first()
}