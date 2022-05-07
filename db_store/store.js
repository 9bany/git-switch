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
        const { 
            username, 
            email,
            privateKeyPath,
            publicKeyPath 
        } = data;
        const user = new User(username, email, privateKeyPath, publicKeyPath)
        this.db.get("users").push(user).write();
        return user
    }

    getUser = (username) => {
        return this.db.get('users').find({ username: username }).value()
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
}

module.exports = Store;