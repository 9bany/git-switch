
const { toMessage } = require('./binding');

function logError(code) {
    if(process.env.VERBOSE || true) {
        let err = new Error(`${toMessage(code)}`);
        console.error(err)
    }
}

function log(message) {
    if(process.env.VERBOSE || true) {
        console.error(message)
    }
}

module.exports = {
    logError,
    log
};