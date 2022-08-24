const express = require("express");
const cartController = require("../controllers/cartsController");
const jwt = require("../utils/jwt");
const router = express.Router();

router.get("/product/:productId", jwt.validationToken, cartController.getProduct);


module.exports = {
    router
}

