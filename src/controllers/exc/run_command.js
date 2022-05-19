
const { spawn } = require('child_process');
const log = require('./../../utils/log')

function runCommandWithGit(command) {
    return new Promise((resolve, reject) => {  
        let arrayCommand = command.split(" ")
        log.debug.info(arrayCommand)
        var listen = spawn(`git`, arrayCommand);

        listen.stdout.on('data', function(a){
            log.debug.info(`data: ${a}`)
            resolve(a)
            return;
        });
    
        listen.on('exit',function(){
            log.debug.info(`exited`)
            resolve('exited')
            return;
        })
    
        listen.stderr.on('data',function(a){
            log.debug.info(`data: ${a}`)
            resolve(a)
            return;
        });
    })
}
function runCommandWithGitArgv(argvs) {
    return new Promise((resolve, reject) => {  
        
        var listen = spawn(`git`, argvs);

        listen.stdout.on('data', function(a){
            log.debug.info(`data: ${a}`)
            resolve(a)
            return;
        });
    
        listen.on('exit',function(){
            log.debug.info(`exited`)
            resolve('exited')
            return;
        })
    
        listen.stderr.on('data',function(a){
            log.debug.info(`data: ${a}`)
            resolve(a)
            return;
        });
    })
}
module.exports = {
    runCommandWithGitArgv,
    runCommandWithGit
};
