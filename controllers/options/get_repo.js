const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { 
    URL_EMPTY,
    REPO_DOES_NOT_EXISTS,
} = require('../../constants/global');

function getRepo({ url }) {
    const store = new Store(db)
    if (!Boolean(url)) {
        return URL_EMPTY
    }

    const repoExists = store.getRepo(url)
    if(!Boolean(repoExists)) return REPO_DOES_NOT_EXISTS

    return store.getRepo(url);
    
}
module.exports = getRepo;