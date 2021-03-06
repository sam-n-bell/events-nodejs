const db = require('../db');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt')
const _ = require('lodash')


let users = {
    getUserByEmail: async function (email) {
        let user = await db.oneOrNone(`select * from users where email = $1`, [email]);
        return user;
   },
    getUserById: async function (user_id) {
         let user = await db.oneOrNone(`select * from users where user_id = $1`, [user_id]);
         return user;
    },
    createUser: async function (user_name, email, password, administrator=false) {
        let hashed_password = await bcrypt.hash(password, 10);
        // let unhashed = await bcrypt.compare(password ,hashed_password);
        let user = await db.one(`
        INSERT INTO USERS 
        (user_name, email, password, administrator) 
        VALUES ($1, $2, $3, $4) 
        returning 
        user_id, email, user_name`, [user_name, email, hashed_password, administrator]);
        return user;
    },
    checkPassword: async function(provided_password, actual_password) {
        let correct = await bcrypt.compare(provided_password ,actual_password);
        if (!correct) throw Error('Invalid login credentials');
        return true;
    }
}

module.exports = users; 
