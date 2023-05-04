const User = require('../models/User');
const Token = require('../models/Token');


module.exports = {
    endpoint: "/get/user",
    process: async (req, res) => {
        if (!req.query.token) return res.send({ status: 403, message: "Token required!" })
        const token = await Token.findOne({ token: req.query.token }).populate('user');

        if (!token) return res.send({ status: 403, message: "Token invalid!" })
        res.send({ user: { firstname: token.user.firstname, lastname: token.user.lastname, email: token.user.email } });
    }
}