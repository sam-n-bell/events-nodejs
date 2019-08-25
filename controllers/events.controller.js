const _ = require('lodash');
let db = require('../db');
const services = require('../services/index');


let EventsController = {
    getDayEvents: async function (req, res) {
        try {
                res.send('ok');
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    //user_name, email, password, administrator
    getMyEvents: async function (req, res) {
        try {
                
            res.send('ok');
        } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    cancelEvent: async function (req, res) {
        try {
                
            res.send('ok');
        } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    createEvent: async function (req, res) {
        try {
                
            res.send('ok');
        } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    joinEvent: async function (req, res) {
        try {
                
            res.send('ok');
        } catch (err) {
                res.status(500).send({err: err.message});
            }
    }
}

module.exports = EventsController;
