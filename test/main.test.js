const db = require('../db_store/db');
const Store = require('../db_store/store');
const storeTest = new Store(db) 
module.exports = storeTest;