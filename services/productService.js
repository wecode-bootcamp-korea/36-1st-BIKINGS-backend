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

const getTags = async () => {
    const getTags = await productDao.getTags();

    return getTags[2];
};

const getProductsByTags = async (numTags) => {
    const getTags = await productDao.getTags();

    numTags.forEach((e) => {
        if (!getTags[0].includes(e)) {
            const err = new Error("NO_SUCH_TAG");
            err.statusCode = 404;
            throw err;
        }
    });

    const hasTagBunches = await productDao.hasTagBunches(numTags);

    const count = {};

    hasTagBunches.forEach((e) => {
        count[e] = (count[e] || 0) + 1;
    })
    
    if (!Object.values(count).includes(numTags.length)) {
        const err = new Error("NO_SUCH_COMBINATION");
        err.statusCode = 404;
        throw err;
    }

    const getProductsByTags = await productDao.getProductsByTags(numTags);

    return getProductsByTags;
}
module.exports = {
    getProductsCovers,
    getProductsDetails,
    getTags,
    getProductsByTags
}