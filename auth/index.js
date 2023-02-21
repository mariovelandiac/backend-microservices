const jwt = require('jsonwebtoken');
const {config} = require('../config/config.js')
function sign(data) {
  return jwt.sign(data, config.jwtsecret)
}


module.exports = {
  sign,
}
