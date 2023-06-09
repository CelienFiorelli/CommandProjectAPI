const { Schema, model, Types } = require('mongoose');

module.exports = model('Payment', new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creation_date: { type: Date, default: Date.now},
    amount: Types.Decimal128,
    card: Number,
    expiration_card: String,
    crypto: Number,
    deliver: {type: Boolean, default: false},
}));