const TABLA = 'user';
const nanoid = require('nanoid');
const auth = require('../auth/');

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function list() {
    const data = await store.list(TABLA);
    return data
  }

  async function get(id) {
    const user = await store.get(TABLA, id);
    return user
  }

  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username
    }

    let isNew;
    if (data.id) {
      user.id = data.id
      isNew = false;
    } else {
      user.id = nanoid();
      isNew = true
    }

    if (data.password || data.username) {
        await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      }, isNew);
    }
    const rta = await store.upsert(TABLA, user, isNew);
    return rta
  }

  async function remove(id) {
    await store.remove(TABLA, id);
    return 'done'
  };

  async function follow(from, to) {
    const data = {
      user_from: from,
      user_to: to
    }
    return await store.upsert(`${TABLA}_follow`, data, true)
  }

  async function following(id) {
    const join = {};
    join[TABLA] = 'user_to';
    const query = {user_from: id}
    const data = await store.query(`${TABLA}_follow`, query, join);
    return data
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following
  }
}
