const express = require('express');
const app = express();
app.use(express.json())
const {config} = require('../config/config');



// Router
const router = require('../network/routes');
router(app);

// listen

app.listen(config.port, () => {
  console.log(`Escuchando en el puerto ${config.port}`)
})
