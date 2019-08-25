let db = require('../db');
const services = require('../services/index');
const _ = require('lodash')

let AuthenticationController = {
    loginUser: async function (req, res) {
        try {
            let body = req.body;
            let user = await services.users.getUserByEmail(body.email);
            await services.users.checkPassword(body.password, user.password);
            let token = await services.authentication.createToken(user);
            if (!_.isNil(user.password)) {
                delete user.password;
            }
            res.status(201).json({ user: user, token: token });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
    authenticateUser: async function (req, res) {
        try {
            let auth_header = req.headers.authorization;
            if (_.isNil(auth_header)) {
                throw Error('Missing authentication header');
            } else if (auth_header.split(' ')[0] !== 'Bearer') {
                throw Error('Invalid authentication header');
            } else if (_.isNil(auth_header.split(' ')[1])) {
                throw Error('Invalid authentication header');
            }
            let decoded = await services.authentication.decodeToken(auth_header.split(' ')[1]);
            let user = decoded.user;
            if (!_.isNil(user.password)) {
                delete user.password;
            }
            res.json(user);
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
}

module.exports = AuthenticationController;
