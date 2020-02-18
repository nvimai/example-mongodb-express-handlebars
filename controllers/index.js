var express = require('express');
var router = express.Router();
var passport = require('passport');

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose');
var Country = require('../models/country');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMP2106 Global Food Market' });
});

/*  GET about page*/
// router.get('/about', (req, res, next) => {
//   res.render('about', {
//     title:'About Us',
//     countries: [{
//       name: 'Canada'
//     },
//       {
//         name: 'India'
//       },
//       {
//         name: 'Italy'
//       },
//       {
//         name: 'Barbados'
//       },
//       {
//         name: 'Iran'
//       },
//       {
//         name: 'Taiwan'
//       },
//       {
//         name: 'Korea'
//       },
//       {
//         name: 'Vietnam'
//       }]
//   });
// })


//Get main country page
router.get('/about',(req,res, next)=>{
  //use the country model & mongoose to select all the countries from MongoDB
  Country.find((err, countries)=> {
    if(err){
      console.log(err)
      res.send(err)
    }else{
      // load the main countries page
      res.render('about', {
        countries: countries
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
