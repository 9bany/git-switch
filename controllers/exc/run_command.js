
const { exec } = require("child_process");

function runCommandWithGit(command) {
    return new Promise((resolve, reject) => { 

        exec(`git ${command}`, (error, stdout, stderr) => {
            if (error) {
                reject(error.message)
                return;
            }
            if (stderr) {
                resolve(stderr)
                return;
            } 
            if (stdout) {
                resolve(stdout)
                return 
            }
            
        });
    })
}
module.exports = runCommandWithGit;
