const { Schema, model, Types } = require('mongoose');

module.exports = model('Token', new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: String,
    expiration_date: Date
}));