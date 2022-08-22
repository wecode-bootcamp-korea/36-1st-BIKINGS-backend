const productDao = require('../models/productDao');

const getProductsCovers = async (page_num) => {
    const getProductIds = await productDao.getProductIds();

    if (((6*page_num) - getProductIds.length) >= 6 || page_num == 0) {
        const err = new Error("INVALID_PAGE_NUMBER");
        err.statusCode = 404;
        throw err;
    }

    const getProductCovers = await productDao.getProductCovers(page_num);
    
    return getProductCovers;
};

module.exports = {
    getProductsCovers
}