const express = require('express');
const router = express.Router();
const userRouter = require('../api/components/user/user.network')
const {config} = require('../config/config');

function routerApi(app) {
  app.use('/api/user', userRouter)
}


module.exports = routerApi
