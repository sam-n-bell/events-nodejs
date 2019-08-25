const _ = require('lodash');
let db = require('../db');
const services = require('../services/index');


let UsersController = {
    getAllUsers: async function (req, res) {
        try {
                let users = await db.many(`select * from users`);
            
                res.json(users);
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
    //user_name, email, password, administrator
    createUser: async function (req, res) {
        try {
                let body = req.body;
                let user = await services.users.getUserByEmail(body.email);
                if (!_.isNil(user)) throw Error('Email already on file');

                let new_user = await services.users.createUser(body.user_name, body.email, body.password, body.administrator);
                res.status(201).send('created');
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    }
}

module.exports = UsersController;
