const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');
const { SSH_ROOT_PATH } = require('../constants/config');
const { USERNAME_EMPTY } = require('../constants/global');
const log = require('./../utils/log');


const { 
    FILE_ALREADY_EXISTS,
} = require('../constants/global')


function binPath() {
	if(process.platform !== 'win32') return 'ssh-keygen';

	switch(process.arch) {
		case 'ia32': return path.join(__dirname, '..', 'bin', 'ssh-keygen-32.exe');
		case 'x64': return path.join(__dirname, '..', 'bin', 'ssh-keygen-64.exe');
	}

	throw new Error('Unsupported platform');
}

function sshKeygen(location, opts) {
    return new Promise((resolve, reject) => { 
        opts || (opts={});

        var pubLocation = location+'.pub';
        if(!opts.comment) opts.comment = '';
        if(!opts.password) opts.password = '';
        if(!opts.size) opts.size = '2048';
        if(!opts.format) opts.format = 'RFC4716';
    
        var keygen = spawn(binPath(), [
            '-t','rsa',
            '-b', opts.size,
            '-C', opts.comment,
            '-N', opts.password,
            '-f', location,
            '-m', opts.format
        ]);
    
        keygen.stdout.on('data', function(a) {
            log.debug.info('stdout:'+a);
            resolve({ privateLocation: location, pubLocation: pubLocation })
        });
    
        keygen.on('exit',function() {
            log.debug.info('exited');
            resolve({ privateLocation: location, pubLocation: pubLocation })
        });
    
        keygen.on('error',function() {
            reject('error');
            log.debug.info('error');
        });
    
        keygen.stderr.on('data',function(a) {
            log.debug.info('stderr:'+a);
            resolve({ privateLocation: location, pubLocation: pubLocation })
        });
    })
};

function createSHHKey(username) {
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
    
        sshKeygen(location,{}).then(({ privateLocation, pubLocation })=> {
            log.debug.success("SSH CREATED");
            resolve([privateLocation, pubLocation])
        })
    })
}

module.exports = {
    createSHHKey
};
