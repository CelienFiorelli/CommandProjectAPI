const { tokenIsValid } = require("../utils/tokenHandler");
const User = require('../models/User');
const Order = require("../models/Order");
const Payment = require("../models/Payment");


module.exports = {
    endpoint: "/get/orders",
    process: async (req, res) => {
        if (!req.query.token || !(await tokenIsValid(req.query.token, "restorer"))) return res.send({ status: 403, message: "Token invalid!" })
        
        const payments = await Payment.find({deliver: false}).populate("user");
        const data = [];
        for (const payment of payments) {
            data.push({
                _id: payment._id,
                creation_date: payment.creation_date,
                username: `${payment.user.firstname} ${payment.user.lastname}`,
                products: await Order.find({ payment: payment }).populate("product"),
            })
        }

        res.send({status: 200, data: data});
    }
}