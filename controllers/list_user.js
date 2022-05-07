const Store = require('../db_store/store')
const db = require('../db_store/db')


function listUser() {
    const store = new Store(db)
    return store.getUserList();
}
module.exports = listUser;