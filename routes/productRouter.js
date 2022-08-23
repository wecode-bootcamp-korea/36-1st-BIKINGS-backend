const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.getProductsCovers);
router.get('/products/:product_id', productController.getProductsDetails);

module.exports = {
    router
}