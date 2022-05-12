const fs = require('fs');
const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { createSHHKey } = require('../../ssh/ssh_key_creation');
const log = require('../../utils/log');
const { 
    USER_ALREADY_EXISTS,
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('../../constants/global')
const { 
    HOST_DEFAULT
} = require('../../constants/config')
const runCommandWithGit = require('./../exc/run_command');
const {updateSSHConfig} = require('./../../ssh/ssh_config_manage')

async function createNewUser(objc) {
    const store = new Store(db)
    const { username, email } = objc;
    let host = objc.host
    if(!host) {
        host = HOST_DEFAULT
    }
    if (!username || username === "") {
        log.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }
    if (!email || email === "" ) {
        log.error(USERNAME_EMPTY)
        return EMAIL_EMPTY
    }

    const userExists = store.getUser(username)
    if(Boolean(userExists)) {
        log.error(USER_ALREADY_EXISTS)
        return USER_ALREADY_EXISTS
    }
    
    const [privateKeyPath, publicKeyPath] = await createSHHKey(username)

    readPublicKey(publicKeyPath)

    const newUser = store.createNew({
        username, 
        email,
        privateKeyPath,
        publicKeyPath
    });
    await runCommandWithGit(`config --global user.name ${newUser.username}`)
    await runCommandWithGit(`config --global user.email ${newUser.email}`)
    await updateSSHConfig({host: host, newIdentity: newUser.privateKeyPath})

    return newUser
    
}


function readPublicKey(publicKeyPath) {
    log.success("COPY THE PUBLIC KEY AND IMPORT IT TO YOUR GITHUB SETTINGS: \n")
    if (fs.existsSync(publicKeyPath)) {
        fs.readFile(publicKeyPath, 'utf8', function read(err, data) {
            if (err) {
                reject(err)
                throw err;
            }
            log.info(data)
            return;
        });
    }
}

module.exports = createNewUser;
