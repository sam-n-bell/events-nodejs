const express = require('express');
const routes = express.Router(); 

//Module imports
let users = require('./users');



//Mounting
routes.use('/users', users);


module.exports = routes;