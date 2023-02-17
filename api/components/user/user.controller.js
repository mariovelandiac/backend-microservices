const TABLA = 'user';
const nanoid = require('nanoid');

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
    data = {
      id: nanoid(),
      ...data
    }
    const user = await store.upsert(TABLA, data);
    return user
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
