const { v4: uuidv4 } = require('uuid');

class Repo {
    constructor(url, userID) {
        this.id = uuidv4();
        this.url = url
        this.userID = userID 
        this.createdAt = Date.now()
    }
}

module.exports = Repo;