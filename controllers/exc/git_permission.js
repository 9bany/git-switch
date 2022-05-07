const { exec } = require("child_process");

function checkGitPermission(url) {
    return new Promise((resolve, reject) => { 

        exec(`git ls-remote ${url}`, (error, stdout, stderr) => {
            if (error) {
                // debug
                // console.log(`error: ${error.message}`);
                resolve(false)
                return;
            }
            if (stderr) {
                // debug
                // console.log(`stderr: ${stderr}`);
                resolve(true)
                return;
            } 
            if (stdout) {
                // debug
                // console.log(`stdout: ${stdout}`);
                resolve(true)
                return 
            }
            
        });
    })
}
// git@github.com:olli-ai/ios_app.git
// git@github.com:yargs/yargs.git
module.exports = checkGitPermission;
