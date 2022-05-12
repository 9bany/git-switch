const User = require('./../db_store/user');
const Repo = require('./../db_store/repo');
const { v4: uuidv4 } = require('uuid');

const { randomEmail, randomUsername, randomUrl } = require('./../utils')

function randomUser() {
    return new User(randomUsername(), randomEmail(), '', '', uuidv4())
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