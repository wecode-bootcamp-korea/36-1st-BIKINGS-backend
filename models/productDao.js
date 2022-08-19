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
}

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
                                    cover_image_url
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
                                    detail_image_url
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

module.exports = {
    getProductIds,
    getProductCovers,
    getProductDetails
}