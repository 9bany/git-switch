const homedir = require('os').homedir();
module.exports = {
    SSH_ROOT_PATH: homedir + '/.ssh',
    SSH_CONFIG_PATH: homedir + '/.ssh/config',
    HOST_DEFAULT: 'github.com',
    DB_CONFIG_PATH: 'swgit_store/db',
    DB_CONFIG_FILENAME: 'swgit.json',
}