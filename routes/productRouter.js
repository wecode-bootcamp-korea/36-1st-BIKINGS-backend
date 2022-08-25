const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProductsCovers);
router.get('/:product_id(\\d+)', productController.getProductsDetails);
router.get('/tags/', productController.getTags);
router.get('/tags/:tag_ids', productController.getProductsByTags);

module.exports = {
    router
}
