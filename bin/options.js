const yargs = require("yargs");

function options() {
    const options = yargs
    .usage("Usage: swgit -<option> <value> || commnand")
    // node bin/index.js --add.username=<username> --add.email=<email>
    .option("a", {
        alias: "add", 
        describe: "New account", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --get.username=<username>
    .option("g", {
        alias: "get", 
        describe: "get an account info with username", 
        type: "string", 
        demandOption: false 
    })
    // node bin/index.js --update.username=<username> --update.privateKeyPath=<privateKeyPath> --update.publicKeyPath=<publicKeyPath> --update.isDefault=<isDefault> --update.email=<email> --update.newUser=<new username>
    .option("u", {
        alias: "update", 
        describe: "update an account info with username", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --delete.username=<username> 
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
    // node bin/index.js --switch.username=<username>
    .options("s",{
        alias: "switch", 
        describe: "switch default user", 
        type: "object", 
        demandOption: false 
    })
    // node bin/index.js --default
    .option("df", {
        alias: "default", 
        describe: "get default user info", 
        type: "object", 
        demandOption: false 
    })
    //node bin/index.js --checkrule.username=<username>
    .option("check", {
        alias: "checkrule", 
        describe: "Check rule of user by username", 
        type: "object", 
        demandOption: false 
    })
    return options;
}

module.exports = options;
