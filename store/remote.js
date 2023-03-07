const fetch = require('node-fetch')


function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  async function list(tabla) {
    return await req('GET', tabla);
  };

  async function get(tabla, id) {
    const data = {};
    data.id = id;
    return await req('GET', tabla, data);
  };

  async function insert(tabla, data) {
    return await req('POST', tabla, data);
  };

  async function update(tabla, data) {
    return await req('PATCH', tabla, data);
  };

  // async function query(table, query, join) {

  // };

  async function req(method, tabla, data) {

    let url = `${URL}/${tabla}`;
    if (data.id && method === 'GET') {
      url = `${URL}/${tabla}/${data.id}`;
    };

    const options = {
      method: method,
      headers:{
        'Content-Type': 'application/json'
      }
    };
    if (method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();
      return responseJson.body;
    } catch(e) {
      console.error(e);
    }
  }

  return {
    list,
    get,
    insert,
    update
  }

};


module.exports = createRemoteDB;
