var express = require("express");
var router = express.Router();

/**
 * Acortamos el fichero 01-express.js
 * y lo quedamos con la ruta / y / contacto
 * ahora ya no tenemos app.get sino router,
 * por lo que usaremos:
 */

router.get('/', (req, res) => {
  res.render('index', { titulo: "mi titulo dinamico"})
});

router.get('/contacto', (req, res) => {
    res.render('contacto', { titulo: "Estamos en contacto de manera dinámica" })
  });


module.exports = router;
