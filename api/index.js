const express = require('express');
const app = express();
app.use(express.json());
const {config} = require('../config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./redsocial.json');
const errors = require('./../network/errors');


// Router
const router = require('../network/routes');
router(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// middleware de errores
app.use(errors)
// listen

app.listen(config.port, () => {});
