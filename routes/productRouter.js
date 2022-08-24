const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProductsCovers);
router.get('/:product_id', productController.getProductsDetails);

module.exports = {
    router
}