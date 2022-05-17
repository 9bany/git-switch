const { randomUrl } = require("../src/utils");
const runCreateRepoTest = require("./create_repo.test");
const { getRepo } = require("../src/controllers");
const { randomRepo } = require("./util");
const assert = require('assert');
const { URL_EMPTY, REPO_DOES_NOT_EXISTS } = require("../src/constants/global");

let repoRandom = randomRepo();

runCreateRepoTest(repoRandom)

let testCases = [
    {
        name: "OK",
        stub: () => {
            return getRepo({ url: repoRandom.url})
        },
        check: (data) => {
            assert.equal(repoRandom.url, data.url)
            assert.equal(repoRandom.userID, data.userID)
        }
    },
    {
        name: "url invalud '' ",
        stub: () => {
            return getRepo({ url: ''})
        },
        check: (err) => {
            assert.equal(err, URL_EMPTY)
        }
    },
    {
        name: "url invalud null ",
        stub: () => {
            return getRepo({ url: null})
        },
        check: (err) => {
            assert.equal(err, URL_EMPTY)
        }
    },
    {
        name: "url invalud undefined ",
        stub: () => {
            return getRepo({ url: undefined})
        },
        check: (err) => {
            assert.equal(err, URL_EMPTY)
        }
    },
    {
        name: "repo not exist",
        stub: () => {
            return getRepo({ url: 'undefined'})
        },
        check: (err) => {
            assert.equal(err, REPO_DOES_NOT_EXISTS)
        }
    }
]

describe('repo: get', function () { 
    testCases.forEach(element => {
        it(element.name, function () {
            let data = element.stub()
            element.check(data)
        })
    })

})