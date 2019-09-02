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
            let body = req.body;
            // created_by, name, event_day, start_time, venue_id, max_players
            await services.events.createEvent(body.created_by, body.name, body.event_day, body.start_time, body.venue_id, body.max_players, body.num_guests, body.participant_comment);
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
