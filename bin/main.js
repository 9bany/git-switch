#!/usr/bin/env node
const yargs = require("yargs");
const dotenv = require( "dotenv");
const info = require('./info');
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../.env') });

info();

const options = yargs
    .usage("Usage: -c <curl>")
    .option("c", { alias: "curl", describe: "Your curl", type: "string", demandOption: true })
    .argv;