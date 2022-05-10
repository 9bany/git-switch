const runCommandWithGit = require('./../exc/run_command');
const {getCurrentUserGitConfig} = require('./../../utils')
const {
    createNewUser,
    checkUserRule,
    switchUser,
    getUserDefault,
    createRepo,
    getRepo,
    checkGitPermission
} = require('../index')

const {
    COMMAND_ERR,
    DONT_HAVE_PERMISSION,
    USER_DOES_NOT_EXISTS,
    REPO_DOES_NOT_EXISTS,
} = require('./../../constants/global')

function cloneCommandControl(argv) {
    const { repo_url } = argv
    if (!Boolean(repo_url)) {
        console.error(COMMAND_ERR)
    } else {
        checkGitPermission(repo_url).then(isAllow => {
            if(isAllow) {
                runCommandWithGit(`${argv._[0]} ${repo_url}`).then(async () => {
                    const {name, email} = await getCurrentUserGitConfig()
                    let repoInfo = getRepo(repo_url)
                    let currentUserRule = checkUserRule({username: name})
                    let userInfo 

                    switch(currentUserRule){
                        case USER_DOES_NOT_EXISTS:
                            userInfo = await createNewUser({username: name, email: email})
                            break
                        case false:
                            userInfo = switchUser({username: name})
                            break
                        default:
                            userInfo = getUserDefault()
                    }

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