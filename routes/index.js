const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter");

router.use('', productRouter.router);
router.use('/users', userRouter.router);
router.use('/carts', cartRouter.router);

module.exports =router