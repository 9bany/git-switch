
const { toMessage } = require('./binding');
const logger = require('node-color-log');

function logDebug(message) {
    if(process.env.DEBUG === 'true') {
        console.log(message)
    }
}

module.exports = {
    success: (message) => {
        logger.success(message);
    },
    info: (message) => {
        logger.info(message);
    },
    warn: (message) => {
        logger.warn(message);
    },
    error: (code) => {
        let err = new Error(`${toMessage(code)}`);
        logger.error(err.toString());
    },
    debug: (message) => {
        if(process.env.DEBUG || 'true') {
            logger.debug(message);
        }
    },

}
