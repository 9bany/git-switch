
const { randomUser } = require('./util')
const storeTest = require('./main.test');

const assert = require('assert');

function testCreateUserOk(user) {
  return new Promise((resolve, reject) => {
    describe('user-created', function () {
      it(`should return user when created new user`, function () {
        const value = storeTest.createNew({ username: user.username, email: user.email})
        assert.equal(user.username, value.username)
        assert.equal(user.email, value.email)
        resolve(user)
      })
    })
  });
}

describe('db_store:user creation', function () {
  const user = randomUser()
  testCreateUserOk(user)
});

describe('db_store:user get infomation', function () {
  describe('get successed', function () {
    it(`should return user info when in happy case`, function () {
      const userData = randomUser()
      testCreateUserOk(userData).then(_ => {
        const value = storeTest.getUser(userData.username)
        assert.equal(value.username, userData.username)
        assert.equal(value.email, userData.email)
      })
    });
  });
});