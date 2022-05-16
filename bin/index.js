#!/usr/bin/env node

const dotenv = require("dotenv");
const path = require('path');
const options = require('./options');
const adapter = require('./adapter');
const {
    createNewUser,
    updateUser,
    deleteUser,
    listUser,
    switchUser,
    getUserDefault,
    checkUserRule,
    getUserInfo,
    cloneCommandControl,
    forWardCommand,
    userRepo
} = require('../controllers');
const updateUserAdminRepo = require("../controllers/options/update_user_repo");
const addExistRepo = require("../controllers/options/add_exist_repo");
const {
    initSystem,
    checkInitSystem
} = require("./init");
const log = require("../utils/log");

dotenv.config({ path: path.resolve(__dirname, '../.env') });

main();

function main() {
    options()
        .command('init', 'Init your tool before use', () => {}, (argv) => {
            initSystem().then(data => {
                log.user.info("OKKKKKKKKK, `swgit --help`")
            })
        })
        .command('*', 'All command with swgit', () => {}, (argv) => {
            if (!checkInitSystem()) {
                log.user.error("Please, run `swgit init` before use")
                return
            } 
            adapter(argv, [
                {
                    type: 'update',
                    handle: updateUser
                },
                {
                    type: 'delete',
                    handle: deleteUser
                },
                {
                    type: 'list',
                    handle: listUser
                },
                {
                    type: 'default',
                    handle: getUserDefault
                },
                {
                    type: 'checkrule',
                    handle: checkUserRule
                },
                {
                    type: 'add',
                    handle: createNewUser
                },
                {
                    type: 'switch',
                    handle: switchUser
                },
                {
                    type: 'clone',
                    handle: cloneCommandControl
                },
                {
                    type: 'get',
                    handle: getUserInfo
                },
                {
                    type: 'user-repo',
                    handle: userRepo
                },
                {
                    type: 'update-ur',
                    handle: updateUserAdminRepo
                },
                {
                    type: 'add-repo',
                    handle: addExistRepo
                },
            ], forWardCommand)
        })
        .argv;

}