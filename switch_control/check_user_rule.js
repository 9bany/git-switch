const Store = require('../db_store/store')
const db = require('../db_store/db')
const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../constants/global')


function checkUserRule(objc) {
    const store = new Store(db)
    const {user} = objc;
    if (!Boolean(user)) {
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(user)
    if(!Boolean(userExists)) return USER_DOES_NOT_EXISTS
    console.log(store.checkUserRule(user));

    return store.checkUserRule(user);
    
}
module.exports = checkUserRule;