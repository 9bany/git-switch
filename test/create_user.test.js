const { createNewUser } = require("../src/controllers")
const { randomUser } = require("./util")
const assert = require('assert')

function runCreateUserTest(user = randomUser()) {
    let testCases = [
        {
            name: "OK",
            stub: () => {
                return createNewUser({ username: user.username, email: user.email })
            },
            check: (data) => {
                assert.equal(user.username, data.username)
                assert.equal(user.email, data.email)
            }
        }
    ]

    return new Promise((resolve, reject) => {
        testCases.forEach(element => {
            describe("Create user", function() {
                it(element.name, function () {
                    return element.stub().then(data => {
                        element.check(data)
                        resolve(data)
                    })
                })
            })
        })
    })
    
}

runCreateUserTest()

module.exports = runCreateUserTest;