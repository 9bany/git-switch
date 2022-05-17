const { DB_CONFIG_PATH, DB_CONFIG_FILENAME } = require("../src/constants/config");
const fs = require('fs');
const path = require("path");
let pathFolder = path.resolve(process.cwd(), DB_CONFIG_PATH);

function initSystem() {
    return new Promise((resolve, reject) => { 
        const pathFile = path.resolve(pathFolder, DB_CONFIG_FILENAME)
        if (!fs.existsSync(pathFile)) {
            fs.mkdir(pathFolder, { recursive: true }, (err) => {
                if (err) throw err;
                const obj = {
                    "users": [],
                    "repos": [],
                    "default": []
                };
                
                const data = JSON.stringify(obj);
                
                fs.writeFile(pathFile, data, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Data store inited");
                    resolve()
                });
            });
        } else {
            resolve()
        }
    })   
}

function checkInitSystem() {
    const pathFile = path.resolve(pathFolder, DB_CONFIG_FILENAME)
    return fs.existsSync(pathFile)
}

module.exports = {
    checkInitSystem,
    initSystem
};