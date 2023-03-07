const TABLA = 'post';
// const nanoid = require('nanoid');
// const auth = require('../auth/');

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/mysql')
  }

  async function list() {
    const data = await store.list(TABLA);
    return data
  }

  return {
    list
  }
};
