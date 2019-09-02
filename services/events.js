const db = require('../db');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const moment = require('moment');


let events = {
    deleteEvent: async function(event_id) {
       await db.none(`delete from participants where event_id = $1`, [event_id]);
       await db.none(`delete from events where event_id = $1`, [event_id]);
    },
    createEvent: async function(created_by, name, event_day, start_time, venue_id, max_players, num_guests, participant_comment) {
        let now = moment();
        if (moment(event_day + ' ' + start_time, 'YYYY-MM-DD HH:mm:ss').isBefore(now)) {
            throw Error('Can\'t create past events');
        }
        if (num_guests + 1 > max_players) {
            throw Error('Not enough space');
        }
        let existing_event = await db.oneOrNone(`select * from events where venue_id = $1 and start_time = $2 and event_day = $3`, [venue_id, start_time, event_day]);
        if (!_.isNil(existing_event)) {
            throw Error('Event already exists at that time');
        }
        let event = await db.one(`insert into events
                                 (name, start_time, event_day, created_by, max_players, venue_id) 
                                 values 
                                 ($1, $2, $3, $4, $5, $6) 
                                 returning *`, [name, start_time, event_day, created_by, max_players, venue_id]);
        await this.addParticipantToEvent(event.event_id, created_by, num_guests, participant_comment);
        return event;
    },
    addParticipantToEvent: async function(event_id, created_by, num_guests, participant_comment) {
        await db.none(`insert into participants
                        (event_id, user_id, num_guests, comment)
                        values
                        ($1, $2, $3, $4)`, [event_id, created_by, num_guests, participant_comment])
    },
    getEventById: async function(event_id) {
        let event = await db.one(`select 
                                    e.*
                                    from events e
                                    where e.event_id = $1`, [event_id]);
        return event
    },
    getEventsForDay: async function(day) {
        let events = await db.one(`
                                     select 
                                    e.*,
                                    count(p.participant_id from participants)
                                    from events e
                                    where e.event_day = $2::DATE`, [day]);
    }
}

module.exports = events; 
