const express = require('express');
const app = express();
app.use(express.json());

const {config} = require('../config/config');
const post = require('./components/post/post.network')
const errors = require('./../network/errors');


// Router
app.use('/api/post', post)


// middleware de errores
app.use(errors)


// listen
app.listen(config.post.port, () => {
  console.log(`Servicio POST escuchando en el puerto ${config.post.port}`)
})
