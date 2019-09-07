let express = require('express')
let events = express.Router()
let db = require('../db');
let EventsController = require ('../controllers/events.controller');



let { Validator, ValidationError } = require('express-json-validator-middleware');
 
 
// Initialize a Validator instance first
let validator = new Validator({allErrors: true}); // pass in options to the Ajv instance
 
// Define a shortcut function
let validate = validator.validate;

// JSON Schema
let event_schema = {
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

let join_event_schema = {
    type: 'object',
    required: ['user_id', 'num_guests', 'participant_comment'],
    properties: {
        num_guests: {
            type: 'number'
        },
        participant_comment: {
            type: 'string'
        },
        user_id: {
            type: 'string'
        }
    }
}

events.post('/:eventId/join', validate({body: join_event_schema}), EventsController.joinEvent);



module.exports = events;