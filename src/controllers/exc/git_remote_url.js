
const { exec } = require("child_process");

function gitRemoteV() {
    return new Promise((resolve, reject) => { 

        exec(`git remote -v`, (error, stdout, stderr) => {
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
module.exports = gitRemoteV;
