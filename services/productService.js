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

const getProductsDetails = async (product_id) => {
    const getProductIds = await productDao.getProductIds();
    

    if (!getProductIds.includes(Number(product_id))) {
        const err = new Error("NO_SUCH_DATA");
        err.statusCode = 404;
        throw err;
    }

    const getProductDetails = await productDao.getProductDetails(product_id);

    return getProductDetails;
}

module.exports = {
    getProductsCovers,
    getProductsDetails
}