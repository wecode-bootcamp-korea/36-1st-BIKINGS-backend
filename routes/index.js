const express = require('express');
const router = express.Router();

const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

router.use('/products', productRouter.router);
router.use('/orders', orderRouter.router);

module.exports = router;
