var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const { parseBearer } = require('./app_api/utils/token');
require('dotenv').config();
require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./app_api/routes/users');
var citiesRouter = require('./app_api/routes/cities');
var weatherRouter = require('./app_api/routes/weather');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cities', citiesRouter);
app.use('/weather', weatherRouter);

app.use((req, res, next) => {
   const openPaths = ['/cities/login', '/cities/signup'];
   if (!openPaths.includes(req.path)) {
      try {
         req.user = parseBearer(req.headers.authorization, req.headers);
      } catch (err) {
         return res.status(401).json({ result: 'Доступ заборонено!' });
      }
   }
   next();
});

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
   );
   next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

module.exports = app;
