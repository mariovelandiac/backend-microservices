const store = require('../../../store/remote-mysql');
const controller = require('./user.controller');

module.exports = controller(store)
