const {
    COMMAND_ERR,
    DONT_HAVE_PERMISSION,
    REPO_DOES_NOT_EXISTS,
    USER_DOES_NOT_EXISTS
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


const autoSwitchUser = async (url) => {
    if(!Boolean(url)) return false
    let repo = getRepo({url})
    if(repo == REPO_DOES_NOT_EXISTS) return false
    let user = getUserInfoById(repo.userID)
    if(user == USER_DOES_NOT_EXISTS) return false
    if(!user.isDefault) await switchUser(user.username)
    return true
}

module.exports = forWardCommand;