const formidable = require('formidable');
const fs = require('fs');
const WeatherModel = require('../models/weather');

const sendJSONResponse = (res, status, content) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.status(status).json(content);
};

module.exports.add = (req, res, next) => {
   let weather = new WeatherModel({
      currentWeather: req.body.currentWeather,
      owner: req.body.owner,
   });
   weather.save((err, savedWeather) => {
      if (err) {
         sendJSONResponse(res, 500, {
            success: false,
            err: { msg: 'Не вдалося зберегти!' },
         });
         return;
      }
      sendJSONResponse(res, 201, { success: true, data: savedWeather });
   });
};

module.exports.getList = (req, res) => {
   const searchObj = req.query.searchParams || {};

   WeatherModel.find(searchObj)
      .populate('owner')
      .exec((err, weathers) => {
         if (err)
            return sendJSONResponse(res, 500, {
               success: false,
               err: { msg: 'Не вдалося отримати!' },
            });

         sendJSONResponse(res, 200, { success: true, data: weathers });
      });
};
