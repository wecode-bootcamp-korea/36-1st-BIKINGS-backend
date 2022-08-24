const productService = require('../services/productService');

const getProductsCovers = async (req, res) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;

        if (!limit || !offset) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getProductsCovers = await productService.getProductsCovers(limit, offset);

        return res.status(200).json(getProductsCovers);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getProductsDetails = async (req, res) => {
    try {
        const {product_id} = req.params;

        if (!product_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getProductsDetails = await productService.getProductsDetails(product_id);

        return res.status(200).json(getProductsDetails);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    getProductsCovers,
    getProductsDetails
}
