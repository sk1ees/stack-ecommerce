const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const { logoutUser } = require('../controllers/authController');
const router = express.Router()
router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error })
})
router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();

    // console.log(products)
    res.render("shop", { products })
})


router.get('/logout', logoutUser);
module.exports = router;