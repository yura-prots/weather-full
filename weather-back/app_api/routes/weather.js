var express = require('express');
var router = express.Router();

const weatherController = require('../controllers/weather');

router.post('/', weatherController.add);

router.get('/', weatherController.getList);

module.exports = router;
