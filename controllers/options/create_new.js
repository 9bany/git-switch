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
const { runCommandWithGit } = require('./../exc/run_command');
const {updateSSHConfig} = require('./../../ssh/ssh_config_manage')

async function createNewUser({ 
    host = HOST_DEFAULT,
    username, 
    password,
    email, 
    privateKeyPath, 
    publicKeyPath 
}) {
    const store = new Store(db)

    if (!username || username === "") {
        log.user.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }

    if (!email || email === "" ) {
        log.user.error(EMAIL_EMPTY)
        return EMAIL_EMPTY
    }

    let privatePath = privateKeyPath
    let publicPath = publicKeyPath

    const userExists = store.getUser(username)
    if(Boolean(userExists)) {
        log.user.error(USER_ALREADY_EXISTS)
        return USER_ALREADY_EXISTS
    }

    if (!privatePath) {
        const paths = await createSHHKey(username, password)
        privatePath = paths[0]
        publicPath = paths[1]
    }
    readPublicKey(publicPath)

    const newUser = store.createNew({
        username, 
        email,
        privateKeyPath: privatePath,
        publicKeyPath: publicPath
    });

    // update user default
    store.createUserDefault(newUser)

    await runCommandWithGit(`config --global user.name ${newUser.username}`)
    await runCommandWithGit(`config --global user.email ${newUser.email}`)
    await updateSSHConfig({host: host, newIdentity: newUser.privateKeyPath})
    log.user.success("USER CREATED");
    return newUser
    
}

function readPublicKey(publicKeyPath) {
    log.user.info("COPY THE PUBLIC KEY\n", )
    if (fs.existsSync(publicKeyPath)) {
        fs.readFile(publicKeyPath, 'utf8', function read(err, data) {
            if (err) {
                reject(err)
                throw err;
            }
            log.user.info(data)
            return;
        });
    }
}

module.exports = createNewUser;
