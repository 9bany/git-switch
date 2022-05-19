const {
    COMMAND_ERR,
    REPO_DOES_NOT_EXISTS,
    USER_DOES_NOT_EXISTS,
    URL_EMPTY,
    OK
} = require('./../../constants/global');

const { 
    getURLString
} = require('./../../utils/index');

const log = require('../../utils/log');
const getRepo = require('../options/get_repo');
const getUserInfoById = require('../options/get_user_info_by_id');
const switchUser = require('../options/switch_user');
const { runCommandWithGitArgv } = require('./../exc/run_command');
const gitRemoteV = require('./../exc/git_remote_url');
const db = require('../../db_store/db');
const Store = require('../../db_store/store');

async function forWardCommand(argv) {
    if (argv._.length === 0) {
        log.debug.error(COMMAND_ERR)
    } else {
        let url = await gitRemoteV().then(data => {
            return getURLString(data)
        }).catch(err => {
            log.debug.error(COMMAND_ERR)
            return null
        })
        await autoSwitchUser(url)

        const args = process.argv.slice(2);
        log.debug.info(args)
        runCommandWithGitArgv(args)
    }
}

function autoSwitchUser(url) {
    const store = new Store(db)

    if(!Boolean(url)) return URL_EMPTY
    let repo = getRepo({url})
    if(repo == REPO_DOES_NOT_EXISTS) return REPO_DOES_NOT_EXISTS
    let user = getUserInfoById(repo.userID)
    if(user == USER_DOES_NOT_EXISTS) return USER_DOES_NOT_EXISTS

    let listUser = store.getUserDefault()
    if (listUser.length === 0) return USER_DOES_NOT_EXISTS
    if (listUser[0].id == user.id) return listUser[0].id
    store.createUserDefault(user)
    switchUser(user.username)
    return user
}

module.exports = {
    forWardCommand,
    autoSwitchUser
};