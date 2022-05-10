
const { spawn } = require('child_process');


function runCommandWithGit(command) {
    return new Promise((resolve, reject) => {  
        let arrayCommand = command.split(" ")
        var listen = spawn(`git`, arrayCommand);

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
module.exports = runCommandWithGit;
