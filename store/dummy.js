const db = {
  user: [
    {id: 1, name: 'Mario', lastname: 'Velandia'},
    {id: 2, name: 'Ricardo', lastname: 'Ciendua'},
    {id: 3, name: 'Sofia', lastname: 'Veloza'}
  ]
};

function list(table) {
  return db[table];
}

function get(table, id) {
  let col = list(table);
  return col.find(item => item.id === id) || null
}

function upsert(table, data) {
  db[table].push(data);
}

function remove() {
  return true
}


module.exports = {
  list,
  get,
  upsert,
  remove
}
