#!/usr/bin/env node

const dotenv = require( "dotenv");
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

dotenv.config({path: path.resolve(__dirname, '../.env') });

main();

function main() {
    options()
    .command('config', 'swgit config', () => {}, (argv)=> {
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
        ])
    })
    .command('*', 'All command with swgit', () => {}, (argv) => {
        adapter(argv, [
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
        ], forWardCommand)
    })
    .argv;
}