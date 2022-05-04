const Store = require('../db_store/store')
const db = require('../db_store/db')
const { 
    USER_ALREADY_EXISTS,
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('./../constants/global')


function createNewUser(objc) {
    const store = new Store(db)
    const { user, email } = objc;
    if (!user || user === "") {
        return USERNAME_EMPTY
    }
    if (!email || email === "" ) {
        return EMAIL_EMPTY
    }

    const userExists = store.getUser(user)
    if(Boolean(userExists)) return USER_ALREADY_EXISTS
    
    return store.createNew({username: user, email});
    
}
module.exports = createNewUser;