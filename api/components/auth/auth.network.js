const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index')


router.post('/login',
async function (req, res, next) {
  try {
    const data = req.body;
    const user = await controller.login(data.username, data.password)
    response.sucess(req, res, user, 201)
  } catch (e) {
      next(e)
  }
});


module.exports = router
