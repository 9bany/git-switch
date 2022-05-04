const User = require('./user');
const { 
    USERNAME_EMPTY,
    EMAIL_EMPTY
} = require('./../constants/global')
class Store {
    constructor(db) {
        this.db = db 
    }

    createNew = (data) => {
        const { username, email } = data;
        if (!username || username === "") {
            return USERNAME_EMPTY
        }

        if (!email || email === "" ) {
            return EMAIL_EMPTY
        }
        const user = new User(username, email)
        this.db.get("users").push(user).write();
        return user
    }

    getUser = (username) => {
        
        if (!username || username === "") {
            return USERNAME_EMPTY
        }
        return this.db.get('users').find({ username: username }).value()
    }

    getUserList = () => {
        return this.db.get("users").value()
    }

    getUserDetault = () => {
        return this.db.get("default").value()
    }
}

module.exports = Store;