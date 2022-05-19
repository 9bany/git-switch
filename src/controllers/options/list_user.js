const Store = require('../../db_store/store')
const db = require('../../db_store/db');
const log = require('../../utils/log');

function listUser() {
    const store = new Store(db)
    let userList = store.getUserList();
    log.user.info(userList)
    return userList
}
module.exports = listUser;