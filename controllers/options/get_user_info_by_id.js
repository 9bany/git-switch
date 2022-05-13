const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { 
    ID_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')


function getUserInfo(id) {
    const store = new Store(db)
    if (!Boolean(id)) {
        return ID_EMPTY
    }

    const userExists = store.getUserById(id)
    if(!Boolean(userExists)) return USER_DOES_NOT_EXISTS
    
    return store.getUserById(id);
    
}
module.exports = getUserInfo;