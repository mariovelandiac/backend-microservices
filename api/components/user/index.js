const {config} = require('./../../../config/config');

let store, cache;
if (config.remoteDB) {
  store = require('../../../store/remote-mysql');
  cache = require('../../../store/remote-redis');
} else {
  store = require('./../../../store/mysql');
  cache = require('./../../../store/redis');
};
const controller = require('./user.controller');

module.exports = controller(store, cache)
