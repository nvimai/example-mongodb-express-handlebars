// add express for url routing
var express = require('express');
var router = express.Router();
var passport = require('passport');

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose');
var Food = require('../models/food');
var Country = require('../models/country');

//Get main food page
router.get('/',(req,res, next)=>{
    //use the food model & mongoose to select all the foods from MongoDB
    Food.find((err, foods)=> {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            // load the main foods page
            res.render('foods/index', {
                foods: foods,
                user: req.user
            })
        }
    })
})

// Get /foods/add -> show blank add food form
router.get('/add', (req,res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        // Get the countries from country controller
        Country.find((err, countries)=> {
            if(err) {
                console.log(err)
                res.send(err)
            } else {
                res.render('foods/add', {
                    countries
                })
            }
        })
    } else {
        res.redirect('/login');
    }
})

//Post /foods/add -> process form submission
router.post('/add', (req,res, next) =>{
    
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        // create a new document in the foods collection using the food model, we'll get an error or new food document back
        Food.create({
            name: req.body.name,
            country:req.body.country
        }, function (err, newFood) {
            if (err){
                console.log(err)
                res.send(err)
            }else{
                // load the updated foods index
                res.redirect('/foods');
            }
        })
    } else {
        res.redirect('/login');
    }
})

//Get /foods/delete/abc123 - :_id menas this method expects a paramter called "_id "
router.get('/delete/:_id', (req, res, next)=>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Food.remove({_id: req.params._id}, (err)=> {
            if (err){
                console.log(err)
                res.send(err)
            }else{
                res.redirect('/foods');
            }
        })
    } else {
        res.redirect('/login');
    }
})

// GET /foods/edit/:_id -> display populated edit form
router.get('/edit/:_id', (req, res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Country.find((err, countries)=> {
            if(err) {
                console.log(err)
                res.send(err)
            } else {
                Food.findById(req.params._id, (err, food) =>{
                    if (err){
                        console.log(err)
                        res.send(err)
                    }else{
                        res.render('foods/edit',{
                            food:food,
                            countries,
                            user: req.user
                        })
                    }
                })
            }
        })
    } else {
        res.redirect('/login');
    }

})

//POST /foods/edit/:_id -> updated selected food document
router.post('/edit/:_id', (req, res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Food.findOneAndUpdate(
            {_id: req.params._id},
            {name:req.body.name,
                    country:req.body.country
            }, (err, food)=> {
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    res.redirect('/foods')
                }
        })
    } else {
        res.redirect('/login');
    }
})

//make the controller public
module.exports = router;
