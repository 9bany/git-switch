const Store = require('../db_store/store')
const db = require('../db_store/db')
const { createSHHKey } = require('./../ssh/ssh_controller');
const { 
    USER_ALREADY_EXISTS,
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('./../constants/global')


async function createNewUser(objc) {
    const store = new Store(db)
    const { username, email } = objc;
    if (!username || username === "") {
        return USERNAME_EMPTY
    }
    if (!email || email === "" ) {
        return EMAIL_EMPTY
    }

    const userExists = store.getUser(username)
    if(Boolean(userExists)) return USER_ALREADY_EXISTS
    
    const [privateKeyPath, publicKeyPath] = await createSHHKey(username)
    
    return store.createNew({
        username, 
        email,
        privateKeyPath,
        publicKeyPath
    });
    
}

module.exports = createNewUser;