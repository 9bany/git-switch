const User = require('./../src/db_store/user');
const Repo = require('./../src/db_store/repo');
const { v4: uuidv4 } = require('uuid');

const { 
    randomEmail, 
    randomUsername, 
    randomUrl, 
    randomPath,
} = require('./../src/utils')

function randomUser() {
    return new User(randomUsername(), randomEmail(), randomPath(), randomPath(), uuidv4())
}

function randomRepo(user = randomUser()) {
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