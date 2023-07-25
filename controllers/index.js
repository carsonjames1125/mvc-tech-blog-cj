const router = require('express').Router();

//varibales for the api and controller files 
const apiRoute = require('./api');
const homeRoute = require('./homepage');
const dashBoardRoute = require('./dashboard');


//telling the app to use the routes and controllers

router.use('/', homeRoute);

router.use('/', apiRoute);

router.use('/', dashBoardRoute);