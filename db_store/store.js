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
            publicKeyPath 
        } = data;
        const user = new User(username, email, privateKeyPath, publicKeyPath)

        this.db.get("users").push(user).write();

        this.db.get('users').find({ isDefault: true }).assign({
            isDefault: false,
        }).write()

        this.db.get('users').find({ username: username }).assign({
            isDefault: true,
        }).write()
        
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

    getUserDetault = () => {
        return this.db.get('users').find({ isDefault: true }).value()
    }

    updateUser = (data) => {
        const currentUserInfo = this.db.get('users').find({ username: data.username }).value();
        this.db.get('users').find({ username: data.username }).assign({
            username: data.newUser || currentUserInfo.username,
            email: data.email || currentUserInfo.email,
            privateKeyPath: data.privateKeyPath || currentUserInfo.privateKeyPath,
            publicKeyPath: data.publicKeyPath || currentUserInfo.publicKeyPath,
            isDefault: data.isDefault || currentUserInfo.isDefault,
        }).write()

        return this.db.get('users').find({ id: currentUserInfo.id }).value()
    }

    deleteUser = (user) => {
        this.db.get('users').remove({ username: user }).write()
        return true
    }

    switchUser = (user) => {
        this.db.get('users').find({ isDefault: true }).assign({
            isDefault: false,
        }).write()

        this.db.get('users').find({ username: user }).assign({
            isDefault: true,
        }).write()

        return this.db.get('users').find({ username: user }).value()
    }

    checkUserRule = (user) => {
        return this.db.get('users').find({ username: user }).value().isDefault
    }

    createRepo({ url, userID }) {
        let repo = new Repo(url, userID);
        this.db.get("repos").push(repo).write();
        return repo
    }

    getRepo(url) {
        return this.db.get('repos').find({ url: url }).value()
    }

    createUserDefault(user) {
        
        user.isDefault = true

        let data = this.db.get('default').value()
        if(data.length === 0) {
            this.db.get("default").push(user).write();
            return user 
        } else {
            this.db.get('default').find({ isDefault: true }).assign(user).write()
        }
        return user
    }

    getUserDefault() {
        return this.db.get("default").value()
    }
}

module.exports = Store;