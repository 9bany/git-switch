const Store = require('../../db_store/store')
const db = require('../../db_store/db');
const log = require('./../../utils/log');

const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')


function getUserInfo(username) {
    const store = new Store(db)
    if (!Boolean(username)) {
        log.user.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(username)
    if(!Boolean(userExists)) {
        log.user.error(USER_DOES_NOT_EXISTS)
        return USER_DOES_NOT_EXISTS
    }
    
    let user = store.getUser(username);
    log.user.info(user);
    
}
module.exports = getUserInfo;