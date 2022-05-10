const Store = require('../../db_store/store')
const db = require('../../db_store/db')
const { 
    URL_EMPTY,
    ID_EMPTY,
    REPO_ALREADY_EXISTS,
} = require('../../constants/global')


function createRepo(objc) {
    const store = new Store(db)
    const { url, userID } = objc;
    if (!Boolean(url)) {
        return URL_EMPTY
    }

    if (!Boolean(userID)) {
        return ID_EMPTY
    }
    const repoExists = store.getRepo(url)
    if(Boolean(repoExists)) return REPO_ALREADY_EXISTS
    
    return store.createRepo(objc);
    
}
module.exports = createRepo;