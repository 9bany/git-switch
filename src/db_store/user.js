const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, email, privateKeyPath, publicKeyPath, id = uuidv4()) {
        this.id = id || uuidv4();
        this.username = username
        this.email = email
        this.privateKeyPath = privateKeyPath
        this.publicKeyPath = publicKeyPath
        this.createdAt = Date.now()
    }
}

module.exports = User;
