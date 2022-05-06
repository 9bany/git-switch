const genKey = require('./../ssh/gen');
const assert = require('assert');

describe('ssh:gen', function () { 
    it(`should return keys when created new key`, function () {
        const { privateKeyResult, publicKeyResult } = genKey()
        assert.notEqual(privateKeyResult, null)
        assert.notEqual(privateKeyResult, undefined)
        assert.notEqual(publicKeyResult, null)
        assert.notEqual(publicKeyResult, undefined)
    })
})