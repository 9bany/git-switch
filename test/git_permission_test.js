const { checkGitPermission } = require('./../switch_control');
const assert = require('assert');

describe('git:git permission', function () { 
    it(`should return true when have permission with public repo`, function () {
        return checkGitPermission("https://github.com/9bany/git-switch.git").then(data => {
            assert.equal(data, true)
        })
    })

    it(`should return false when access private repo`, function () {
        return checkGitPermission("https://github.com/olli-ai/ios_app.git").then(data => {
            assert.equal(data, false)
        })
    })
})