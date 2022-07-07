var express = require('express');
var router = express.Router();

const citiesController = require('../controllers/cities');

/* GET список міст. */
router.get('/', citiesController.getList);

/* GET видалення міста за id. */
router.delete('/', citiesController.delete);

/* POST Створення нового міста. */
router.post('/', citiesController.add);

// Оновлення інформації про місто після редагування
router.put('/', citiesController.update);

/* Відображення інформації про одне місто */
router.get('/:id', citiesController.getById);

module.exports = router;
