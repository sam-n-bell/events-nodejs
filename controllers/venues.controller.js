const _ = require('lodash');
let db = require('../db');
const services = require('../services/index');


let VenuesController = {
    getAllVenues: async function (req, res) {
        try {
                res.send('ok');
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    //user_name, email, password, administrator
    createVenue: async function (req, res) {
        try {
                
            res.send('ok');
        } catch (err) {
                res.status(500).send({err: err.message});
            }
    }
}

module.exports = VenuesController;
