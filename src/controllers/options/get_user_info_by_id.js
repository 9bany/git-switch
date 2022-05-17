const Store = require('../../db_store/store');
const db = require('../../db_store/db');
const log = require('../../utils/log');

const { 
    ID_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')

function getUserInfo(id) {
    const store = new Store(db)
    if (!Boolean(id)) {
        log.debug.error(ID_EMPTY)
        return ID_EMPTY
    }

    const userExists = store.getUserById(id)
    if(!Boolean(userExists)) {
        log.debug.error(USER_DOES_NOT_EXISTS)
        return USER_DOES_NOT_EXISTS
    }
    
    return store.getUserById(id);
    
}
module.exports = getUserInfo;