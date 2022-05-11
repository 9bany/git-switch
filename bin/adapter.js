const log = require('./../utils/log')
function adapter(options, listTypeHandle) {
    log.debug(options)
    listTypeHandle.forEach(element => {
        const { type, handle } = element
        let obj = options[type]
        if(obj) {
            handle(obj)
            return;
        }
    });
} 

module.exports = adapter;