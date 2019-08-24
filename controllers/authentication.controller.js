let db = require('../db');
const services = require('../services/index');

let AuthenticationController = {
    loginUser: async function (req, res) {
        try {
            console.log(process.env.SECRETY_KEY)
                let body = req.body;
                let user = await db.oneOrNone(`select * from users where email = $1`, [body.email]);
                await services.authentication.createToken(user)
                res.json("success");
            } catch (err) {
                res.status(500).send({err: err.message});
            }
    },
}

module.exports = AuthenticationController;
