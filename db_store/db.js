const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");
const file = path.resolve(__dirname, './db/database.json')
const adapter = new FileSync(file);
const db = low(adapter);

module.exports = db;
