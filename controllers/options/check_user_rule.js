const Store = require('../db_store/store')
const db = require('../db_store/db')
const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../constants/global')


function checkUserRule(objc) {
    const store = new Store(db)
    const {username} = objc;
    if (!Boolean(username)) {
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(username)
    if(!Boolean(userExists)) return USER_DOES_NOT_EXISTS

    return store.checkUserRule(username);
    
}
module.exports = checkUserRule;