
const { randomUser } = require('./util')
const assert = require('assert');
const storeTest = require('./main.test');

const user = randomUser()

function checkUser(user, dataVerify) {
  assert.equal(user.username, dataVerify.username);
  assert.equal(user.email, dataVerify.email);
};

let testCases = [
  {
    name: 'user creation ok',
    stub: () => {
      return storeTest.createNew({ username: user.username, email: user.email, id: user.id })
    },
    check: (value) => {
      checkUser(user, value);
    }
  },
  {
    name: 'get user info ok',
    stub: () => {
      return storeTest.getUser(user.username);
    },
    check: (value) => {
      checkUser(user, value);
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
  },
  {
    name: 'get user by id ok',
    stub: () => {
      return storeTest.getUserById(user.id)
    },
    check: (value) => {
      checkUser(user, value);
    }
  },
  {
    name: 'get user by id not found',
    stub: () => {
      return storeTest.getUserById(randomUser().id + Date.now())
    },
    check: (value) => {
      assert.equal(undefined, value)
    }
  },
]

describe('db_store: user', function () {
  testCases.forEach(element => {
    it(element.name, function () {
      let result = element.stub()
      element.check(result)
    })
  })
});