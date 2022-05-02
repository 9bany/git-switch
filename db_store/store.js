const User = require('./user');

class Store {
    constructor(db) {
        this.db = db 
    }

    createNew = (data) => {
        const { username, email } = data;
        const user = new User(username, email)
        this.db.get("users").push(user).write();
    }

    getUser = (username) => {
        return this.db.chain.get('users').find({ username: username }).value()
    }

    getUserList = () => {
        return this.db.get("users").value()
    }

    getUserDetault = () => {
        return this.db.get("default").value()
    }
}

module.exports = Store;