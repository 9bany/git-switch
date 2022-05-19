const {
    getURLString
} = require('../src/utils/index')
const assert = require('assert');

const { 
    EMPTY_STRING,
    PARSING_ERR
} = require('../src/constants/global');

function verifyError(errMessage, data) {
    assert.notEqual(errMessage, null)
    assert.notEqual(errMessage, undefined)
    assert.notEqual(errMessage, '')
    assert.equal(errMessage, data)
}

let originUrlString = 'git@github.com:9bany/git-switch.git'

let testCases = [
    {
        name: 'should return err when empty',
        stub: () => {
            return getURLString('')
        },
        verify: (data) => {
            assert.equal(data, EMPTY_STRING)
        },
    },
    {
        name: 'should return err when undefined',
        stub: () => {
            return getURLString(undefined)
        },
        verify: (data) => {
            assert.equal(data, EMPTY_STRING)
        },
    },
    {
        name: 'should return err when null',
        stub: () => {
            return getURLString(null)
        },
        verify: (data) => {
            assert.equal(data, EMPTY_STRING)
        },
    },
    {
        name: 'should return err when err format',
        stub: () => {
            return getURLString('<err format>')
        },
        verify: (data) => {
            verifyError(data, PARSING_ERR)
        },
    },
    {
        name: 'should return err when does not have git in project',
        stub: () => {
            return getURLString('fatal: not a git repository (or any of the parent directories): .git')
        },
        verify: (data) => {
            verifyError(data, PARSING_ERR)
        },
    },
    {
        name: 'should return url string when ok',
        stub: () => {
            let gitRemoteData = `origin\t${originUrlString} (fetch)\n origin\t${originUrlString} (push)\n`
            return getURLString(gitRemoteData)
        },
        verify: (data) => {
            assert.equal(data, originUrlString)
        },
    },

]

describe('utils', function () { 
    describe('get-url', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                let data = element.stub()
                element.verify(data)
            })    
        })
    })
    
})