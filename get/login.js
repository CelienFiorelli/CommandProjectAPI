
const { getToken } = require('../utils/tokenHandler');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = {
    endpoint: "/login",
    process: async (req, res) => {
        if (!req.query.email || !req.query.password) return

        const user = await User.findOne({ email: req.query.email })
        if (!user) {
            return res.send({
                status: 404,
                message: "User not found!"
            });
        }

        const match = bcrypt.compareSync(req.query.password, user.password);
        if (!match) {
            return res.send({
                status: 404,
                message: "Password error!"
            });
        }

        return res.send({
            status: 200,
            token: await getToken(user)
        });

    }
}