const { exec } = require("child_process");
const log = require('../../utils/log');

function checkGitPermission(url) {
    return new Promise((resolve, reject) => { 

        exec(`git ls-remote ${url}`, (error, stdout, stderr) => {
            if (error) {
                log.debug.error(error)
                resolve(false)
                return;
            }
            if (stderr) {
                log.debug.info(stderr)
                resolve(true)
                return;
            } 
            if (stdout) {
                log.debug.info(stdout)
                resolve(true)
                return 
            }
            
        });
    })
}
// git@github.com:olli-ai/ios_app.git
// git@github.com:yargs/yargs.git
module.exports = checkGitPermission;
