const redis = require('redis');
const {config} = require('./../config/config');

const client = redis.createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
  password: config.redis.password
});



(async () => {
  await client.connect();
  console.log('Conectado a REDIS');
})();


async function list(tabla) {
  const value = await client.get(tabla);
  return JSON.parse(value);
};

async function get(tabla, id) {
  const document = `${tabla}_${id}`
  const value = await client.get(document);
  return JSON.parse(value);
};

async function upsert(tabla, data) {
  let key = tabla;
  if (data && data.id) {
    key = `${key}_${data.id}`
  };
  await client.setEx(key, 10, JSON.stringify(data));
  return true
};


module.exports = {
  list,
  get,
  upsert
}
