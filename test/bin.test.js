const { spawn } = require('child_process');
const assert = require('assert');

function runCommandWithGit(command) {
    return new Promise((resolve, reject) => {  
        let arrayCommand = command.split(" ")
        var listen = spawn(`node`, ['./bin/index.js'].concat(arrayCommand));

        listen.stdout.on('data', function(a){
            resolve(a)
            return;
        });
    
        listen.on('exit',function(){
            resolve('exited')
            return;
        })
    
        listen.stderr.on('data',function(a){
            resolve(a)
            return;
        });
    })
}

describe('cli:bin index ', function () { 
    it(`--help`, function () {
        return runCommandWithGit('--help').then(data => {
            let stringData = data.toString('utf8')
            assert.notEqual(stringData, '')
            assert.notEqual(stringData, null)
            assert.notEqual(stringData, undefined)
        })
    })

})