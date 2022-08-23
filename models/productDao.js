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

const getProductCovers = async (limit, offset) => {
    try {
        const productInfo = await myDataSource.query(
                                `SELECT
                                    id,
                                    name,
                                    cover_image_url,
                                    price
                                FROM products
                                ORDER BY id
                                LIMIT ${limit} 
                                OFFSET ${offset}
                                `);
        
        const arrProductIds = [];
        productInfo.forEach((obj) => {
            arrProductIds.push(obj.id);
        });

        const productTags = await myDataSource.query(
                                `SELECT
                                    tb.product_id,
                                    tb.tag_id,
                                    t.name
                                FROM tag_bunches tb
                                INNER JOIN tags t
                                ON tb.tag_id = t.id
                                WHERE tb.product_id IN (${String(arrProductIds)})
                                ORDER BY tb.product_id
                                `);

        productInfo.forEach((obj) => {
                                obj.tags = [];
        })

        productTags.forEach((obj) => {
                                productInfo[obj.product_id - offset - 1].tags.push(obj.name);
        })

        return productInfo;

    } catch (err) {
        const error = new Error("INVALID");
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    getProductIds,
    getProductCovers
}
