const mysql = require('mysql');
const {config} = require('./../config/config');
const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// CONNECT
let connection;

(function handleCon() {
  connection = mysql.createConnection(dbconf);
  connection.connect((err) => {
    if (err) {
      console.error('[dberr]', err);
    } else {
      console.log('[db connected]')
    }

    // setTimeout(handleCon, 2000); // en caso de haber un problema de conección, se puede reintentar

    connection.on('error', err => {
      console.error('[dberr]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleCon()
      } else {
        throw err;
      };
    });
  });
})()


// funciones del store

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        return reject(err)
      } else {
        resolve(data)
      };
    });
  });
};

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id ='${id}'`, (err, data) => {
      if (err) {
        return reject(err)
      } else {
        resolve(data)
      };
    });
  });
};

function insert(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

async function upsert(table, data, isNew) {
  if (!isNew) {
      return await update(table, data);
  } else {
      return await insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
          if (err) return reject(err);
          resolve(res[0] || null);
      })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
};
