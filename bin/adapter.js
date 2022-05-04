function adapter(options, listTypeHandle) {
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