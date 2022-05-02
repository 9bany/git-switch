const User = require('./../db_store/user');
const { randomEmail, randomUsername } = require('./../utils/index')
const storeTest = require('./main_test');

const assert = require('assert');
const {
  USERNAME_EMPTY,
  EMAIL_EMPTY
} = require('./../constants/global')


function randomUser() {
  return new User(randomUsername(), randomEmail())
}

describe('Store', function () {
  describe('User-username invalid', function () {
    it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
      const value = storeTest.createNew({ username: undefined, email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });

    it(`should return ${USERNAME_EMPTY} when the value is ''`, function () {
      const value = storeTest.createNew({ username: '', email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });
  });

  describe('User-email invalid', function () {
    it(`should return ${EMAIL_EMPTY} when the value is undifined`, function () {
      const value = storeTest.createNew({ username: 'username', email: undefined})
      assert.equal(value, EMAIL_EMPTY)
    });

    it(`should return ${EMAIL_EMPTY} when the value is ''`, function () {
      const value = storeTest.createNew({ username: 'username', email: ''})
      assert.equal(value, EMAIL_EMPTY)
    });
  });
  describe('User-Created', function () {
    it(`should return user when created new  user`, function () {
      const user = randomUser()
      const value = storeTest.createNew({ username: user.username, email: user.email})
      assert.equal(user.username, value.username)
      assert.equal(user.email, value.email)
    })
    
  })
});