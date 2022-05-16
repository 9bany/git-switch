const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');
const { SSH_ROOT_PATH } = require('../constants/config');
const { USERNAME_EMPTY } = require('../constants/global');
const log = require('./../utils/log');
const keygen = require('ssh-keygen-lite');

const { 
    FILE_ALREADY_EXISTS,
} = require('../constants/global')



function sshKeygen(location, opts) {
    return new Promise((resolve, reject) => { 
        opts || (opts={});

        var pubLocation = location+'.pub';
        if(!opts.comment) opts.comment = '';
        if(!opts.password) opts.password = '';
        if(!opts.size) opts.size = '2048';
        if(!opts.format) opts.format = 'RFC4716';
        keygen(
            {
              location: location,
              comment: opts.comment,
              password: opts.password,
              size: opts.size,
              format: opts.format,
            },
            function onDoneCallback(err, out) {
                if (err) {
                    reject('error');
                    log.debug('error');
                    return
                }
                log.debug.info('exited');
                resolve({ privateLocation: location, pubLocation: pubLocation })
            },
        );
  

    })
};

function createSHHKey(username, password) {
    return new Promise((resolve, reject) => { 
        if(!username) {
            reject(USERNAME_EMPTY)
            log.debug.error(USERNAME_EMPTY)
            return
        }
    
        let location = SSH_ROOT_PATH + `/${username}`;
    
        if (fs.existsSync(location)) {
            let error = FILE_ALREADY_EXISTS
            log.debug.error(FILE_ALREADY_EXISTS)
            reject(error)
            return
        }
    
        if (fs.existsSync(`${location + '.pub'}`)) {
            let error = FILE_ALREADY_EXISTS
            log.debug.error(FILE_ALREADY_EXISTS)
            reject(error)
            return
        }
    
        sshKeygen(location,{ password: password }).then(({ privateLocation, pubLocation })=> {
            log.debug.success("SSH CREATED");
            resolve([privateLocation, pubLocation])
        })
    })
}

module.exports = {
    createSHHKey
};
