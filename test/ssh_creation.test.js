const {
    createSHHKey,
} = require('../ssh/ssh_key_creation');
const { randomUser } = require('./util')
const {
    USERNAME_EMPTY,
    FILE_ALREADY_EXISTS
} = require('../constants/global')
const assert = require('assert');

let username = `${randomUser().username + Date.now()}`;

let testcases = [
    {
        name: `should return ${USERNAME_EMPTY} when empty username`,
        stub: (check) => {
            return createSHHKey('').catch(check)
        },
        check: (err) => {
            assert.equal(err, USERNAME_EMPTY)
        }
    },
    {
        name: `should return ${USERNAME_EMPTY} when undifined username`,
        stub: (check) => {
            return createSHHKey(undefined).catch(check)
        },
        check: (err) => {
            assert.equal(err, USERNAME_EMPTY)
        }
    },
    {
        name: `should return ${USERNAME_EMPTY} when null username`,
        stub: (check) => {
            return createSHHKey(null).catch(check)
        },
        check: (err) => {
            assert.equal(err, USERNAME_EMPTY)
        }
    },
    {
        name: `OK`,
        stub: (check) => {
            return createSHHKey(username).then(check)
        },
        check: (data) => {
            const [privateKeyPath, publicKeyPath] = data
            assert.notEqual(data, null)
            assert.notEqual(data, '')
            assert.notEqual(data, undefined)
            assert.notEqual(data, [])

            assert.notEqual(privateKeyPath, null)
            assert.notEqual(privateKeyPath, '')
            assert.notEqual(privateKeyPath, undefined)

            assert.notEqual(publicKeyPath, null)
            assert.notEqual(publicKeyPath, '')
            assert.notEqual(publicKeyPath, undefined)

        }
    },
    {
        name: `should return err exist ssh key`,
        stub: (check) => {
            return createSHHKey(username).catch(check)
        },
        check: (data) => {
            assert.equal(data, FILE_ALREADY_EXISTS)
        }
    }
]

describe('ssh:save file', function () { 

    testcases.forEach(element => {
        it(element.name, function () {
            return element.stub(element.check)
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