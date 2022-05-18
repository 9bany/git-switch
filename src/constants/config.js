const homedir = require('os').homedir();
const path = require('path');
module.exports = {
    SSH_ROOT_PATH: path.resolve(homedir + '/.ssh'),
    SSH_CONFIG_PATH: path.resolve(homedir + '/.ssh/config'),
    HOST_DEFAULT: 'github.com',
    DB_CONFIG_PATH: 'swgit_store/db',
    DB_CONFIG_FILENAME: 'swgit.json',
}