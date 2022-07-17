const formidable = require('formidable');
const CityModel = require('../models/city');
const fs = require('fs');

const sendJSONResponse = (res, status, content) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.status(status).json(content);
};

module.exports.getList = (req, res) => {
   const searchObj = req.query.searchParams || {};

   CityModel.find(searchObj)
      .populate('owner')
      .exec((err, cities) => {
         if (err)
            return sendJSONResponse(res, 500, {
               success: false,
               err: { msg: 'Не вдалося отримати!' },
            });

         sendJSONResponse(res, 200, { success: true, data: cities });
      });
};

module.exports.add = (req, res, next) => {
   let city = new CityModel({
      name: req.body.name,
      photo: req.body.photo,
      owner: req.body.owner,
   });
   city.save((err, savedCity) => {
      if (err) {
         sendJSONResponse(res, 500, {
            success: false,
            err: { msg: 'Не вдалося зберегти!' },
         });
         return;
      }
      sendJSONResponse(res, 201, { success: true, data: savedCity });
   });
};

module.exports.delete = (req, res) => {
   console.log('---------req.body');
   console.log(req.body);
   CityModel.findByIdAndDelete(req.body.id, (err) => {
      if (err) {
         console.log('---------err');
         console.log(err);
         sendJSONResponse(res, 500, {
            success: false,
            err: { msg: 'Не вдалося видалити!' },
         });
         return;
      }
      sendJSONResponse(res, 200, { success: true });
   });
};

module.exports.update = (req, res, next) => {
   console.log('- update ---------');
   console.log(req.body);
   let city = {
      name: req.body.name,
      owner: req.body.owner,
   };
   if (req.body.photo) {
      //Якщо надіслано нове фото, то змінюємо поле фото
      book.photo = req.body.photo;
   }
   CityModel.findByIdAndUpdate(
      req.body._id,
      city,
      { new: true }, //у колбек передається оновлений документ
      (err) => {
         // mongoose.disconnect()
         if (err) {
            sendJSONResponse(res, 500, {
               success: false,
               err: { msg: 'Помилка оновлення!' },
            });
            return;
         }
         sendJSONResponse(res, 200, { success: true });
      }
   );
};

module.exports.getById = function (req, res) {
   //Пошук об"єкта-книги за id
   CityModel.findById(req.params.id)
      .populate('owner')
      .exec(function (err, searchCity) {
         if (err) {
            sendJSONResponse(res, 500, {
               success: false,
               err: { msg: 'Не вдалося знайти книгу!' },
            });
            return;
         }
         sendJSONResponse(res, 200, { success: true, data: searchCity });
      });
};
