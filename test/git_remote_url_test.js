const gitRemoteV  = require('../controllers/exc/git_remote_url');
const assert = require('assert');

describe('git:git remote -v', function () { 
    it(`should return string when have git remote`, function () {
        return gitRemoteV().then(data => {
            assert.notEqual(data, null)
        })
    })
})