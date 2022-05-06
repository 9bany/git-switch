const fs = require('fs');
const { 
    WRITE_FILE_ERROR,
    DATA_INVALID,
    PATH_INVAID
} = require('./../constants/global')

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
        const publicKeyPathFile = `${pathFile}_pub`
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
        fs.writeFile(path, key, function (err) {
            if (err) { 
                reject(WRITE_FILE_ERROR)
            } else { 
                resolve(path)
            }
        });
    });
}

module.exports = saveSSHFile;
