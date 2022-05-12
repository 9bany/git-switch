
const { randomUser } = require('./util')
const storeTest = require('./main.test');

const assert = require('assert');

const user = randomUser()
let testCases = [
  {
    name: 'user creation ok',
    stub: () => {
      return storeTest.createNew({ username: user.username, email: user.email})
    },
    check: (value) => {
      assert.equal(user.username, value.username)
      assert.equal(user.email, value.email)
    }
  },
  {
    name: 'get user info ok',
    stub: () => {
      return storeTest.getUser(user.username)
    },
    check: (value) => {
      assert.equal(user.username, value.username)
      assert.equal(user.email, value.email)
    }
  },
  {
    name: 'get user not found',
    stub: () => {
      return storeTest.getUser(randomUser().username + Date.now())
    },
    check: (value) => {
      assert.equal(undefined, value)
    }
  }
]

describe('db_store: user', function () {
  testCases.forEach(element => {
    it(element.name, function () {
      let result = element.stub()
      element.check(result)
    })
  })
});