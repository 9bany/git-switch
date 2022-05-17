const Store = require('../../db_store/store')
const db = require('../../db_store/db')

function getUserDefault() {
    const store = new Store(db)
    return store.getUserDetault();
}
module.exports = getUserDefault;