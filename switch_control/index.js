// SaveNewUser(user *dbstore.User)

// UpdateUserDefault(user *dbstore.User)

// Forward() -> git
const createNewUser = require('./create_new');
const updateUser = require('./update_user');
const deleteUser = require('./delete_user');
const listUser = require('./list_user');
const switchUser = require('./switch_user');
const getUserDefault = require('./get_user_default');
const checkUserRule = require('./check_user_rule');
module.exports = {
    createNewUser,
    updateUser,
    deleteUser,
    listUser,
    switchUser,
    getUserDefault,
    checkUserRule
}