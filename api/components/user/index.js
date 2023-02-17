const store = require('../../../store/dummy');
const controller = require('./user.controller');

module.exports = controller(store)
