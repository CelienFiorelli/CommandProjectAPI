const Payment = require("../models/Payment");
const ShoppingCart = require("../models/ShoppingCart");
const { tokenIsValid } = require("../utils/tokenHandler");
const Order = require("../models/Order");
const Token = require("../models/Token");
const User = require("../models/User");
const { Decimal128 } = require("mongodb");

module.exports = {
    endpoint: "/payment",
    process: async (req, res) => {
        if (!req.query.card || !req.query.fidelity || !req.query.expiration_card || !req.query.crypto || !req.query.token || !(await tokenIsValid(req.query.token))) return res.send({ status: 404});
        
        const user = (await Token.findOne({ token: req.query.token }).populate("user")).user;
        
        const items = (await ShoppingCart.find({user: user}).populate("product"));
        const amount = parseFloat((parseFloat(items.reduce((partialSum, p) => partialSum + parseFloat(p.product.price.toJSON().$numberDecimal) * p.quantity, 0).toFixed(2)) - parseInt(req.query.fidelity) / 7).toFixed(2))
        
        const payment = await Payment.create({
            user: user, amount: amount, card: req.query.card, crypto: req.query.crypto, expiration_card: req.query.expiration_card
        })

        for (const item of items) {
            for (let i = 0; i < item.quantity; i++) {
                await Order.create({payment: payment, product: item.product})
            }
        }
        await ShoppingCart.deleteMany({user: user})

        user.fidelity += Math.round(amount) * 2;
        user.fidelity -= parseInt(req.query.fidelity);
        user.save()
        
        res.send({ status: 200 })
    }
}