const db = require('../db');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash')


let authentication = {
    createToken: async function (user) {
         let token = jwt.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '1d' });
         await db.none(`update user_tokens set expired = True where user_id = $1`, [user.user_id])
         await db.none(`insert into user_tokens (user_id, user_token) values ($1, $2)`, [user.user_id, token])
         return token;
        //  console.log(token)
        //  let dec = jwt.verify(token, process.env.SECRET_KEY)
    },
    decodeToken: async function (token) {
        let user_token = await db.oneOrNone(`select * from user_tokens where user_token = $1`, [token]);
        if (_.isNil(user_token)) {
            throw Error('Invalid token');
        } else if (user_token.expired) {
            throw Error('Expired token');
        }
        return jwt.verify(token, process.env.SECRET_KEY)
    }

}

module.exports = authentication; 
