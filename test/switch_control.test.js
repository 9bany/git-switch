const User = require('../src/db_store/user');
const Repo = require('../src/db_store/repo');
const { v4: uuidv4 } = require('uuid');
const { randomEmail, randomUsername, randomUrl } = require('../src/utils/index')

const {
  createNewUser,
  updateUser,
  deleteUser,
  listUser,
  switchUser,
  getUserDefault,
  checkUserRule,
  getUserInfo,
  createRepo,
  getRepo,
  getUserInfoById
} = require('../src/controllers')
const assert = require('assert');
const {
  USERNAME_EMPTY,
  EMAIL_EMPTY,
  USER_DOES_NOT_EXISTS,
  URL_EMPTY,
  ID_EMPTY,
  REPO_DOES_NOT_EXISTS
} = require('../src/constants/global');

function randomUser() {
  return new User(randomUsername(), randomEmail())
}

function randomRepo() {
  return new Repo(randomUrl(), uuidv4())
}

function testCreateUserOk(user) {
  return new Promise((resolve, reject) => {
    describe('user-created', function () {
      it(`should return user when created new user`, async function () {
        const value = await createNewUser({ username: user.username, email: user.email })
        assert.equal(user.username, value.username)
        assert.equal(user.email, value.email)
        resolve(value)
      })
    })
  });
}

function testCreateRepoOk(data) {
  return new Promise((resolve, reject) => {
    describe('repo-created', function () {
      it(`should return repo when created new repo`, async function () {
        const value = await createRepo({ url: data.url, userID: data.userID })
        assert.equal(data.url, value.url)
        assert.equal(data.userID, value.userID)
        resolve(data)
      })
    })
  });
}

describe('switch_control:user get infomation', function () {
  it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
    const value = getUserInfo(undefined)
    assert.equal(value, USERNAME_EMPTY)
  });
  it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
    const user = randomUser()
    const value = getUserInfo(user.username)
    assert.equal(value, USER_DOES_NOT_EXISTS)
  });
  it(`should return user info when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      const value = getUserInfo(userData.username)
      assert.ok(Boolean(value.username) && Boolean(value.email) && Boolean(value.id))
    })
  });
});

describe('switch_control:user get infomation by id', function () {
  it(`should return ${ID_EMPTY} when the value is undifined`, function () {
    const value = getUserInfoById(undefined)
    assert.equal(value, ID_EMPTY)
  });
  it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
    const value = getUserInfoById(uuidv4())
    assert.equal(value, USER_DOES_NOT_EXISTS)
  });
  it(`should return user info when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      console.log(_);
      const value = getUserInfoById(_.id)
      assert.ok(Boolean(value.username) && Boolean(value.email) && Boolean(value.id))
    })
  });
});

describe('switch_control:user update info', function () {
  it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
    const value = updateUser({ username: undefined })
    assert.equal(value, USERNAME_EMPTY)
  });
  it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
    const user = randomUser()
    const value = updateUser({ username: user.username })
    assert.equal(value, USER_DOES_NOT_EXISTS)
  });
  it(`should return user info when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      const value = updateUser({ username: userData.username })
      assert.equal(value.id, userData.id)
    })
  });
});

describe('switch_control:delete user', function () {
  it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
    const value = deleteUser({ username: undefined })
    assert.equal(value, USERNAME_EMPTY)
  });
  it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
    const user = randomUser()
    const value = deleteUser({ username: user.username })
    assert.equal(value, USER_DOES_NOT_EXISTS)
  });
  it(`should return true when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      const value = deleteUser({ username: userData.username })
      const userInfo = getUserInfo({ username: userData.username })
      assert.ok(value == true && userInfo == USER_DOES_NOT_EXISTS)
    })
  });
});

describe('switch_control:get list user', function () {
  it(`should return list user when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      const value = listUser()
      assert.ok(Array.isArray(value))
    })
  });
});

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

describe('switch_control:check user rule', function () {
  it(`should return ${USERNAME_EMPTY} when the value is undifined`, function () {
    const value = checkUserRule({ username: undefined })
    assert.equal(value, USERNAME_EMPTY)
  });
  it(`should return ${USER_DOES_NOT_EXISTS} when user is not found`, function () {
    const user = randomUser()
    const value = checkUserRule({ username: user.username })
    assert.equal(value, USER_DOES_NOT_EXISTS)
  });
  it(`should return user rule (true/false) when in happy case`, function () {
    const userData = randomUser()
    testCreateUserOk(userData).then(_ => {
      const value = checkUserRule({ username: userData.username })
      assert.ok(typeof value == "boolean")
    })
  });
});

describe('switch_control:repo creation', function () {
  it(`should return ${URL_EMPTY} when the value is undifined`, async function () {
    const value = await createRepo({ url: undefined, userID: uuidv4() })
    assert.equal(value, URL_EMPTY)
  });
  it(`should return ${URL_EMPTY} when the value is ''`, async function () {
    const value = await createRepo({ url: '', userID: uuidv4() })
    assert.equal(value, URL_EMPTY)
  });
  it(`should return ${ID_EMPTY} when the value is undifined`, async function () {
    const value = await createRepo({ url: randomUrl(), userID: undefined })
    assert.equal(value, ID_EMPTY)
  });
  it(`should return ${ID_EMPTY} when the value is ''`, async function () {
    const value = await createRepo({ url: randomUrl(), userID: '' })
    assert.equal(value, ID_EMPTY)
  });
  const repo = randomRepo()
  testCreateRepoOk(repo)
});

describe('switch_control:repo get infomation', function () {
  it(`should return ${URL_EMPTY} when the value is undifined`, function () {
    const value = getRepo({ url: undefined })
    assert.equal(value, URL_EMPTY)
  });
  it(`should return ${REPO_DOES_NOT_EXISTS} when repo is not found`, function () {
    const repo = randomRepo()
    const value = getRepo({ url: repo.url })
    assert.equal(value, REPO_DOES_NOT_EXISTS)
  });
  it(`should return repo info when in happy case`, function () {
    const repo = randomRepo()
    testCreateRepoOk(repo).then(_ => {
      const value = getRepo({ url: repo.url })
      assert.ok(Boolean(value.url) && Boolean(value.id) && Boolean(value.userID))
    })
  });
});