const Store = require('./../db_store/store');
const assert = require('assert');
const {
  USERNAME_EMPTY,
  EMAIL_EMPTY
} = require('./../constants/global')

describe('Store', function () {
  describe('User-username invalid', function () {
    it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
      const store = new Store()
      const value = store.createNew({ username: undefined, email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });

    it(`should return ${USERNAME_EMPTY} when the value is ''`, function () {
      const store = new Store()
      const value = store.createNew({ username: '', email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });
  });

  describe('User-email invalid', function () {
    it(`should return ${EMAIL_EMPTY} when the value is undifined`, function () {
      const store = new Store()
      const value = store.createNew({ username: 'username', email: undefined})
      assert.equal(value, EMAIL_EMPTY)
    });

    it(`should return ${EMAIL_EMPTY} when the value is ''`, function () {
      const store = new Store()
      const value = store.createNew({ username: 'username', email: ''})
      assert.equal(value, EMAIL_EMPTY)
    });
  });

});