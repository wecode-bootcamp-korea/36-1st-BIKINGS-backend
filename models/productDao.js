const {myDataSource} = require('../utils/dataSource');

const getProductIds = async () => {
    try {
        const productIds = await myDataSource.query(
                            `SELECT
                                id
                            FROM products
                            `);
        
        const arrIds = [];
        productIds.forEach((obj) => {
                                arrIds.push(obj.id);
        });
        
        return arrIds;

    } catch (err) {
        const error = new Error("SOMETHING IS WRONG");
        error.statusCode = 500;
        throw error;
    }
};

const getTags = async () => {
    try {
        const tagInfo = await myDataSource.query(
                                `SELECT
                                    id,
                                    name
                                FROM tags
                                `);
        
        const arrTagIds = [];
        tagInfo.forEach((obj) => {
                            arrTagIds.push(obj.id);
        });

        const arrTagNames = [];
        tagInfo.forEach((obj) => {
                            arrTagNames.push(obj.name);
        });
        
        return [arrTagIds, arrTagNames, tagInfo];
    } catch (err) {
        const error = new Error("SOMETHING IS WRONG");
        error.statusCode = 500;
        throw error;
    }
};

const getProductCovers = async (page_num) => {
    try {
        const timesBy = page_num - 1;
        const limitOffset = 6;
        const arrIds = [];
        [1,2,3,4,5,6].forEach((e) => {
                                arrIds.push(e+(limitOffset*timesBy));
        });
        
        const productInfo = await myDataSource.query(
                                `SELECT
                                    id,
                                    name,
                                    cover_image_url,
                                    price
                                FROM products
                                WHERE id IN (${String(arrIds)})
                                `);
        
        const productTags = await myDataSource.query(
                                `SELECT
                                    tb.product_id,
                                    tb.tag_id,
                                    t.name
                                FROM tag_bunches tb
                                INNER JOIN tags t
                                ON tb.tag_id = t.id
                                WHERE tb.product_id IN (${String(arrIds)})
                                ORDER BY tb.product_id
                                `);
        
        productInfo.forEach((obj) => {
                                obj.tags = [];
        })

        productTags.forEach((obj) => {
                                productInfo[obj.product_id - (limitOffset*timesBy) - 1].tags.push(obj.name);
        })

        return productInfo;

    } catch (err) {
        const error = new Error("INVALID");
        error.statusCode = 500;
        throw error;
    }
}


const getProductDetails = async (product_id) => {
    try {
        const id = product_id;

        const productInfo = await myDataSource.query(
                                `SELECT
                                    id,
                                    name,
                                    detail_image_url,
                                    price
                                FROM products
                                WHERE id = ${id}
                                `);

        const productTags = await myDataSource.query(
                                `SELECT
                                    tb.product_id,
                                    tb.tag_id,
                                    t.name
                                FROM tag_bunches tb
                                INNER JOIN tags t
                                ON tb.tag_id = t.id
                                WHERE tb.product_id = ${id}
                                `);

        productInfo.forEach((obj) => {
                    obj.tags = [];
        })

        productTags.forEach((obj) => {
                    productInfo[0].tags.push(obj.name);
        })

        return productInfo;
        
    } catch (err) {
        const error = new Error("SOMETHING IS WRONG");
        error.statusCode = 500;
        throw error;
    }
};

const hasTagBunches = async (numTags) => {
    try {
        const tagBunchesWithNumTags = await myDataSource.query(
                                    `SELECT
                                        product_id,
                                        tag_id
                                    FROM tag_bunches
                                    WHERE tag_id IN (${numTags})
                                    ORDER BY product_id`
        );

        const prod_ids = [];
        tagBunchesWithNumTags.forEach((obj) => {
            prod_ids.push(obj.product_id);
        });

        return prod_ids;
    } catch (err) {
        const error = new Error("SOMETHING IS WRONG");
        error.statusCode = 500;
        throw error;
    }
}

const getProductsByTags = async (numTags) => {
    try {     
        const allTags = await myDataSource.query(
                            `SELECT
                                id,
                                name
                            FROM tags`
        );

        const productInfo = await myDataSource.query(
                                `SELECT
                                    id,
                                    name,
                                    cover_image_url,
                                    price
                                FROM products
                                `);

        const productTags = await myDataSource.query(
                                `SELECT
                                    tb.product_id,
                                    tb.tag_id,
                                    t.name
                                FROM tag_bunches tb
                                INNER JOIN tags t
                                ON tb.tag_id = t.id
                                ORDER BY tb.product_id
                                `);

        productInfo.forEach((obj) => {
            obj.intTags = [];
        });

        productTags.forEach((obj) => {
            productInfo[obj.product_id-1].intTags.push(obj.tag_id);
        });

        const result = productInfo.filter((obj) => {
            return numTags.every((e) => {
                        return obj.intTags.includes(e);
                    });
        });

        result.forEach((obj) => {
            obj.tags = [];
        })

        result.forEach((obj) => {
            obj.intTags.forEach((e) => {
                obj.tags.push(allTags[e-1].name);
            });

            delete obj.intTags;
        });

        return result;
        
    } catch (err) {
        const error = new Error("SOMETHING IS WRONG");
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getProductIds,
    getTags,
    getProductCovers,
    getProductDetails,
    hasTagBunches,
    getProductsByTags
}