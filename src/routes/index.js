var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

/* router.post('/',indexController.search) */


module.exports = router;