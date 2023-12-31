const { tokenIsValid } = require("../utils/tokenHandler");
const User = require('../models/User');


module.exports = {
    endpoint: "/get/users",
    process: async (req, res) => {
        if (!req.query.token || !(await tokenIsValid(req.query.token, "admin"))) return res.send({ status: 403, message: "Token invalid!" })
        
        res.send({status: 200, users: await User.find()});
    }
}