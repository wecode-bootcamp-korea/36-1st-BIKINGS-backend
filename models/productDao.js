const {myDataSource} = require('../utils/dataSource');

const getProductIds = async () => {
        const productIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids
             FROM products
             `);

        return productIds[0].ids;
};

const getProductCovers = async (limit, offset) => {
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
            OFFSET ${offset}
            `);

        return productInfo;
};


const getProductDetails = async (product_id) => {
    const productInfo = await myDataSource.query(
            `SELECT 
                p.id,
                p.name,
                p.detail_image_url,
                p.price,
                JSON_ARRAYAGG(
                    t.name
                ) AS tags
            FROM products p
            JOIN tag_bunches tb
            ON tb.product_id = p.id
            INNER JOIN tags t
            ON t.id = tb.tag_id
            WHERE p.id = ${product_id}
            GROUP BY p.id
            ORDER BY p.id
            `);

    return productInfo;
};

module.exports = {
    getProductIds,
    getProductCovers,
    getProductDetails
}
