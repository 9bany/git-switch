const genUsername = require("unique-username-generator");
var randomEmail = require('random-email');

module.exports = {
    randomUsername: () => {
        return genUsername.generateUsername("", 2, 19);
    },
    randomEmail: () => {
        return randomEmail()
    }
}