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
    forWardCommand
} = require('../controllers');

dotenv.config({path: path.resolve(__dirname, '../.env') });

main();

function main() {
    options()
    .command('config', 'swgit config', () => {}, (argv)=> {
        adapter(argv, [
            {
                type: 'add',
                handle: createNewUser
            },
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
                type: 'switch',
                handle: switchUser
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
        ], forWardCommand)
    })
    .argv;
}