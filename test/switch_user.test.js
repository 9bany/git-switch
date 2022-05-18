const assert = require('assert');
const { USER_DOES_NOT_EXISTS, USERNAME_EMPTY } = require('../src/constants/global');
const { switchUser } = require('../src/controllers');
const runCreateUserTest = require('./create_user.test');
const { randomUser } = require('./util');

const userData = randomUser()

runSwitchUser(userData);

function runSwitchUser(user) {
    let testCases = [
        {
            name: "Username invalid '' ",
            stub: () => {
                return switchUser('')
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "Username invalid null ",
            stub: () => {
                return switchUser(null)
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "Username invalid undefined ",
            stub: () => {
                return switchUser(undefined)
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "user doesnt exists ",
            stub: () => {
                return switchUser('undefined')
            },
            check: (data) => {
                assert.equal(data, USER_DOES_NOT_EXISTS)
            }
        },
        {
            name: "OK",
            stub: () => {
                return switchUser(user.username)
            },
            check: (data) => {
                assert.equal(user.username, data.username)
            }
        },
        
    ]

    return new Promise((resolve, reject) => {
        runCreateUserTest(user).then(user => {
            describe('switch-user', function () {
                testCases.forEach(element => {
                    it(element.name, function () {
                        element.stub().then(data => {
                            element.check(data)
                            if(element.name === "OK") {
                                resolve(data)
                            }
                        }).catch(element.check)
                    });
                });
            });
        })
        
    })
}

module.exports = runSwitchUser;
