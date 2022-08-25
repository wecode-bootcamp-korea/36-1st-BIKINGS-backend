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

const getTags = async (req, res) => {
    try {
        const getTags = await productService.getTags();

        return res.status(200).json(getTags);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getProductsByTags = async (req, res) => {
    try {
        const tags = req.params.tag_ids.split(',');
    
        const numTags = tags.map(str => {
            return Number(str)
        });

        if (!tags) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }
    
        const getProductsByTags = await productService.getProductsByTags(numTags);
    
        return res.status(200).json({getProductsByTags});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
    
}

module.exports = {
    getProductsCovers,
    getProductsDetails,
    getTags,
    getProductsByTags
}
