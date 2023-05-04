const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String,
    role: { type: String, required: true, default: "user" }
}));