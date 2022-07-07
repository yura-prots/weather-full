const UsersModel = require('../models/users');
const { prepareToken } = require('../utils/token');

const sendJSONResponse = (res, status, content) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.status(status).json(content);
};

module.exports.getList = (req, res) => {
   UsersModel.find({})
      .select('_id name')
      .exec((err, users) => {
         if (err)
            return sendJSONResponse(res, 500, {
               success: false,
               err: { msg: 'Не вдалося отримати!' },
            });
         sendJSONResponse(res, 200, { success: true, data: users });
      });
};

module.exports.signup = (req, res) => {
   var user = new UsersModel({
      email: req.body.email,
      name: req.body.name,
   });
   user.setPassword(req.body.password);
   user
      .save()
      .then((user) => {
         const token = prepareToken(
            {
               id: user._id,
               name: user.name,
            },
            req.headers
         );
         return res.status(201).json({
            result: 'Ви успішно зареєструвалися',
            token,
         });
      })
      .catch((err) => {
         return res.status(500).json({ error: 'Помилка при реєстрації' });
      });
};

module.exports.login = (req, res) => {
   if (!req.body.email) {
      return res.status(401).json({ error: 'Електронна адреса обов’язкова' });
   }
   if (!req.body.password) {
      return res.status(401).json({ error: 'Необхідно ввести пароль' });
   }
   UsersModel.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
         if (!user) {
            return res.status(401).json({ error: 'Користувача не знайдено' });
         }
         if (!user.validPassword(req.body.password)) {
            return res.status(401).json({ error: 'Помилка входу' });
         }
         const token = prepareToken(
            {
               id: user._id,
               name: user.name,
            },
            req.headers
         );
         const expiresAt = new Date().getTime() + 36000000;
         res.status(200).json({
            result: 'Authorized',
            user: {
               authData: {
                  name: user._doc.name,
                  access_token: token,
               },
               expiresAt,
            },
         });
      })
      .catch((error) => {
         return res.status(401).json({ error: 'Помилка входу' });
      });
};
