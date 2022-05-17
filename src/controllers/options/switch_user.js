const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')
const { runCommandWithGit } = require('../exc/run_command')
const {updateSSHConfig} = require('../../ssh/ssh_config_manage');
const log = require('./../../utils/log');

async function switchUser(username) {
    const store = new Store(db)
    if (!Boolean(username)) {
        log.debug.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(username)
    if(!Boolean(userExists)) {
        log.debug.error(USER_DOES_NOT_EXISTS)
        return USER_DOES_NOT_EXISTS
    }
    
    await runCommandWithGit(`config --global user.name ${userExists.username}`)
    await runCommandWithGit(`config --global user.email ${userExists.email}`)
    await updateSSHConfig({host: 'github.com', newIdentity: userExists.privateKeyPath})
    log.user.success(`SWITCH SUCCESSED TO: ${userExists.username}`)
    return userExists;
    
}
module.exports = switchUser;