const { randomRepo } = require('./util')
const storeTest = require('./main.test');
const assert = require('assert');

describe('db_store: repo', function () {
    it(`should return repo info when create successfully`, function () { 
        const repo = randomRepo()
        let storedRepo = storeTest.createRepo({ url: repo.url, userID: repo.userID })
        assert.equal(storedRepo.url, repo.url)
        assert.equal(storedRepo.userID, repo.userID)
    }) 
});