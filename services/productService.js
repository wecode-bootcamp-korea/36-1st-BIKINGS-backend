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

module.exports = {
    getProductsCovers
}