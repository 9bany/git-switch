const genUsername = require("unique-username-generator");
var randomEmail = require('random-email');
var randomUrl = require('random-url');
const { 
    EMPTY_STRING,
    PARSING_ERR
} = require('./../constants/global');

module.exports = {
    randomUsername: () => {
        return genUsername.generateUsername("", 2, 19);
    },
    randomEmail: () => {
        return randomEmail({ domain: 'example.com' })
    },
    randomUrl: () => {
        return randomUrl('https');
    },
    getURLString: (str) => {
        if (!str) {
            return EMPTY_STRING
        }
        let stringToArrayWithWhiteSpace = str.split(' ');
    
        if (stringToArrayWithWhiteSpace.length == 0 || !stringToArrayWithWhiteSpace[0]) {
            return PARSING_ERR
        }
        
        let stringToArrayWithTab = stringToArrayWithWhiteSpace[0].split('\t')

        if (stringToArrayWithTab.length == 0 || !stringToArrayWithTab[1]){ 
            return PARSING_ERR
        }
        return stringToArrayWithTab[1]
    }
}