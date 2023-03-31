const { Schema, model, Types } = require('mongoose');

module.exports = model('Menu', new Schema({
    name: String,
    price: Types.Decimal128,
    burger: { type: Schema.Types.ObjectId, ref: 'Burger', required: true },
    drink: { type: Schema.Types.ObjectId, ref: 'Drink', required: true },
}));