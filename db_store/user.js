const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, email, privateKeyPath, publicKeyPath) {
        this.id = uuidv4();
        this.username = username
        this.email = email
        this.privateKeyPath = privateKeyPath
        this.publicKeyPath = publicKeyPath
        this.isDefault = false
        this.createdAt = Date.now()
    }
}

module.exports = User;
