const store = require('../../../store/mysql');
const controller = require('./auth.controller');

module.exports = controller(store)
