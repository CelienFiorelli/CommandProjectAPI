const User = require('../models/User');
const Token = require('../models/Token');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const getToken = async (user) => {
    const token = await Token.findOne({
        user: user
    })

    if (token) {
        if (token.expiration_date <= new Date()) {
            token.token = bcrypt.hashSync(user.email + new Date().toString(), salt);

            const expiration_date = new Date()
            expiration_date.setDate(expiration_date.getDate() + 3);

            token.expiration_date = expiration_date
            await token.save()
        }
        return token.token
    } else {
        const expiration_date = new Date()
        expiration_date.setDate(expiration_date.getDate() + 3);

        const new_token = await Token.create({ user: user, expiration_date: expiration_date, token: bcrypt.hashSync(user.email + new Date().toString(), salt) })
        return new_token.token
    }
} 

const tokenIsValid = async (tested_token) => {
    const token = await Token.findOne({
        token: tested_token
    })
    if (token && token.expiration_date > new Date())
    {
        return true
    }
    return false
}

module.exports = { getToken, tokenIsValid }