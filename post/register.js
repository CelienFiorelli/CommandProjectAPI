const { getToken } = require('../utils/tokenHandler');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);


module.exports = {
    endpoint: "/register",
    process: async (req, res) => {
        if (!req.query.email || !req.query.password || !req.query.firstname || !req.query.lastname) return
        
        if (await User.findOne({ email: req.query.email}))
        {
            return res.send({
                status: 404,
                message: "User already exist!"
            });
        }
    
        const hash = bcrypt.hashSync(req.query.password, salt);
    
        const user = await User.create({
            email: req.query.email,
            password: hash,
            firstname: req.query.firstname,
            lastname: req.query.lastname,
        })
    
        res.send({
            status: 200,
            token: await getToken(user),
        });
    }
}