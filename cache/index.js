const express = require('express');
const app = express();
const apiRouter = require('./network');

// uso de formatos tipo JSON
app.use(express.json());

const {config} = require('../config/config');

// Rutas

app.use(apiRouter);

app.listen(config.cacheService.port, () => {
  console.log(`Servicio de Caché funcionando en el puerto ${config.cacheService.port}`)
});
