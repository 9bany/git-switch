const log = require('./../src/utils/log')
function adapter(options, listTypeHandle, callback = () => {}) {
    if(!options.verbose) {
        process.env.VERBOSE = false
    } else {
        process.env.VERBOSE = options.verbose
    }
    log.debug.info(options)
    let haveOption = false;
    listTypeHandle.forEach(element => {
        const { type, handle } = element
        let obj = options[type]
        if(obj) {
            handle(obj)
            haveOption = true;
            return;
        }
    });
    if(!haveOption) {
        callback(options)
    }
} 

module.exports = adapter;