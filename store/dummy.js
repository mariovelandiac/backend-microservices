const db = {
  user: [
    {id: 1, username: 'mariovelandiac', name: 'Mario', lastname: 'Velandia'},
    {id: 2, username: 'ricardovelandia', name: 'Ricardo', lastname: 'Ciendua'},
    {id: 3, username: 'sofiaveloza2', name: 'Sofia', lastname: 'Veloza'}
  ]
};

async function list(table) {
  const data = db[table];
  return data;
}

async function get(table, id) {
  let col = await list(table);
  return col.find(item => item.id.toString() === id) || null
}

async function upsert(table, data) {

  if (!db[table]) {
    db[table] = [];

  }
  db[table].push(data);
  return 'created'
}

async function remove(table, id) {
  const index = db[table].findIndex((item) => item.id == id);
  db[table].splice(index,1);
}

async function query(table, q) {
  let col = await list(table);
  let keys = Object.keys(q);
  const key = keys[0]; // porque segun el profesor el usuario está en la posición uno de q
  return col.find(item => item[key] === q[key]) || null
}


module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
