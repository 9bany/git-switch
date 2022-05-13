const Store = require('../../db_store/store');
const db = require('../../db_store/db');
const log = require('../../utils/log');

const { 
    URL_EMPTY,
    REPO_DOES_NOT_EXISTS,
} = require('../../constants/global');

function getRepo({ url }) {
    const store = new Store(db)
    if (!Boolean(url)) {
        log.debug.error(URL_EMPTY)
        return URL_EMPTY
    }

    const repoExists = store.getRepo(url)
    if(!Boolean(repoExists)) { 
        log.debug.error(REPO_DOES_NOT_EXISTS)
        return REPO_DOES_NOT_EXISTS
    }

    return store.getRepo(url);
    
}
module.exports = getRepo;