const checkGitPermission = require('./../exc/git_permission');
const runCommandWithGit = require('./../exc/run_command');
const gitRemoteV = require('./../exc/git_remote_url');

const { 
    getURLString
} = require('./../../utils/index');

const {
    COMMAND_ERR,
    DONT_HAVE_PERMISSION
} = require('./../../constants/global')

async function forWardCommand(argv) {
    
    let url = await gitRemoteV().then(data => {
        return getURLString(data)
    }).catch(err => {
        console.log(err)
        return null
    })

    if (argv._.length === 0) {
        console.error(COMMAND_ERR)
    } else {
        let command = argv._.join(" ");
        checkGitPermission(url).then(isAllow => {
            if(isAllow) {
                runCommandWithGit(command)
            } else {
                console.error(DONT_HAVE_PERMISSION)
            }
        })
    }
}

module.exports = forWardCommand;