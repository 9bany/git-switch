
const util = require('util')
const { toMessage } = require('./binding');
const { color, log } = require('console-log-colors');

function logDebug(message) {
    if(process.env.DEBUG === 'true') {
        console.log(message)
    }
}

const MODE = {
    SUCCESS: 'SUCCESS',
    INFO: 'INFO', 
    ERROR: 'ERROR',
}

function logWithMode(message, mode, title = '') {
    var result 
    if (typeof message === 'object') {
        result = util.inspect(message, false, null, true)
    } else {
        result = message
    }
    
    switch(mode) {
        case MODE.SUCCESS:
            log.green(`${title} ${result}`)
            break
        case MODE.ERROR:
            let err = new Error(`${toMessage(result)}`);
            log.red(`${title} ${err.toString()}`)
            break
        case MODE.INFO:
            log.blue(`${title} ${result}`)
            break
        default: 
            log.blue(`${title} ${result}`)
            break
    }
}

module.exports = {
    user: {
        error: (message) => {
            logWithMode(message, MODE.ERROR, 'USER')
        },
        success: (message) => {
            logWithMode(message, MODE.SUCCESS, 'USER')
        },
        info: (message) => {
            logWithMode(message, MODE.INFO, 'USER')
        },
    },
    verbose: {
        error: (message) => {
            logWithMode(message, MODE.ERROR, 'VERBOSE')
        },
        success: (message) => {
            logWithMode(message, MODE.SUCCESS, 'VERBOSE')
        },
        info: (message) => {
            logWithMode(message, MODE.INFO, 'VERBOSE')
        },
    },
    debug: {
        error: (message) => {
            logWithMode(message, MODE.ERROR, 'DEBUG')
        },
        success: (message) => {
            logWithMode(message, MODE.SUCCESS, 'DEBUG')
        },
        info: (message) => {
            logWithMode(message, MODE.INFO, 'DEBUG')
        },
    },
}
