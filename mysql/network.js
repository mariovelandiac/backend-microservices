// crear todas las tablas
const express = require('express');
const router = express.Router();
const response = require('./../network/response');
const store = require('../store/mysql');

router.get('/:tabla', list);

router.get('/:tabla/:id', get);

router.post('/:tabla/', insert);

router.patch('/:tabla/', update);


// funciones del CRUD

async function list(req, res, next) {
  try {
    const {tabla} = req.params;
    const list = await store.list(tabla);
    response.sucess(req, res, list, 200); // en esta parte sucede que todas las peticiones van directamente a la base de datos, solo con pasarle en el req.params.tabla la tabla que se quiere consultar directamente en la base de datos
  } catch (e) {
    next(e)
  };
};

async function get(req, res, next) {
  try {
    const {tabla} = req.params;
    const {id} = req.params;
    const data = await store.get(tabla, id);
    response.sucess(req, res, data, 200); // en esta parte sucede que todas las peticiones van directamente a la base de datos, solo con pasarle en el req.params.tabla la tabla que se quiere consultar directamente en la base de datos
  } catch (e) {
    next(e)
  };
};

async function insert(req, res, next) {
  try {
    const {tabla} = req.params;
    const data = req.body;
    await store.insert(tabla, data);
    response.sucess(req, res, 'created', 201); // en esta parte sucede que todas las peticiones van directamente a la base de datos, solo con pasarle en el req.params.tabla la tabla que se quiere consultar directamente en la base de datos
  } catch (e) {
    next(e)
  };
};

async function update(req, res, next) {
  try {
    const {tabla} = req.params;
    const data = req.body;
    const updatedData = await store.update(tabla, data);
    response.sucess(req, res, updatedData, 201); // en esta parte sucede que todas las peticiones van directamente a la base de datos, solo con pasarle en el req.params.tabla la tabla que se quiere consultar directamente en la base de datos
  } catch (e) {
    next(e)
  };
};

module.exports = router;
