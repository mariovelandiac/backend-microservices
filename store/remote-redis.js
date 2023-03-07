const Remote = require('./remote');
const {config} = require('./../config/config');


module.exports = new Remote(config.cacheService.host, config.cacheService.port)
