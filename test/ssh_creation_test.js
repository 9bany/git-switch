const {
    createSHHKey,
} = require('../ssh/ssh_key_creation');
const { randomUser } = require('./util')
const {
    USERNAME_EMPTY,
    FILE_ALREADY_EXISTS
} = require('../constants/global')
const assert = require('assert');

let username = `${randomUser()+Date.now()}`;

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

    it(`should return paths when valid username`, function () {
        return createSHHKey(username).then(data => {
            assert.notEqual(data, null)
        })
    })

    it(`should return err exist ssh key`, function () {
        return createSHHKey(username).catch(err => {
            assert.equal(err, FILE_ALREADY_EXISTS)
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