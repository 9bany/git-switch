#!/usr/bin/env node

const dotenv = require( "dotenv");
const path = require('path');
const options = require('./options');
const adapter = require('./adapter');
const { createNewUser } = require('./../switch_control');

dotenv.config({path: path.resolve(__dirname, '../.env') });

main();

function main() {
    const optionsResult = options()
    adapter(optionsResult, [
        {
            type: 'add',
            handle: createNewUser
        }
    ])
}