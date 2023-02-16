const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./user.controller')


router.get('/', function (req, res) {
  const lista = controller.list()
  response.sucess(req, res, lista, 200)
});

module.exports = router
