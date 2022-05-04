const yargs = require("yargs");

function options() {
    const options = yargs
    .usage("Usage: swgit -<option> <value>")
    .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
        console.info(argv)
    })
    // node bin/index.js --add.user=<username> --add.email=<email>
    .option("a", {
        alias: "add", 
        describe: "New account", 
        type: "object", 
        demandOption: false 
    })
    .option("g", {
        alias: "get", 
        describe: "get an account info with username", 
        type: "string", 
        demandOption: false 
    })
    // node bin/index.js --update.user=<username> --update.sshKeyPath=<sshKeyPath> --update.isDefault=<isDefault> --update.email=<email> --update.newUser=<new username>
    .option("u", {
        alias: "update", 
        describe: "udate an account info with username", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --delete.user=<username> 
    .option("d", {
        alias: "delete", 
        describe: "delete an account with username", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --list
    .options("l",{
        alias: "list", 
        describe: "get user list", 
        type: undefined, 
        demandOption: false 
    })
    // node bin/index.js --switch.user=<username>
    .options("s",{
        alias: "switch", 
        describe: "switch default user", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --default
    .option("df", {
        alias: "default", 
        describe: "switch default user", 
        type: "object", 
        demandOption: false 
    })
    //node bin/index.js --checkrule.user=<username>
    .option("check", {
        alias: "checkrule", 
        describe: "switch default user", 
        type: "object", 
        demandOption: false 
    })
    .argv;
    return options;
}

module.exports = options;