const express = require('express');
const routes = express.Router(); 

//Module imports
let users = require('./users');
let authentication = require('./authentication')

//Mounting
routes.use('/users', users);
routes.use('/authentication', authentication)

module.exports = routes;