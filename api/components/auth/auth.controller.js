const auth = require('../../../auth');
const TABLA = 'auth';
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login (username, password) {
    const data = await store.query(TABLA, {username: username});
    const validate = await bcrypt.compare(password, data.password);
    if (validate) {
      delete data.password
      return auth.sign(data)
    } else {
        throw new Error('Información Invalida')
    }
  }

  async function upsert(data) {
    const authData = {
      id: data.id
    }

    if(data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password,10);
    }

    const rta = await store.upsert(TABLA, authData);
    return rta
  }


  return {
    upsert,
    login
  }
}
