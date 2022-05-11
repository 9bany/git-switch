const homedir = require('os').homedir();
module.exports = {
    SSH_ROOT_PATH: homedir + '/.ssh',
    SSH_CONFIG_PATH: homedir + '/.ssh/config',
    HOST_DEFAULT: 'github.com'
}