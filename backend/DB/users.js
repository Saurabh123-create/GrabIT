const mongoose = require('mongoose');
const {Schema} = mongoose;
const usersSchema = Schema({
    name:String,
    password:String,
    email:String,
},{collection : "users"})

module.exports = mongoose.model('users', usersSchema);