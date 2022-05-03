const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, email) {
        this.id = uuidv4();
        this.username = username
        this.email = email
        this.sshKeyPath = null
        this.isDefault = false
    }
}

module.exports = User;
