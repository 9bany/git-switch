const { GIT_FILE_NOT_FOUND } = require("../../constants/global");
const { getURLString } = require("../../utils");
const gitRemoteV = require("../exc/git_remote_url");
const log = require('./../../utils/log');
const getRepo = require("./get_repo");
const getUserInfo = require("./get_user_info_by_id");

async function userRepo(repo_url) {
    if(repo_url === true) {
        gitRemoteV().then(data => {
            let url = getURLString(data)
            findUserWithRepoUrl(url)
        }).catch(err => {
            log.user.error(err)
            return GIT_FILE_NOT_FOUND
        })
    } else if (typeof repo_url === 'string') {
        findUserWithRepoUrl(repo_url)
    }

    function findUserWithRepoUrl(url) {
        let repo = getRepo({ url })
        if (!repo.id) {
            log.user.error(repo)
            return repo
        }
        let user = getUserInfo(repo.userID)
        if(!user.id) {
            log.user.error(user)
            return user
        }
        log.user.info(user)
    }
    
}

module.exports = userRepo;