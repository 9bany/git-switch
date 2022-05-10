
const { toMessage } = require('./binding');

function logError(code) {
    let err = new Error(`${toMessage(code)}`)
    console.error(err)
}

module.exports = logError;