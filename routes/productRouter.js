const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/covers/:page_num', productController.getProductsCovers);
router.get('/details/:product_id', productController.getProductsDetails);

module.exports = {
    router
}