const express = require("express");
const cartController = require("../controllers/cartsController");
const jwt = require("../utils/jwt");
const router = express.Router();

router.get("/product/:productId", jwt.validationToken, cartController.getProduct);
router.post("/:productId", jwt.validationToken, cartController.putCart);
router.get("",jwt.validationToken ,cartController.getCart);
router.delete("", jwt.validationToken, cartController.deleteCartByUserId);
router.delete("/:productId",jwt.validationToken, cartController.deleteCartByProductId);

module.exports = {
    router
}

