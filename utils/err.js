
const { toMessage } = require('./binding');

function logError(code) {
    if(process.env.VERBOSE || true) {
        let err = new Error(`${toMessage(code)}`);
        console.error(err)
    }
}

module.exports = logError;