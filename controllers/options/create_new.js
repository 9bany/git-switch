const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { createSHHKey } = require('../../ssh/ssh_key_creation');
const { 
    USER_ALREADY_EXISTS,
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('../../constants/global')


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
    const newUser = store.createNew({
        username, 
        email,
        privateKeyPath,
        publicKeyPath
    });
    return newUser
    
}

module.exports = createNewUser;