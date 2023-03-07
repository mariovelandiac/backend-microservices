const {config} = require('./../../../config/config');

let store
if (config.remoteDB) {
  store = require('../../../store/remote-mysql');
} else {
  store = require('./../../../store/mysql');
}
const controller = require('./user.controller');

module.exports = controller(store)
