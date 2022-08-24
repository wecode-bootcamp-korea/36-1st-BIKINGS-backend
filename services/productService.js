const productDao = require('../models/productDao');

const getProductsCovers = async (limit, offset) => {
    const getProductIds = await productDao.getProductIds();

    if (offset > getProductIds.length) {
        const err = new Error("INVALID_OFFSET_OR_LIMIT");
        err.statusCode = 404;
        throw err;
    }

    const getProductCovers = await productDao.getProductCovers(limit, offset);
    
    return getProductCovers;
};


const getProductsDetails = async (product_id) => {
    const getProductDetails = await productDao.getProductDetails(product_id);
    
    if (!getProductDetails[0]) {
        const err = new Error("NO_SUCH_PRODUCT_ID");
        err.statusCode = 404;
        throw err;
    }

    return getProductDetails;
};

module.exports = {
    getProductsCovers,
    getProductsDetails
}