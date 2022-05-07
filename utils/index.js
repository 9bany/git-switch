const genUsername = require("unique-username-generator");
var randomEmail = require('random-email');
var randomUrl = require('random-url');

module.exports = {
    randomUsername: () => {
        return genUsername.generateUsername("", 2, 19);
    },
    randomEmail: () => {
        return randomEmail({ domain: 'example.com' })
    },
    randomUrl: () => {
        return randomUrl('https');
    }
}