const User = require('./../db_store/user');
const Repo = require('./../db_store/repo');

const { randomEmail, randomUsername, randomUrl } = require('./../utils')

function randomUser() {
    return new User(randomUsername(), randomEmail())
}

function randomRepo() {
    let user = randomUser()
    return new Repo(randomUrl(), user.id)
}

module.exports = {
    randomUser,
    randomRepo,
    allowRunTestOnMachine: () => {
        if (process.env.TEST_MODE === 'machine') {
            return true
        } else {
            return false
        }
    } 

}