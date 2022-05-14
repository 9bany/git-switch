const { runCommandWithGit } = require('./../exc/run_command');
const {getCurrentUserGitConfig} = require('./../../utils')
const checkGitPermission = require('./../exc/git_permission')
const getRepo = require('./../options/get_repo')
const createRepo = require('./../options/create_repo')
const getUserDefault = require('./../options/get_user_default')
const switchUser = require('./../options/switch_user')
const checkUserRule = require('./../options/check_user_rule')
const createNewUser = require('./../options/create_new')

const {
    COMMAND_ERR,
    DONT_HAVE_PERMISSION,
    USER_DOES_NOT_EXISTS,
    REPO_DOES_NOT_EXISTS,
} = require('./../../constants/global');
const log = require('../../utils/log');
const { stopAnimation } = require('../../utils/loader');

function cloneCommandControl(repo_url) {
    if (!Boolean(repo_url)) {
        console.error(COMMAND_ERR)
    } else {
        
        let loader = log.user.loading("Cloning...");

        checkGitPermission(repo_url).then(isAllow => {
            if(isAllow) {
                runCommandWithGit(`clone ${repo_url}`).then(async () => {
                    const {name, email} = await getCurrentUserGitConfig()
                    let repoInfo = getRepo({url: repo_url})
                    let currentUserRule = checkUserRule({username: name})
                    let userInfo 

                    switch(currentUserRule){
                        case USER_DOES_NOT_EXISTS:
                            userInfo = await createNewUser({username: name, email: email})
                            break
                        case false:
                            userInfo = await switchUser(name)
                            break
                        default:
                            userInfo = getUserDefault()
                    }
                    
                    stopAnimation(loader)

                    if(repoInfo == REPO_DOES_NOT_EXISTS){
                        createRepo({url:repo_url, userID: userInfo.id})
                    }
                })
            } else {
                console.error(DONT_HAVE_PERMISSION)
            }
        })
    }
}

module.exports = cloneCommandControl;