const express = require('express');
const router = express.Router();
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

router.get('/',
async function (req, res, next) {
  try {
    const lista = await controller.list()
    response.sucess(req, res, lista, 200)
  } catch (e) {
      next(e);
  }
});

router.get('/following',
secure('logged'),
async function (req, res, next) {
  try {
    const following = await controller.following(req.user.id);
    response.sucess(req, res, following, 200)
  } catch (e) {
      next(e);
  }
});

router.get('/:id',
async function (req, res, next) {
  try {
    const {id} = req.params
    const user = await controller.get(id)
    response.sucess(req, res, user, 200)
  } catch (e) {
      next(e);
  }
});



router.post('/',
async function (req, res, next) {
  try {
    const data = req.body;
    const user = await controller.upsert(data)
    response.sucess(req, res, user, 201)
  } catch (e) {
      next(e);
  }
});

router.post('/follow/:id',
  secure('logged'),
  async function (req, res, next) {
    try {
      const toId = req.params.id;
      const fromId = req.user.id
      const follow = await controller.follow(fromId,toId);
      response.sucess(req, res, follow, 200)
    } catch (e) {
      next(e)
    }
  }
);

router.delete('/:id',
async function (req, res, next) {
  try {
    const {id} = req.params
    const user = await controller.remove(id)
    response.sucess(req, res, user, 200)
  } catch (e) {
      next(e)
  }
});

router.put('/',
secure('update'),
async function (req, res, next) {
  try {
    const data = req.body;
    const user = await controller.upsert(data)
    response.sucess(req, res, user, 201)
  } catch (e) {
    next(e)
  }
})



module.exports = router
