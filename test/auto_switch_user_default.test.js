const assert = require('assert');
const { v4: uuidv4 } = require('uuid');
const { REPO_DOES_NOT_EXISTS, USER_DOES_NOT_EXISTS } = require('../src/constants/global');
const { autoSwitchUser } = require("../src/controllers/commands/forward_command");
const runCreateRepoTest = require("./create_repo.test");
const runCreateUserTest = require('./create_user.test');
const { randomRepo, randomUser } = require("./util")

let user1 = randomUser();
let user2 = randomUser();


Promise.all([
    runCreateUserTest(user1),
    runCreateUserTest(user2)
]).then(([userResult1, userResult2]) => {

    let repo1 = randomRepo(userResult1);
    let repo2 = randomRepo(userResult2);
    let repoDoesnotHaveUserID = randomRepo(userResult1);
    repoDoesnotHaveUserID.userID = uuidv4()
    runCreateRepoTest(repoDoesnotHaveUserID)
    runCreateRepoTest(repo1)
    runCreateRepoTest(repo2)

    let testCases = [
        {
            name: "OK",
            stub: () => {
                return autoSwitchUser(repo1.url)
            },
            check: (data) => {
                assert.equal(data.id, userResult1.id)
            }
        },
        {
            name: "Repo not found",
            stub: () => {
                return autoSwitchUser("<repo1.url>")
            },
            check: (data) => {
                assert.equal(data, REPO_DOES_NOT_EXISTS)
            }
        },
        {
            name: "User not found",
            stub: () => {
                return autoSwitchUser(repoDoesnotHaveUserID.url)
            },
            check: (data) => {
                assert.equal(data, USER_DOES_NOT_EXISTS)
            }
        }
    ]

    describe('autoswitch user', function () {
        testCases.forEach(element => {
            it(element.name, function () {
                let data = element.stub()
                element.check(data)
            })
        })

    })

})


