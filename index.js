const { connectString } = require('./config.json');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);


const Burger = require('./models/Burger');
const User = require('./models/User');
const Token = require('./models/Token');
const { getToken, tokenIsValid } = require('./utils/tokenHandler');

const url = connectString;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const port = 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    mongoose.connect(url, connectionParams)
        .then(() => {
            console.log("connect");
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
})

app.get('/get/burgers', async (req, res) => {
    res.send(await Burger.find());
})

app.get('/get/users', async (req, res) => {
    if (!req.query.token || !tokenIsValid(req.query.token)) return res.send({ status: 403, message: "Token invalid!" })
    
    res.send(await User.find());
})

app.post('/create/burger', async (req, res) => {
    if (!req.query.name || !req.query.price) return

    res.send(
        await Burger.create({
            name: req.query.name,
            price: new mongoose.Types.Decimal128(req.query.price)
        })
    )
})

app.post('/register', async (req, res) => {
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
})

app.get('/login', async (req, res) => {
    if (!req.query.email || !req.query.password) return

    const user = await User.findOne({ email: req.query.email})
    if (!user)
    {
        return res.send({
            status: 404,
            message: "User not found!"
        });
    }

    const match = bcrypt.compareSync(req.query.password, user.password);
    if (!match)
    {
        return res.send({
            status: 404,
            message: "Password error!"
        });
    }

    return res.send({
        status: 200,
        token: await getToken(user)
    });

})