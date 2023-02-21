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

    if (data.id) {
      user.id = data.id
    } else {
      user.id = nanoid();
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password
      })

    }

    const rta = await store.upsert(TABLA, user);
    return rta
  }

  async function remove(id) {
    await store.remove(TABLA, id);
    return 'done'
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}
