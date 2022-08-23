const {myDataSource} = require('../utils/dataSource');

const getProductIds = async () => {
    try {
        const productIds = await myDataSource.query(
                            `SELECT
                                JSON_ARRAYAGG(
                                    id
                                ) AS ids
                            FROM products
                            `);
        
        const len = productIds[0].ids.length;
        const ids = productIds[0].ids.slice(1,len-1).split(', ');

        return ids;
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
                p.id,
                p.name,
                p.cover_image_url,
                p.price,
                JSON_ARRAYAGG(
                    t.name
                ) AS tags
                FROM products p
                JOIN tag_bunches tb
                ON tb.product_id = p.id
                INNER JOIN tags t
                ON t.id = tb.tag_id
                GROUP BY p.id
                ORDER BY p.id
                LIMIT ${limit}
                OFFSET ${offset}`
        );

        productInfo.map((obj) => {
            const len = obj.tags.length;
            obj.tags = obj.tags.slice(2,len-2).split('", "');
        });

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
