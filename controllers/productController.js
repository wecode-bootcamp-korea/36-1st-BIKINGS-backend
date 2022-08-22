const productService = require('../services/productService');

const getProductsCovers = async (req, res) => {
    try {
        const page_num = req.params.page_num;

        if (!page_num) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getProductsCovers = await productService.getProductsCovers(page_num);

        return res.status(201).json(getProductsCovers);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getProductsDetails = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        
        if (!product_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getProductsDetails = await productService.getProductsDetails(product_id);

        return res.status(201).json(getProductsDetails);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getTags = async (req, res) => {
    try {
        const getTags = await productService.getTags();

        return res.status(201).json(getTags);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getProductsByTags = async (req, res) => {
    const tags = req.params.tag_ids.split(',');
    const numTags = tags.map(str => {
        return Number(str)
    });

    try {
        if (!tags) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }
    
        const getProductsByTags = await productService.getProductsByTags(numTags);
    
        return res.status(201).json({getProductsByTags});
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