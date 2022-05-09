const gitRemoteV  = require('../controllers/exc/git_remote_url');
const { exec } = require("child_process");
const { allowRunTestOnMachine } = require('./util')
const assert = require('assert');

main()

function main() {
    describe('git:git remote -v', function () { 
        it(`should return string when have git remote`, function () {
            return gitRemoteV().then(data => {
                assert.notEqual(data, null)
            })
        })

        it(`should return error when dont have git file`, function () {
            return runTestDeleteGitConfig()
        })
    })
}

async function runTestDeleteGitConfig() {
    if (allowRunTestOnMachine()) {
        await exec(`rm -rf .git`, (error, stdout, stderr) => { console.log("ls ok")})
        return gitRemoteV().then(data => {
            assert.notEqual(data, null)
        }).catch(err => {
            assert.notEqual(null, null)
        })
    }
}