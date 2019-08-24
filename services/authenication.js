const db = require('../db');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let authentication = {
    createToken: async function (user) {
        console.log('creating with secrety key ' + process.env.SECRET_KEY)
        let a = user;
        console.log(a)
         let token = jwt.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '1d' });
         console.log(token)
        //  let dec = jwt.verify(token, process.env.SECRET_KEY)

         console.log(dec)
    }
}

module.exports = authentication; 
