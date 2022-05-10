const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { 
    USERNAME_EMPTY,
    USER_DOES_NOT_EXISTS,
} = require('../../constants/global')
const runCommandWithGit = require('../exc/run_command')
const {updateSSHConfig} = require('../../ssh/ssh_config_manage');

async function switchUser(objc) {
    const store = new Store(db)
    const {username} = objc;
    if (!Boolean(username)) {
        return USERNAME_EMPTY
    }

    const userExists = store.getUser(username)
    if(!Boolean(userExists)) return USER_DOES_NOT_EXISTS
    
    // await runCommandWithGit(`config --global user.name "${userExists.username}"`)
    // await runCommandWithGit(`config --global user.email "${userExists.email}"`)
    // updateSSHConfig({identity: userExists.privateKeyPath})

    return userExists;
    
}
module.exports = switchUser;