const db = {
  user: [
    {id: 1, name: 'Mario', lastname: 'Velandia'},
    {id: 2, name: 'Ricardo', lastname: 'Ciendua'},
    {id: 3, name: 'Sofia', lastname: 'Veloza'}
  ]
};

async function list(table) {
  const data = db[table]
  return data;
}

async function get(table, id) {
  let col = await list(table);
  return col.find(item => item.id.toString() === id) || null
}

async function upsert(table, data) {
  db[table].push(data);
  return 'created'
}

async function remove(table, id) {
  const index = db[table].findIndex((item) => item.id == id);
  db[table].splice(index,1);
}


module.exports = {
  list,
  get,
  upsert,
  remove
}
