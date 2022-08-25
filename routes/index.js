const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");

router.use('', productRouter.router);
router.use('/users', userRouter.router);
router.use('/products', productRouter.router);
router.use('/carts', cartRouter.router);
router.use('/orders', orderRouter.router);

module.exports =router