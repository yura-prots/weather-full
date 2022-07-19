const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Створення схеми моделі
const cityScheme = new Schema({
   name: Object,
   photo: String,
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
   },
});
//Створення моделі
const CityModel = mongoose.model('Cities', cityScheme);

module.exports = CityModel;
