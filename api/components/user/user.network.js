const express = require('express');
const router = express.Router();
const secure = require('./secure');
const response = require('../../../network/response')
const controller = require('./index')

router.get('/',
async function (req, res) {
  try {
    const lista = await controller.list()
    response.sucess(req, res, lista, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
});

router.get('/:id',
async function (req, res) {
  try {
    const {id} = req.params
    const user = await controller.get(id)
    response.sucess(req, res, user, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
});

router.post('/',
async function (req, res) {
  try {
    const data = req.body;
    const user = await controller.upsert(data)
    response.sucess(req, res, user, 201)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
});

router.delete('/:id',
async function (req, res) {
  try {
    const {id} = req.params
    const user = await controller.remove(id)
    response.sucess(req, res, user, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
});

router.put('/',
secure('update'),
async function (req, res) {
  try {
    const data = req.body;
    const user = await controller.upsert(data)
    response.sucess(req, res, user, 201)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
})



module.exports = router
