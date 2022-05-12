const checkGitPermission = require('./../exc/git_permission');
const runCommandWithGit = require('./../exc/run_command');
const gitRemoteV = require('./../exc/git_remote_url');

const { 
    getURLString
} = require('./../../utils/index');

const {
    COMMAND_ERR,
    DONT_HAVE_PERMISSION,
    REPO_DOES_NOT_EXISTS,
    USER_DOES_NOT_EXISTS
} = require('./../../constants/global');
const log = require('../../utils/log');
const getRepo = require('../options/get_repo')
const getUserInfoById = require('../options/get_user_info_by_id')
const switchUser = require('../options/switch_user')
async function forWardCommand(argv) {
    
    let commandKeys = Object.keys(argv)
    if (argv._.length === 0 && !(commandKeys.some(i => i !== '_' && i !== '$0'))) {
        log.error(COMMAND_ERR)
    } else {
        let url = await gitRemoteV().then(data => {
            return getURLString(data)
        }).catch(err => {
            log.error(err)
            return null
        })
        await autoSwitchUser(url)
        checkGitPermission(url).then(isAllow => {
            if(isAllow) {
                let command = convertCommand(argv);
                runCommandWithGit(command)
            } else {
                log.error(DONT_HAVE_PERMISSION)
            }
        })
    }
}


const convertCommand = (obj) => {
    let listKey = Object.keys(obj).filter(i => i!=='_' && i!=='$0')  
    let command = obj._.join(" ")
    listKey.forEach( i=> {
        command += ' -'+i
        if(typeof obj[i] === 'string'){
            command += ` "${obj[i]}"`
        }
    })
    return command
}


const autoSwitchUser = async (url) => {
    if(!Boolean(url)) return false
    let repo = getRepo({url})
    if(repo == REPO_DOES_NOT_EXISTS) return false
    let user = getUserInfoById(repo.userID)
    if(user == USER_DOES_NOT_EXISTS) return false
    if(!user.isDefault) await switchUser({username: user.username})
    return true
}

module.exports = forWardCommand;