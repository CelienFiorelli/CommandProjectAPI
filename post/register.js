const User = require('../models/User');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);


module.exports = {
    endpoint: "/get/users",
    process: async (req, res) => {
        if (!req.query.email || !req.query.password) return
    
        if (await User.findOne({ email: req.query.email}))
        {
            return res.send({
                status: 404
            });
        }
    
        const hash = bcrypt.hashSync(req.query.password, salt);
    
        await User.create({
            email: req.query.email,
            password: hash,
        })
    
        res.send({
            status: 200
        });
    }
}