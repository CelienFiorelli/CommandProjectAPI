const { tokenIsValid } = require("../utils/tokenHandler");
const User = require('../models/User');


module.exports = {
    endpoint: "/get/users",
    process: async (req, res) => {
        if (!req.query.token || !tokenIsValid(req.query.token)) return res.send({ status: 403, message: "Token invalid!" })
        
        res.send(await User.find());
    }
}