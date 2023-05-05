const { Schema, model, Types } = require('mongoose');

module.exports = model('Menu', new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    burger: { type: Schema.Types.ObjectId, ref: 'Burger', required: true },
    drink: { type: Schema.Types.ObjectId, ref: 'Drink', required: true },
}));