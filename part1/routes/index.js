var express = require('express');
var router = express.Router();

var beer = require('../dao/beers.js');

/*
 * Routes
 */
router.get('/beers', beer.getAll);
router.get('/beer/:id', beer.getOne);
router.post('/beer/', beer.create);
router.put('/beer/:id', beer.update);
router.delete('/beer/:id', beer.delete);

module.exports = router;
