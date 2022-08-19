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
        
        return [arrTagIds, arrTagNames];
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

const getProductsByTags = async (tags) => {
    try {     
        
        const query = "('" + tags.join("','") + "')";

        const tagInfo = await myDataSource.query(
                            `SELECT
                                id,
                                name
                            FROM tags
                            WHERE name IN ${query}` 
        );
        
        const tagsInIds = [];
        tags.forEach((e) => {
                        tagsInIds.push(tagInfo[tags.indexOf(e)].id);
        }); 

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
                    obj.tags = [];
        });

        productTags.forEach((obj) => {
            productInfo[obj.product_id-1].tags.push(obj.tag_id);
        });

        const result = productInfo.filter((obj) => {
                            return obj.tags.sort().join(',') === tagsInIds.sort().join(','); 
        })

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