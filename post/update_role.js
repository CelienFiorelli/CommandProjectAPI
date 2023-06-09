const User = require("../models/User");
const { tokenIsValid } = require("../utils/tokenHandler");

module.exports = {
    endpoint: "/update/role",
    process: async (req, res) => {
        if (!req.query.role || !req.query.id_user || !req.query.token || !(await tokenIsValid(req.query.token, "admin"))) return res.send({ status: 404});
        
        await User.findByIdAndUpdate(req.query.id_user, { role: req.query.role })
        
        res.send({ status: 200 })
    }
}