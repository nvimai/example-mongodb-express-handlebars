var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// passport references for auth
var passport = require('passport');
var session = require('express-session');

// add mongoose for db connection
var mongoose = require('mongoose');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
//add reference to our new foods controller
var foodsController = require('./controllers/Foods');
var countriesController = require('./controllers/countries');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
var globals = require('./config/globals')

mongoose.connect(globals.db,{
  userNewUrlParser:true,
  userUnifiedTopology:true
}).then(
    (res) =>{
      console.log('Connected to MongoDB')
    }
).catch((e) => {
  console.log(e);
  console.log('Connected failed')
})

// passport auth config
// Set app 
app.use(session({
  secret: 'aowiejfwofijgowi',
  resave: true,
  saveUninitialized: false
}));


// Initilize passport
app.use(passport.initialize());
app.use(passport.session());

// link passport to the user model
var User = require('./models/user');
passport.use(User.createStrategy());

// set up passport to read/write user data to/from the session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// map any
app.use('/foods', foodsController);
app.use('/countries', countriesController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
