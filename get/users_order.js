const { tokenIsValid } = require("../utils/tokenHandler");
const Token = require('../models/Token');
const Order = require("../models/Order");
const Payment = require("../models/Payment");


module.exports = {
    endpoint: "/get/user/orders",
    process: async (req, res) => {
        if (!req.query.token || !(await tokenIsValid(req.query.token))) return res.send({ status: 403, message: "Token invalid!" })
        
        const user = (await Token.findOne({ token: req.query.token }).populate("user")).user;

        const payments = await Payment.find({deliver: false, user: user});

        const data = [];
        for (const payment of payments) {
            data.push({
                _id: payment._id,
                creation_date: payment.creation_date,
                products: await Order.find({ payment: payment }).populate("product"),
            })
        }
        res.send({status: 200, data: data});
    }
}