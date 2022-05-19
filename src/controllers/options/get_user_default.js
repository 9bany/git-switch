const Store = require('../../db_store/store')
const db = require('../../db_store/db');
const log = require('../../utils/log');
const { USER_DEFAULT_EMPTY } = require('../../constants/global');

function getUserDefault() {
    const store = new Store(db)
    let userDefaultList = store.getUserDefault()
    if (userDefaultList.length == 0) {
        log.user.info(USER_DEFAULT_EMPTY);
        return
    }
    let user = userDefaultList[0]
    log.user.info(user);
    return user
}
module.exports = getUserDefault;