var express = require('express')
var venues = express.Router()
let db = require('../db');
let VenuesController = require ('../controllers/venues.controller');



var { Validator, ValidationError } = require('express-json-validator-middleware');
 
 
// Initialize a Validator instance first
var validator = new Validator({allErrors: true}); // pass in options to the Ajv instance
 
// Define a shortcut function
var validate = validator.validate;

// JSON Schema
var venue_schema = {
    type: 'object',
    required: ['name', 'address', 'activities'],
    properties: {
        name: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        activities: {
            type: 'string'
        }
    }
}

venues.get('/', VenuesController.getAllVenues);
venues.get('/:venueId/availability', VenuesController.getVenueAvailability);
venues.post('/', validate({body: venue_schema}), VenuesController.createVenue);
venues.delete('/:venueId', VenuesController.deleteVenue);



module.exports = venues;