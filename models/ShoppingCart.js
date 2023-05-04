const { Schema, model, Types } = require('mongoose');

module.exports = model('ShoppingCart', new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: Number,
}));