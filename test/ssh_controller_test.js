const {
    createSHHKey,
} = require('./../ssh/ssh_key_creation');

const {
    USERNAME_EMPTY
} = require('./../constants/global')
const assert = require('assert');

describe('ssh:save file', function () { 


    it(`should return ${USERNAME_EMPTY} when empty username`, function () {
        return createSHHKey('').catch(err => {
            assert.equal(err, USERNAME_EMPTY)
        })
    })

    it(`should return ${USERNAME_EMPTY} when undifined username`, function () {
        return createSHHKey('').catch(err => {
            assert.equal(err, USERNAME_EMPTY)
        })
    })

    it(`should return ${USERNAME_EMPTY} when null username`, function () {
        return createSHHKey('').catch(err => {
            assert.equal(err, USERNAME_EMPTY)
        })
    })

})

function testCreateSSHKeyOK(username) {
    it(`should return paths when valid username`, function () {
        return createSHHKey(username).then(data => {
            assert.notEqual(data, null)
        })
    })
}

module.exports = testCreateSSHKeyOK;