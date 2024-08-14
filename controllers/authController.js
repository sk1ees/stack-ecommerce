const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email })
        if (user) return res.status(401).send("User already exists!")
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    })

                    let token = generateToken(user);
                    res.cookie("token", token);

                    res.send("user created succesfully!");
                }
            })
        })



    } catch (err) {
        res.send(err.message);
    }
}
module.exports.loginUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email })
        if (!user) return res.redirect('/');

        bcrypt.compare(password, user.password, (err, results) => {
            if (results) {
                let token = generateToken(user)
                res.cookie("token", token);
                res.redirect('/shop');
            }
            else {
                return res.redirect('/');
            }
        })

    } catch (err) {
        res.send(err.message);
    }
}

module.exports.logoutUser = (req, res, next) => {
    res.cookie("token", "")
    res.redirect('/');
}