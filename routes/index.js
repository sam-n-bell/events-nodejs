const express = require('express');
const routes = express.Router(); 
let authenicate = require('../middleware/authenticate')
//Module imports
let users = require('./users');
let authentication = require('./authentication')
let venues = require('./venues')


routes.post('/register', async (req, res) => {
    try {
        res.send('register route');
    } catch (err) {
        res.status(500).send("error")
    }
});

routes.use('/authentication', authentication);

//Mounting
routes.use('/users', authenicate.authenicate_user, users);
routes.use('/venues', authenicate.authenicate_user, venues);

module.exports = routes;