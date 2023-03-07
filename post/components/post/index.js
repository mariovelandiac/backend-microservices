const store = require('../../../store/mysql');
const controller = require('./post.controller');

module.exports = controller(store)
