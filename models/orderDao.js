const {myDataSource} = require('../utils/dataSource');

const allUserIds = async () => {
    try {
        const userIds = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        users.id
                    ) AS ids
                FROM users`
        );

        return userIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allStatusOrderIds = async () => {
    try {
        const statusOrderIds = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        id
                    ) AS ids
                FROM status_orders`
        );

        return statusOrderIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allAddressIdsOfUserId = async (user_id) => {
    try {
        const addressIdsOfUserId = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        id
                    ) AS ids
                FROM user_addresses
                WHERE user_id = ${user_id}`
        );
    
        return addressIdsOfUserId[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const postOrders = async (user_id, status_order_id, user_address_id) => {
    try {
        const postOrders = await myDataSource.query(
            `INSERT INTO orders(
                user_id,
                status_order_id,
                user_address_id
            ) VALUES (?, ?, ?);
            `,
            [user_id, status_order_id, user_address_id]
        );

        return postOrders['insertId'];
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allProductIds = async () => {
    try {
        const productIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM products`
        );

        return productIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allStatusOrderItemIds = async () => {
    try {
        const statusOrderItemIds = await myDataSource.query(
            `SELECT 
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM status_order_items`
        );

        return statusOrderItemIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allOrderItemIds = async () => {
    try {
        const orderItemIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids 
            FROM order_items`
        );

        return orderItemIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const getProductStock = async (product_id) => {
    try {
        const stockOfProductId = await myDataSource.query(
            `SELECT
                stock
            FROM products
            WHERE id = ${product_id}`
        );
        
        const stock = stockOfProductId[0].stock;

        return stock;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const postOrderItems = async (product_id, status_order_item_id, amount, order_id) => {
    try {
        const postOrderItems = await myDataSource.query(
            `INSERT INTO order_items(
                product_id,
                status_order_item_id,
                amount,
                order_id
            ) VALUES (?, ?, ?, ?)
            `,
            [product_id, status_order_item_id, amount, order_id]
        );

        return postOrderItems['insertId'];
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const allOrderIds = async () => {
    try {
        const orderIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM orders`
        );

        return orderIds[0].ids;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const getOrderByOrderId = async (order_id) => {
    try {
        const orderOfOrderId = await myDataSource.query(
            `SELECT
                o.id AS order_id,
                o.user_id AS order_user_id,
                o.status_order_id AS order_status_id,
                o.user_address_id AS order_user_address_id,
                u.name AS user_name,
                so.name AS status_name,
                ua.address AS user_address
            FROM orders o
            INNER JOIN users u
            ON u.id = o.user_id
            INNER JOIN status_orders so
            ON so.id = o.status_order_id
            INNER JOIN user_addresses ua
            ON ua.id = o.user_address_id
            WHERE o.id = ${order_id}`
        );
        
        return orderOfOrderId;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const getOrderItemByOrderItemId = async (order_item_id) => {
    try {
        const orderItemByOrderItemId = await myDataSource.query(
            `SELECT
                oi.id AS order_item_id,
                oi.amount AS order_item_amount,
                oi.product_id AS order_item_product_id,
                oi.status_order_item_id AS order_item_status_id,
                oi.order_id AS order_item_order_id,
                p.name AS product_name,
                p.cover_image_url AS product_cover_image_url,
                p.price AS product_price,
                soi.name AS status_name
            FROM order_items oi
            INNER JOIN products p
            ON p.id = oi.product_id
            INNER JOIN status_order_items soi
            ON soi.id = oi.status_order_item_id
            WHERE oi. id = ${order_item_id}`
        );

        return orderItemByOrderItemId;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

// ------------------------- LINE 77 ----------------------------

const deleteOrders = async (order_id) => {
    try {
        const deleteOrders = await myDataSource.query(
            `DELETE FROM orders
            WHERE orders.id = ${order_id}`
        );

        return deleteOrders;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

const deleteOrderItems = async (order_item_id) => {
    try {
        const deleteOrderItems = await myDataSource.query(
            `DELETE FROM order_items
            WHERE order_items.id = ${order_item_id}`
        );

        return deleteOrderItems;
    } catch (err) {
        const error = new Error('SOMETHING IS WRONG');
        error.statusCode = 500;
        throw err;
    }
};

module.exports = {
    allUserIds,
    allStatusOrderIds,
    allAddressIdsOfUserId,
    postOrders,
    allProductIds,
    allStatusOrderItemIds,
    allOrderItemIds,
    getProductStock,
    postOrderItems,
    allOrderIds,
    getOrderByOrderId,
    allOrderItemIds,
    getOrderItemByOrderItemId,
    deleteOrders,
    deleteOrderItems
}