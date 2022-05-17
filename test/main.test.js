const db = require('../src/db_store/db');
const Store = require('../src/db_store/store');
const storeTest = new Store(db) 
module.exports = storeTest;