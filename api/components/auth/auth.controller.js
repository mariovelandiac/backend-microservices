const auth = require('../../../auth');
const TABLA = 'auth';
const bcrypt = require('bcrypt');
const error = require('./../../../utils/error');

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login(username, password) {
    let data = await store.query(TABLA, {username: username});
    const validate = await bcrypt.compare(password, data.password);
    if (validate) {
      data = JSON.parse(JSON.stringify(data));
      return auth.sign(data)
    } else {
        throw error('Información Invalida', 400);
    }
  }

  async function upsert(data, isNew) {
    const authData = {
      id: data.id,
    }

    if(data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password,10);
    }
    const rta = await store.upsert(TABLA, authData, isNew);
    return rta
  }


  return {
    upsert,
    login
  }
}
