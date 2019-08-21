let db = require('../db');

let UsersController = {
    getAllUsers: async function (req, res) {
        try {
                let users = await db.many(`select * from users`);
            
                res.json(users);
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    }
}

module.exports = UsersController;
