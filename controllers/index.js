var express = require('express');
var router = express.Router();

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose');
var Country = require('../models/country');

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

module.exports = router;
