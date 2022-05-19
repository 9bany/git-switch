const { GIT_FILE_NOT_FOUND, REPO_ALREADY_EXISTS, USER_DEFAULT_EMPTY } = require('../../constants/global');
const db = require('../../db_store/db');
const Store = require('../../db_store/store');
const { getURLString } = require('../../utils');
const log = require('../../utils/log');
const gitRemoteV = require('../exc/git_remote_url');
const getRepo = require('./get_repo');

function addExistRepo(repo_url) {
    const store = new Store(db)
    if(repo_url === true) {
        gitRemoteV().then(data => {
            let url = getURLString(data)
            addNewRepoWithURL(url)
        }).catch(err => {
            log.user.error(err)
            return GIT_FILE_NOT_FOUND
        })
    } else if (typeof repo_url === 'string') {
        addNewRepoWithURL(repo_url)
    }

    function addNewRepoWithURL(url) {
        
        let repo = getRepo({ url })
        if (repo.id) {
            log.user.error(REPO_ALREADY_EXISTS)
            return repo
        }

        let userListDefault = store.getUserDefault()
        if(userListDefault.length == 0) {
            log.user.error(USER_DEFAULT_EMPTY)
            return USER_DEFAULT_EMPTY
        }
        let userDefault = userListDefault[0]
        let newRepo = store.createRepo({ url: url, userID: userDefault.id})
        log.user.info(newRepo)
        
        return newRepo
    }
}
module.exports = addExistRepo;