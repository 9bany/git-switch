const User = require('./user');
const Repo = require('./repo');

class Store {
    constructor(db) {
        this.db = db 
    }

    createNew = (data) => {
        const { 
            username, 
            email,
            privateKeyPath,
            publicKeyPath,
            id
        } = data;
        const user = new User(username, email, privateKeyPath, publicKeyPath, id)

        this.db.get("users").push(user).write();
        
        return user
    }

    getUser = (username) => {
        return this.db.get('users').find({ username: username }).value()
    }

    getUserById = (id) => {
        return this.db.get('users').find({ id: id }).value()
    }

    getUserList = () => {
        return this.db.get("users").value()
    }

    updateUser = (data) => {
        const currentUserInfo = this.db.get('users').find({ username: data.username }).value();
        this.db.get('users').find({ username: data.username }).assign({
            username: data.newUser || currentUserInfo.username,
            email: data.email || currentUserInfo.email,
            privateKeyPath: data.privateKeyPath || currentUserInfo.privateKeyPath,
            publicKeyPath: data.publicKeyPath || currentUserInfo.publicKeyPath
        }).write()

        return this.db.get('users').find({ id: currentUserInfo.id }).value()
    }

    deleteUser = (user) => {
        this.db.get('users').remove({ username: user }).write()
        return true
    }

    switchUser = (user) => {
        return user
    }

    checkUserRule = (user) => {
        return this.db.get('users').find({ username: user }).value()
    }

    createRepo({ url, userID }) {
        let repo = new Repo(url, userID);
        this.db.get("repos").push(repo).write();
        return repo
    }

    getRepo(url) {
        return this.db.get('repos').find({ url: url }).value()
    }

    updateUserAdminRepo({ repoID, userID }) {
        this.db.get('repos').find({ id: repoID }).assign({
            userID: userID,
        }).write()
        return this.db.get('repos').find({ id: repoID }).value()
    }

    createUserDefault(user) {

        let data = this.db.get('default').value()
        if(data.length === 0) {
            this.db.get("default").push(user).write();
            return user 
        } else {
            let userDefault = data[0]
            this.db.get('default').find({ id: userDefault.id }).assign(user).write()
        }
        return user
    }

    getUserDefault() {
        return this.db.get("default").value()
    }
}

module.exports = Store;