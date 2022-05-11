const fs = require('fs');
const SSHConfig = require('ssh-config')
const {
    SSH_CONFIG_PATH
} = require('./../constants/config')
const {
    NOT_FOUND,
    OK,
    INVALID
} = require('./../constants/global')

/**
* [updateSSHConfig:                      : will update config ssh config]
* @param  {string}      host            : the name of the ssh server => ex: github.com || gitlab.com
* @param  {string}      newIdentity     : the specify name of the new user => use to connect ssh server
* @return {object}                      : the new object for ssh config
*/
function dataUpdateSSHConfig({
    host, 
    newIdentity
}) {
    return new Promise((resolve, reject) => { 
        if(!host || !newIdentity) {
            reject(INVALID)
            return
        }
        if (!fs.existsSync(newIdentity)) {
            let error = NOT_FOUND + newIdentity
            reject(error)
            return
        }
        getList().then(data => {
            const info = data.find({ Host: host })
            if(!info) {
                // add new
                data.append({
                    Host: host,
                    HostName: 'ssh.github.com',
                    User: 'git',
                    PreferredAuthentications: 'publickey',
                    IdentityFile: newIdentity
                })
                resolve(data)
                return
            }
            let configItem = info.config.filter(element => element.param === 'IdentityFile')
            if (configItem.length === 0) {
                reject(NOT_FOUND + 'config')
                return
            }
            configItem[0].value = newIdentity
            resolve(data)
        })
    })
}

/**
* [getList:                      : get config ssh list
* @return {[SSHConfig]}           : SSHConfig list objects
*/
function getList() {
    return new Promise((resolve, reject) => { 
        if (fs.existsSync(SSH_CONFIG_PATH)) {
            fs.readFile(SSH_CONFIG_PATH, 'utf8', function read(err, data) {
                if (err) {
                    reject(err)
                    throw err;
                }
                resolve(SSHConfig.parse(data));
                return;
            });
        } else {
            let error = NOT_FOUND + SSH_CONFIG_PATH
            console.error(error)
            reject(error)
            return;
        }
    })
    
}
/**
* [writeConfigFile:                      : will write ssh config file with w option
* @param  {string}      data            : your string data save in file 
* @return {string}                      : 'ok' or error object
*/
function writeConfigFile(data) {
    return new Promise((resolve, reject) => { 
        if (fs.existsSync(SSH_CONFIG_PATH)) {
            fs.writeFile(SSH_CONFIG_PATH, data, {encoding: 'utf8', flag: 'w' },function read(err) {
                if (err) {
                    reject(err)
                    throw err;
                }
                resolve(OK);
                return;
            });
        } else {
            let error = NOT_FOUND + SSH_CONFIG_PATH
            console.error(error)
            reject(error)
            return;
        }
    })
    
}
/**
* [updateSSHConfig:                      : will update config ssh config]
* @param  {string}      host            : the name of the ssh server => ex: github.com || gitlab.com
* @param  {string}      newIdentity     : the specify name of the new user => use to connect ssh server
* @return {object}                      : status
*/
async function updateSSHConfig({
    host,
    newIdentity
}) {
    return new Promise((resolve, reject) => { 
        if (!fs.existsSync(SSH_CONFIG_PATH)) { 
            createSShConfigFile().then(_ => {
                runUpdate()
            })
        }
        runUpdate()
        function runUpdate() {
            dataUpdateSSHConfig({ host, newIdentity }).then(data => {
                writeConfigFile(SSHConfig.stringify(data)).then(data => {
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        }
        
    })
}

function createSShConfigFile() {
    return new Promise((resolve, reject) => { 
        if (!fs.existsSync(SSH_CONFIG_PATH)) { 
            fs.writeFile(SSH_CONFIG_PATH, '', function read(err) {
                if (err) {
                    reject(err)
                    throw err;
                }
                resolve('ok')
            });
        }
    })
}


/**
 * [Example]
 * const data = await dataUpdateSSHConfig({host: 'github.com', newIdentity: '/Users/bany/.ssh/id_rsa_9bany'})
 * let result = await writeConfigFile(SSHConfig.stringify(data))
 * console.log(result)
 */

module.exports = {
    updateSSHConfig,
    getList
}