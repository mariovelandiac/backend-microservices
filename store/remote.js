const fetch = require('node-fetch')


function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  async function list(tabla) {
    return await req('GET', tabla);
  };

  // async function get(tabla, id) {

  // };

  // async function insert(table, data) {

  // };

  // async function update(table, data) {

  // };

  // async function query(table, query, join) {

  // };

  async function req(method, tabla, data) {
    let url = `${URL}/${tabla}`;

    const options = {
      method: method,
      headers:{
        'Content-Type': 'application/json'
      }
    };
    if (data) {
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
    list
  }

};


module.exports = createRemoteDB;
