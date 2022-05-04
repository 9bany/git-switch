const Store = require('../db_store/store')
const db = require('../db_store/db')
const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../constants/global')


function deleteUser(objc) {
    const store = new Store(db)
    const {user} = objc;
    if (!Boolean(user)) {
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(user)
    if(!Boolean(userExists)) return USER_DOES_NOT_EXISTS
    

    return store.deleteUser(user);
    
}
module.exports = deleteUser;