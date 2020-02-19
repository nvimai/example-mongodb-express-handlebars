var express = require('express');
var router = express.Router();
var passport = require('passport');

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose');
var Country = require('../models/country');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'COMP2106 Global Food Market',
    user: req.user
  });
});

//Get main country page
router.get('/about',(req,res, next)=>{
  console.log(req.user)
  //use the country model & mongoose to select all the countries from MongoDB
  Country.find((err, countries)=> {
    if(err){
      console.log(err)
      res.send(err)
    }else{
      // load the main countries page
      res.render('about', {
        countries: countries,
        user: req.user
      })
    }
  })
})

router.get('/register', (req, res, next) => {
  res.render('login/register');
})
router.post('/register', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, newUser) => {
    if (err) {
      console.log(err);
      res.render('login/register', { message: err });
    } else {
      req.login(newUser, (err) => {
        res.redirect('/foods');
      })
    }
  })
  res.render('login/register');
})

router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login/login', {
    messages
  });
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/foods', 
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
  })
)

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
