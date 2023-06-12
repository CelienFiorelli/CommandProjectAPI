const Payment = require("../models/Payment");
const ShoppingCart = require("../models/ShoppingCart");
const { tokenIsValid } = require("../utils/tokenHandler");
const Order = require("../models/Order");
const Token = require("../models/Token");
const User = require("../models/User");

module.exports = {
    endpoint: "/payment",
    process: async (req, res) => {
        if (!req.query.card || !req.query.amount || !req.query.expiration_card || !req.query.crypto || !req.query.token || !(await tokenIsValid(req.query.token))) return res.send({ status: 404});
        
        const user = (await Token.findOne({ token: req.query.token }).populate("user")).user;

        const payment = await Payment.create({
            user: user, amount: req.query.amount, card: req.query.card, crypto: req.query.crypto, expiration_card: req.query.expiration_card
        })

        const items = (await ShoppingCart.find({user: user}).populate("product"));
        for (const item of items) {
            for (let i = 0; i < item.quantity; i++) {
                await Order.create({payment: payment, product: item.product})
            }
        }
        await ShoppingCart.deleteMany({user: user})

        user.fidelity += Math.round(req.query.amount) * 2;
        user.save()
        
        res.send({ status: 200 })
    }
}