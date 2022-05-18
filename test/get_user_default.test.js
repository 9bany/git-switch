const assert = require('assert');
const { getUserDefault } = require("../src/controllers");
const runCreateUserTest = require("./create_user.test");
const runSwitchUser = require('./switch_user.test');
const { randomUser } = require("./util");

let user = randomUser();

runSwitchUser(user).then(userResult => {

    let testCases = [
        {
            name: "OK",
            stub: () => {
                return getUserDefault()
            },
            check: (data) => {
                assert.notEqual(data.username, '')
                assert.notEqual(data.username, null)
                assert.notEqual(data.username, undefined)

                assert.notEqual(data.email, '')
                assert.notEqual(data.email, null)
                assert.notEqual(data.email, undefined)


                assert.notEqual(data.id, '')
                assert.notEqual(data.id, null)
                assert.notEqual(data.id, undefined)

                assert.notEqual(data.privateKeyPath, '')
                assert.notEqual(data.privateKeyPath, null)
                assert.notEqual(data.privateKeyPath, undefined)

                assert.notEqual(data.publicKeyPath, '')
                assert.notEqual(data.publicKeyPath, null)
                assert.notEqual(data.publicKeyPath, undefined)
            }
        },
    ]
    
    describe('get user-default', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                let data = element.stub()
                element.check(data)
            })
        })
    
    })
})
