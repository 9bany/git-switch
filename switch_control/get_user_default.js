const Store = require('../db_store/store')
const db = require('../db_store/db')
const { 
    USER_ALREADY_EXISTS,
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('../constants/global')


function getUserDefault() {
    const store = new Store(db)
    return store.getUserDetault();
    
}
module.exports = getUserDefault;