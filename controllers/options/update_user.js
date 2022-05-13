const Store = require('../../db_store/store');
const db = require('../../db_store/db');
const log = require('./../../utils/log');

const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')


function updateUser(objc) {
    const store = new Store(db)
    const {username} = objc;
    if (!Boolean(username)) {
        log.debug.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(username)
    if(!Boolean(userExists)) {
        log.debug.error(USER_DOES_NOT_EXISTS)
        return USER_DOES_NOT_EXISTS
    }
    log.user.info("UPDATED")
    return store.updateUser(objc);

}
module.exports = updateUser;