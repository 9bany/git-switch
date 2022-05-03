const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");
const file = path.resolve(__dirname, './db/db.json')
const adapter = new FileSync(file);
const db = low(adapter);

module.exports = db;
