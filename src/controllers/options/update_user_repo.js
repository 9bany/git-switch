const { USERNAME_EMPTY, GIT_FILE_NOT_FOUND } = require("../../constants/global");
const { getURLString } = require("../../utils");
const log = require("../../utils/log");
const gitRemoteV = require("../exc/git_remote_url");
const getUserInfo = require("./get_user_info");
const getUserInfoByID = require("./get_user_info_by_id");
const db = require('../../db_store/db');
const getRepo = require("./get_repo");
const Store = require("../../db_store/store");

function updateUserAdminRepo(username) {
    const store = new Store(db)
    if(!username) {
        log.user.error(USERNAME_EMPTY)
        return USERNAME_EMPTY
    }

    gitRemoteV().then(data => {
        let url = getURLString(data)
        let repo = getRepo({ url })
        
        if (!repo.id) {
            log.user.error(repo)
            return repo
        }

        let user = store.getUserById(repo.userID)

        if(user.username === username) {
            return
        }

        let newUser = store.getUser(username)
        let newRepo = store.updateUserAdminRepo({ repoID: repo.id, userID: newUser.id})
        log.user.info(newRepo)
        return newRepo
        
    }).catch(err => {
        log.user.error(err)
        return GIT_FILE_NOT_FOUND
    })

}

module.exports = updateUserAdminRepo;