const productService = require('../services/productService');

const getProductsCovers = async (req, res) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;

        if (!limit || !offset) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getProductsCovers = await productService.getProductsCovers(limit, offset);

        return res.status(201).json(getProductsCovers);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    getProductsCovers
}