const { tokenIsValid } = require("../utils/tokenHandler");
const Order = require("../models/Order");
const { process } = require("../get/restorer_orders");


module.exports = {
    endpoint: "/update/status/orders",
    process: async (req, res) => {
        if (!req.query.token || !req.query.orderId || req.query.status == undefined || !(await tokenIsValid(req.query.token, "restorer"))) return res.send({ status: 403, message: "Token invalid!" })
        
        const order = await Order.findById(req.query.orderId)
        order.finish = req.query.status
        await order.save();

        return await process(req, res);
    }
}