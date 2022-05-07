const User = require('./../db_store/user');
const { randomEmail, randomUsername } = require('./../utils/index')
const { 
    createNewUser,
    updateUser,
    deleteUser,
    listUser,
    switchUser,
    getUserDefault,
    checkUserRule,
    getUserInfo
} =require('../switch_control')
const { users } = require('../db_store/db/db.json')
const assert = require('assert');
const {
  USERNAME_EMPTY,
  EMAIL_EMPTY,
  USER_DOES_NOT_EXISTS
} = require('./../constants/global')


function randomUser() {
  return new User(randomUsername(), randomEmail())
}

function testCreateUserOk(user) {
  return new Promise((resolve, reject) => {
    describe('user-created', function () {
      it(`should return user when created new user`,async function () {
        const value = await createNewUser({ username: user.username, email: user.email})
        assert.equal(user.username, value.username)
        assert.equal(user.email, value.email)
        resolve(user)
      })
    })
  });
}

describe('switch_control:user creation', function () {
  describe('user-username invalid', function () {
    it(`should return ${USERNAME_EMPTY} when the value is undifined`, async function () {
      const value = await createNewUser({ username: undefined, email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });

    it(`should return ${USERNAME_EMPTY} when the value is ''`, async function () {
      const value = await createNewUser({ username: '', email: 'email@gmail.com'})
      assert.equal(value, USERNAME_EMPTY)
    });
  });

  describe('user-email invalid', function () {
    it(`should return ${EMAIL_EMPTY} when the value is undifined`, async function () {
      const value = await createNewUser({ username: 'username', email: undefined})
      assert.equal(value, EMAIL_EMPTY)
    });

    it(`should return ${EMAIL_EMPTY} when the value is ''`, async function () {
      const value = await createNewUser({ username: 'username', email: ''})
      assert.equal(value, EMAIL_EMPTY)
    });
  });
  const user = randomUser()
  testCreateUserOk(user)
});

describe('switch_control:user get infomation', function () {
  describe('user-username invalid', function () {
    it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
      const value = getUserInfo({username: undefined})
      assert.equal(value, USERNAME_EMPTY)
    });
  });

  describe('user-username invalid', function () {
    it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
        const user = randomUser()
        const value = getUserInfo({username: user.username})
        assert.equal(value, USER_DOES_NOT_EXISTS)
    });
  });

  describe('get successed', function () {
    it(`should return user info when in happy case`, function () {
      const userData = randomUser()
      testCreateUserOk(userData).then(_ => {
        const value = getUserInfo({username: userData.username})
        assert.equal(value.username, userData.username)
        assert.equal(value.email, userData.email)
      })
    });
  });
});

describe('switch_control:user get infomation', function () {
    describe('user-username invalid', function () {
      it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
        const value = getUserInfo({username: undefined})
        assert.equal(value, USERNAME_EMPTY)
      });
    });
  
    describe('user-username does not exist', function () {
      it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
          const user = randomUser()
          const value = getUserInfo({username: user.username})
          assert.equal(value, USER_DOES_NOT_EXISTS)
      });
    });
  
    describe('get successed', function () {
      it(`should return user info when in happy case`, function () {
        const userData = users[Math.floor(Math.random()*users.length)]
        const value = getUserInfo({username: userData.username})
        assert.ok(Boolean(value.username) && Boolean(value.email) && Boolean(value.id))
        // assert.equal(value.username, userData.username)
      });
    });
  });



describe('switch_control:user update info', function () {
    describe('user-username invalid', function () {
      it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
        const value = updateUser({username: undefined})
        assert.equal(value, USERNAME_EMPTY)
      });
    });
  
    describe('user-username invalid', function () {
      it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
          const user = randomUser()
          const value = updateUser({username: user.username})
          assert.equal(value, USER_DOES_NOT_EXISTS)
      });
    });
  
    describe('get successed', function () {
      it(`should return user info when in happy case`, function () {
        const userData = users[Math.floor(Math.random()*users.length)]
        const value = updateUser({username: userData.username})
        assert.equal(value.id, userData.id)
      });
    });
});





describe('switch_control:delete user', function () {
    describe('user-username invalid', function () {
      it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
        const value = deleteUser({username: undefined})
        assert.equal(value, USERNAME_EMPTY)
      });
    });
  
    describe('user-username invalid', function () {
      it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
          const user = randomUser()
          const value = deleteUser({username: user.username})
          assert.equal(value, USER_DOES_NOT_EXISTS)
      });
    });
  
    describe('get successed', function () {
      it(`should return true when in happy case`, function () {
        const userData = users[Math.floor(Math.random()*users.length)]
        const value = deleteUser({username: userData.username})
        const userInfo = getUserInfo({username: userData.username})
        assert.ok(value == true && userInfo == USER_DOES_NOT_EXISTS)
      });
    });
});


describe('switch_control:get list user', function () {
 
    describe('get successed', function () {
      it(`should return list user when in happy case`, function () {
        const value = listUser()
        assert.ok(Array.isArray(value))
      });
    });
});





describe('switch_control:switch user', function () {
    describe('user-username invalid', function () {
        it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
          const value = switchUser({username: undefined})
          assert.equal(value, USERNAME_EMPTY)
        });
      });
    
      describe('user-username invalid', function () {
        it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
            const user = randomUser()
            const value = switchUser({username: user.username})
            assert.equal(value, USER_DOES_NOT_EXISTS)
        });
      });
    
      describe('get successed', function () {
        it(`should return user info with isDefault is true when in happy case`, function () {
            const userData = users[Math.floor(Math.random()*users.length)]
            const value = switchUser({username: userData.username})
            assert.equal(value.id, userData.id)
            assert.equal(value.isDefault, true)
          });
      });
});




describe('switch_control:get user default', function () {
   
    describe('get successed', function () {
        it(`should return user info with isDefault is true when in happy case`, function () {
            const value = getUserDefault()
            assert.equal(value.isDefault, true)
          });
    });
});




describe('switch_control:check user rule', function () {
    describe('user-username invalid', function () {
      it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
        const value = checkUserRule({username: undefined})
        assert.equal(value, USERNAME_EMPTY)
      });
    });
  
    describe('user-username invalid', function () {
      it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
          const user = randomUser()
          const value = checkUserRule({username: user.username})
          assert.equal(value, USER_DOES_NOT_EXISTS)
      });
    });
  
    describe('get successed', function () {
      it(`should return user rule (true/false) when in happy case`, function () {
        const userData = users[Math.floor(Math.random()*users.length)]
        const value = checkUserRule({username: userData.username})
        assert.ok(typeof value == "boolean")
      });
    });
});
