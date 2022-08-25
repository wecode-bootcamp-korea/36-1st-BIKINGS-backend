const express = require('express');
const orderController = require('../controllers/orderController');
const jwt = require("../utils/jwt");

const router = express.Router();

router.post("", jwt.validationToken, orderController.postOrders);
router.post("/items", jwt.validationToken,orderController.postOrderItems);
router.get("/:order_id(\\d+)", jwt.validationToken, orderController.getOrderByOrderId);
router.get("/item/:order_item_id", jwt.validationToken, orderController.getOrderItemByOrderItemId);
router.delete("/:order_id", jwt.validationToken, orderController.deleteOrders);
router.delete("/item/:order_item_id", jwt.validationToken, orderController.deleteOrderItems);

module.exports = {
    router
}