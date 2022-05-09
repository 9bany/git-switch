const { updateSSHConfig } = require('./../ssh/ssh_config_manage');
const testCreateSSHKeyOK = require('./ssh_controller_test');
const { SSH_ROOT_PATH } = require('./../constants/config')

const assert = require('assert');
const {
    OK,
    INVALID,
    NOT_FOUND
} = require('./../constants/global');

let usernameOld = '1bany';
let userNameNew = '1bany1';

let testCases = [
    {
        name: "OK",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity: SSH_ROOT_PATH + `/${usernameOld}`, newIdentity: SSH_ROOT_PATH + `/${userNameNew}`
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
                host: '', identity:  '.ssh/id_rsa', newIdentity: '.ssh/id_'
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
                host: null, identity:  '.ssh/id_rsa', newIdentity: '.ssh/id_'
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
                host: undefined, identity:  '.ssh/id_rsa', newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "identity invalid empty",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity:  '', newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "identity invalid null",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity:  null, newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, INVALID)
        }
    },
    {
        name: "identity invalid undefined",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity:  undefined, newIdentity: '.ssh/id_'
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
                host: 'github.com', identity:  'undefined', newIdentity: ''
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
                host: 'github.com', identity:  'undefined', newIdentity: null
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
                host: 'github.com', identity:  'undefined', newIdentity: undefined
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
                host: '<mother_fucker_host>', identity: SSH_ROOT_PATH + `/${usernameOld}`, newIdentity: SSH_ROOT_PATH + `/${userNameNew}`
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, NOT_FOUND + '<mother_fucker_host>')
        }
    },
    {
        name: "identity not found",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity:  '.ssh/mother_fucker_path', newIdentity: '.ssh/id_'
            }).then(data=> check(data)).catch(err=> check(err))
        },
        check: (data) => {
            assert.equal(data, NOT_FOUND + '.ssh/mother_fucker_path')
        }
    },
    {
        name: "identity not found",
        stub: (check) => {
            return updateSSHConfig({ 
                host: 'github.com', identity:  SSH_ROOT_PATH + `/${usernameOld}`, newIdentity: '.ssh/mother_fucker_path'
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
        testCases.forEach(element => {
            it(element.name, function () {
                return element.stub(element.check)
            })    
        })
    })
})