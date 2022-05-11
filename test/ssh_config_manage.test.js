const { updateSSHConfig } = require('../ssh/ssh_config_manage');
const testCreateSSHKeyOK = require('./ssh_creation.test');
const { SSH_ROOT_PATH } = require('../constants/config')
const { allowRunTestOnMachine } = require('./util')
const { randomUser } = require('./util')
const assert = require('assert');
const {
    OK,
    INVALID,
    NOT_FOUND
} = require('../constants/global');

let usernameOld = `${randomUser().username}`;
let userNameNew = `${randomUser().username}`;

let testCases = [
    {
        name: "OK",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', newIdentity: SSH_ROOT_PATH + `/${userNameNew}`
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, OK)
        }
    },
    {
        name: "host invalid EMPTY",
        stub: (check) => {
            return updateSSHConfig({ 
                host: '', newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "host invalid null",
        stub: (check) => {
            return updateSSHConfig({ 
                host: null, newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "host invalid undefined",
        stub: (check) => {
            return updateSSHConfig({ 
                host: undefined, newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "newIdentity invalid empty",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', newIdentity: ''
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "newIdentity invalid null",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', newIdentity: null
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "newIdentity invalid undefined",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', newIdentity: undefined
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "host not found",
        stub: (check) => {
            return updateSSHConfig({ 
                host: '<mother_fucker_host>', newIdentity: SSH_ROOT_PATH + `/${userNameNew}`
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, NOT_FOUND + '<mother_fucker_host>')
        }
    },
    {
        name: "new identity not found",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', newIdentity: '.ssh/mother_fucker_path'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, NOT_FOUND + '.ssh/mother_fucker_path')
        }
    },
]

describe('ssh config manage', function () { 
    describe('update config', function () { 
        testCreateSSHKeyOK(usernameOld)
        testCreateSSHKeyOK(userNameNew)
        if(allowRunTestOnMachine()) {
            testCases.forEach(element => {
                it(element.name, function () {
                    return element.stub(element.check)
                })    
            })
        }
    })
})