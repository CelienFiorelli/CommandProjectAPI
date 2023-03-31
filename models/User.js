const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
    email: String,
    password: String,
    role: { type: String, required: true, default: "user" }
}));