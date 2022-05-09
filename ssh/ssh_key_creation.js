const fs = require('fs');
const genKey = require('./gen');
const { SSH_ROOT_PATH } = require('../constants/config');
const { USERNAME_EMPTY } = require('../constants/global');

const { 
    WRITE_FILE_ERROR,
    DATA_INVALID,
    PATH_INVAID
} = require('../constants/global')

async function saveSSHFile({ pathFile, privateKey, publicKey }) {
    return new Promise((resolve, reject) => { 
        if (!pathFile) {
            resolve(PATH_INVAID)
            return 
        }

        if (!privateKey || !publicKey) {
            resolve(DATA_INVALID)
            return 
        }

        const privateKeyPathFile = pathFile
        const publicKeyPathFile = `${pathFile}.pub`
        Promise.all([
            saveKey({ path: privateKeyPathFile, key: privateKey}),
            saveKey({ path: publicKeyPathFile, key: publicKey}),
        ]).then(result => {
            resolve(result)
            return 
        }).catch(err => {
            resolve(err)
            return 
        })
    });
}

function saveKey({ path, key}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, key, { flag: 'w' }, function (err) {
            if (err) { 
                reject(WRITE_FILE_ERROR)
            } else { 
                resolve(path)
            }
        });
    });
}

function createSHHKey(username) {
    if(!username) {
        return USERNAME_EMPTY
    }
    const { privateKeyResult, publicKeyResult } = genKey();
    return saveSSHFile(
        {
            pathFile: SSH_ROOT_PATH + `/${username}`,
            privateKey: privateKeyResult, 
            publicKey: publicKeyResult
        }
    ).then(data => {
        return data
    }).catch(err => {
        return err
    })
}

module.exports = {
    saveSSHFile,
    createSHHKey
};
