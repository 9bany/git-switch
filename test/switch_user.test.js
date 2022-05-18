const assert = require('assert');
const { USER_DOES_NOT_EXISTS, USERNAME_EMPTY } = require('../src/constants/global');
const { switchUser } = require('../src/controllers');
const runCreateUserTest = require('./create_user.test');
const { randomUser } = require('./util');

const userData = randomUser()

runCreateUserTest(userData).then(user => {

    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return switchUser(user.username).then(check).catch(check)
            },
            check: (data) => {
                assert.equal(user.username, data.username)
            }
        },
        {
            name: "Username invalid '' ",
            stub: (check) => {
                return switchUser('').then(check).catch(check)
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "Username invalid null ",
            stub: (check) => {
                return switchUser(null).then(check).catch(check)
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "Username invalid undefined ",
            stub: (check) => {
                return switchUser(undefined).then(check).catch(check)
            },
            check: (data) => {
                assert.equal(data, USERNAME_EMPTY)
            }
        },
        {
            name: "user doesnt exists ",
            stub: (check) => {
                return switchUser('undefined').then(check).catch(check)
            },
            check: (data) => {
                assert.equal(data, USER_DOES_NOT_EXISTS)
            }
        },
        
    ]
    
    describe('switch-user', function () {
        testCases.forEach(element => {
            it(element.name, function () {
                element.stub(element.check)
            });
        });
    });
})
