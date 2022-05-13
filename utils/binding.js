const constants = require('../constants/global');

module.exports = {
    toMessage: (code) => {
        switch(code) {
            case constants.USERNAME_EMPTY:
                return "username doesnt empty!"
            case constants.EMAIL_EMPTY:
                return "email doesnt empty!"
            case constants.USER_ALREADY_EXISTS:
                return "user already exists"
            default:
                return `${code}`
        }
    }
}