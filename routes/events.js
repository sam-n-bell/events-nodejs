var express = require('express')
var events = express.Router()
let db = require('../db');
let EventsController = require ('../controllers/events.controller');



var { Validator, ValidationError } = require('express-json-validator-middleware');
 
 
// Initialize a Validator instance first
var validator = new Validator({allErrors: true}); // pass in options to the Ajv instance
 
// Define a shortcut function
var validate = validator.validate;

// JSON Schema
var event_schema = {
    type: 'object',
    required: ['created_by', 'event_day', 'name', 'num_guests', 'participant_comment', 'start_time', 'venue_id', 'max_players'],
    properties: {
        created_by: {
            type: 'string'
        },
        event_day: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        num_guests: {
            type: 'number'
        },
        participant_comment: {
            type: 'string'
        },
        venue_id: {
            type: 'string'
        },
        max_players: {
            type: 'number'
        }
    }
}

events.post('/', validate({body: event_schema}), EventsController.createEvent);



module.exports = events;