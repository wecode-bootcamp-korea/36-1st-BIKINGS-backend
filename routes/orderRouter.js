const express = require('express');
const orderController = require('../controllers/orderController');
const jwt = require("../utils/jwt");

const router = express.Router();

router.post("",jwt.validationToken, orderController.postOrders);

module.exports = {
    router
}