const yargs = require("yargs");

function options() {
    const options = yargs
    .usage("Usage: swgit -<option> <value>")
    .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
        console.info(argv)
    })
    .option("a", {
        alias: "add", 
        describe: "New account", 
        type: "string", 
        demandOption: false 
    })
    .option("g", {
        alias: "get", 
        describe: "get an account info with username", 
        type: "string", 
        demandOption: false 
    })
    .argv;
    return options;
}

module.exports = options;