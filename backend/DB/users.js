const mongoose = require('mongoose');
const {Schema} = mongoose;
const usersSchema = new Schema({
    name:String,
    password:String,
    email:String,
},{collection : "users"})

module.exports = mongoose.model('users', usersSchema);