// SaveNewUser(user *dbstore.User)

// UpdateUserDefault(user *dbstore.User)

// Forward() -> git
const createNewUser = require('./options/create_new');
const updateUser = require('./options/update_user');
const deleteUser = require('./options/delete_user');
const listUser = require('./options/list_user');
const switchUser = require('./options/switch_user');
const getUserDefault = require('./options/get_user_default');
const checkUserRule = require('./options/check_user_rule');
const getUserInfo = require('./options/get_user_info');
const cloneCommandControl = require('./commands/clone_command_control');
const forWardCommand =  require('./commands/forward_command');
const checkGitPermission = require('./exc/git_permission');
const createRepo = require('./options/create_repo')
const getRepo = require('./options/get_repo')

module.exports = {
    createNewUser,
    updateUser,
    deleteUser,
    listUser,
    switchUser,
    getUserDefault,
    checkUserRule,
    getUserInfo,
    cloneCommandControl,
    checkGitPermission,
    forWardCommand,
    createRepo,
    getRepo
}