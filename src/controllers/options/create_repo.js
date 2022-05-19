const Store = require('../../db_store/store');
const db = require('../../db_store/db');
const log = require('../../utils/log');

const { 
    URL_EMPTY,
    ID_EMPTY,
    REPO_ALREADY_EXISTS,
} = require('../../constants/global')

function createRepo(objc) {
    const store = new Store(db)
    const { url, userID } = objc;
    if (!Boolean(url)) {
        log.debug.error(URL_EMPTY)
        return URL_EMPTY
    }

    if (!Boolean(userID)) {
        log.debug.error(ID_EMPTY)
        return ID_EMPTY
    }
    const repoExists = store.getRepo(url)
    if(Boolean(repoExists)) { 
        log.debug.error(REPO_ALREADY_EXISTS)
        return REPO_ALREADY_EXISTS
    }
    
    return store.createRepo(objc);
    
}
module.exports = createRepo;