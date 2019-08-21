var express = require('express')
var users = express.Router()
let db = require('../db');
let UsersController = require ('../controllers/users.controller');

users.get('/', UsersController.getAllUsers);


module.exports = users;