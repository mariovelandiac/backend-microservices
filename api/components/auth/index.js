const store = require('../../../store/dummy');
const controller = require('./auth.controller');

module.exports = controller(store)
