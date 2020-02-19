// add express for url routing
var express = require('express');
var router = express.Router();

// add mongoose & Food model reference for CRUD
var mongoose = require('mongoose');
var Country = require('../models/country');
var passport = require('passport');

//Get main country page
router.get('/',(req,res, next)=>{
    //use the country model & mongoose to select all the countries from MongoDB
    Country.find((err, countries)=> {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            // load the main countries page
            res.render('countries/index', {
                countries: countries,
                user: req.user
            })
        }
    })
})

// Get /countries/add -> show blank add country form
router.get('/add', (req,res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        res.render('countries/add', {
            user: req.user
        })
    } else {
        res.redirect('/login');
    }
})

//Post /countries/add -> process form submission
router.post('/add', (req,res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        // create a new document in the countries collection using the country model, we'll get an error or new country document back
        Country.create({
            name: req.body.name
        }, function (err, newCountry) {
            if (err){
                console.log(err)
                res.send(err)
            }else{
                // load the updated countries index
                res.redirect('/about');
            }
        })
    } else {
        res.redirect('/login');
    }
})

//Get /countries/delete/abc123 - :_id means this method expects a paramter called "_id "
router.get('/delete/:_id', (req, res, next)=>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Country.remove({_id: req.params._id}, (err)=> {
            if (err){
                console.log(err)
                res.send(err)
            }else{
                res.redirect('/about');
            }
        })
    } else {
        res.redirect('/login');
    }
})

// GET /countries/edit/:_id -> display populated edit form
router.get('/edit/:_id', (req, res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Country.findById(req.params._id, (err, country) =>{
            if (err){
                console.log(err)
                res.send(err)
            }else{
                res.render('countries/edit',{
                    country,
                    user: req.user
                })
            }
        })
    } else {
        res.redirect('/login');
    }
})

//POST /countries/edit/:_id -> updated selected country document
router.post('/edit/:_id', (req, res, next) =>{
    // If user hasn't logged in so redirect to login page
    if (req.user) {
        Country.findOneAndUpdate(
            {_id: req.params._id},
            {
                name:req.body.name
            }, (err, country)=> {
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    res.redirect('/about')
                }
        })
    } else {
        res.redirect('/login');
    }
})

//make the controller public
module.exports = router;
