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
        const id = product_id;

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
            WHERE p.id = ${id}
            GROUP BY p.id
            ORDER BY p.id
            `);
    
    return productInfo;
    
};


const getTags = async () => {
    const tagInfo = await myDataSource.query(
        `SELECT 
            id,
            name
        FROM tags
    `);

    return tagInfo;
};

const getProductsByTags = async (numTags) => {
    try {
        const productIds = await myDataSource.query(
            `SELECT
                p.id,
                JSON_ARRAYAGG(
                    t.id
                ) AS tag_ids
            FROM products p
            JOIN tag_bunches tb 
            ON tb.product_id = p.id 
            JOIN tags t ON t.id = tb.tag_id
            WHERE t.id IN (${String(numTags)})
            GROUP BY p.id 
            ORDER BY p.id
            `);
        
            const filteredItems = productIds.filter(obj => {
                if (obj.tag_ids.length == numTags.length) {
                    return obj.tag_ids.sort().join() == numTags.sort().join()
                } else {
                    return obj.tag_ids.length > numTags.length;
                }
            });

            const ids = [];
            filteredItems.map(obj => {
                ids.push(obj.id);
            });

        const result = await myDataSource.query(
            `SELECT 
                p.id, 
                p.name,
                JSON_ARRAYAGG(
                    t.name
                ) AS tags
            FROM products p 
            JOIN tag_bunches tb 
            ON tb.product_id = p.id 
            JOIN tags t ON t.id = tb.tag_id
            WHERE p.id IN (${String(ids)})
            GROUP BY p.id 
            ORDER BY p.id`
        );
        
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
    getProductsByTags
}
