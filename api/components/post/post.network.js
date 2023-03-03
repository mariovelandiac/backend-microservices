const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

// routes

router.get('/', list);


// Funciones del CRUD

async function list(req, res, next) {
  try {
    const lista = await controller.list()
    response.sucess(req, res, lista, 200)
  } catch (e) {
      next(e);
  }
}


module.exports = router;
