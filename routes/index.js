const express = require('express');
const routes = express.Router(); 
let authenicate = require('../middleware/authenticate')
//Module imports
let users = require('./users');
let authentication = require('./authentication')

routes.post('/register', async (req, res) => {
    try {
        res.send('register route');
    } catch (err) {
        res.status(500).send("error")
    }
});
//Mounting
routes.use('/users', authenicate.authenicate_user, users);
routes.use('/authentication', authentication);

module.exports = routes;