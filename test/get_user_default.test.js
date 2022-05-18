const assert = require('assert');
const { getUserDefault } = require("../src/controllers");
const runCreateUserTest = require("./create_user.test");
const { randomUser } = require("./util");

let user = randomUser();

runCreateUserTest(user).then(userResult => {

    let testCases = [
        {
            name: "OK",
            stub: () => {
                return getUserDefault()
            },
            check: (data) => {
                assert.equal(data, userResult)
            }
        }
    ]
    
    // describe('get user-default', function () { 
    //     testCases.forEach(element => {
    //         it(element.name, function () {
    //             let data = element.stub()
    //             element.check(data)
    //         })
    //     })
    
    // })
})


/*
describe('switch_control:switch user', function () {
    it(`should return ${USERNAME_EMPTY} when the value is undifined`, async function () {
      const value = await switchUser(undefined)
      assert.equal(value, USERNAME_EMPTY)
    });
    it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, async function () {
      const user = randomUser()
      const value = await switchUser(user.username)
      assert.equal(value, USER_DOES_NOT_EXISTS)
    });
    it(`should return user info with isDefault is true when in happy case`, function () {
      const userData = randomUser()
      testCreateUserOk(userData).then(async _ => {
        const value = await switchUser(userData.username)
        assert.equal(value.id, userData.id)
        assert.equal(value.isDefault, true)
      })
    });
  });
  
  describe('switch_control:get user default', function () {
    it(`should return user info with isDefault is true when in happy case`, function () {
      const userData = randomUser()
      testCreateUserOk(userData).then(_ => {
        switchUser(userData.username)
        const value = getUserDefault()
        assert.equal(value.isDefault, true)
      })
    });
  });

  */