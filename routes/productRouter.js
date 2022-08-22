const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:limit/:offset', productController.getProductsCovers);

module.exports = {
    router
}