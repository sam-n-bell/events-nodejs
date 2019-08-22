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
                // let user = await db.one(`INSERT INTO USERS (user_name, email, password)`);
                let body = req.body;
                let user = await services.users.createUser(body.user_name, body.email, body.password, body.administrator)
                res.json(user);
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    }
}

module.exports = UsersController;
