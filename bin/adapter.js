const log = require('./../utils/log')
function adapter(options, listTypeHandle, callback = () => {}) {
    log.debug(options)
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