const { createRepo } = require("../controllers");
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');
const { randomRepo } = require('./util');
const { URL_EMPTY, ID_EMPTY } = require("../constants/global");

let repoRandom = {
    url: randomRepo(),
    userID: uuidv4()
}
let testCases = [
    {
        name: "OK",
        stub: () => {
            return createRepo({ url: repoRandom.url, userID: repoRandom.userID })
        },
        check: (data) => {
            assert.equal(repoRandom.url, data.url)
            assert.equal(repoRandom.userID, data.userID)
        }
    },
    {
        name: "User invalid with '' ",
        stub: () => {
            return createRepo({ url: repoRandom.url, userID: '' })
        },
        check: (error) => {
            assert.equal(error, ID_EMPTY)
        }
    },
    {
        name: "User invalid with undifined ",
        stub: () => {
            return createRepo({ url: repoRandom.url, userID: undefined })
        },
        check: (error) => {
            assert.equal(error, ID_EMPTY)
        }
    },
    {
        name: "User invalid with null",
        stub: () => {
            return createRepo({ url: repoRandom.url, userID: null })
        },
        check: (error) => {
            assert.equal(error, ID_EMPTY)
        }
    },
    {
        name: "URL invalid with '' ",
        stub: () => {
            return createRepo({ url: '', userID: repoRandom.userID })
        },
        check: (error) => {
            assert.equal(error, URL_EMPTY)
        }
    },
    {
        name: "URL invalid with undifined ",
        stub: () => {
            return createRepo({ url: undefined, userID: repoRandom.userID })
        },
        check: (error) => {
            assert.equal(error, URL_EMPTY)
        }
    },
    {
        name: "URL invalid with null ",
        stub: () => {
            return createRepo({ url: null, userID: repoRandom.userID })
        },
        check: (error) => {
            assert.equal(error, URL_EMPTY)
        }
    },
]

describe('repo: creation', function () { 
    testCases.forEach(element => {
        it(element.name, function () {
            let data = element.stub()
            element.check(data)
        })
    })

})