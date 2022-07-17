const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Створення схеми моделі
const weatherScheme = new Schema({
   currentWeather: String,
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
   },
});
//Створення моделі
const WeatherModel = mongoose.model('Weather', weatherScheme);

module.exports = WeatherModel;
