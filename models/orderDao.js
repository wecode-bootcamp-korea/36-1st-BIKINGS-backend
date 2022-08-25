const {myDataSource} = require('../utils/dataSource');

const allUserIds = async () => {
        const userIds = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        users.id
                    ) AS ids
                FROM users`
        );

        return userIds[0].ids;
};

const allStatusOrderIds = async () => {
        const statusOrderIds = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        id
                    ) AS ids
                FROM status_orders`
        );

        return statusOrderIds[0].ids;
};

const allAddressIdsOfUserId = async (user_id) => {
        const addressIdsOfUserId = await myDataSource.query(
                `SELECT
                    JSON_ARRAYAGG(
                        id
                    ) AS ids
                FROM user_addresses
                WHERE user_id = ${user_id}`
        );
    
        return addressIdsOfUserId[0].ids;
};

const postOrders = async (user_id, status_order_id, user_address_id) => {
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
};

const allProductIds = async () => {
        const productIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM products`
        );

        return productIds[0].ids;
};

const allStatusOrderItemIds = async () => {
        const statusOrderItemIds = await myDataSource.query(
            `SELECT 
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM status_order_items`
        );

        return statusOrderItemIds[0].ids;
};

const allOrderItemIds = async () => {
        const orderItemIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids 
            FROM order_items`
        );

        return orderItemIds[0].ids;
};

const getProductStock = async (product_id) => {
        const stockOfProductId = await myDataSource.query(
            `SELECT
                stock
            FROM products
            WHERE id = ${product_id}`
        );
        
        const stock = stockOfProductId[0].stock;

        return stock;
};

const postOrderItems = async (product_id, status_order_item_id, amount, order_id) => {
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
};

const allOrderIds = async () => {
        const orderIds = await myDataSource.query(
            `SELECT
                JSON_ARRAYAGG(
                    id
                ) AS ids
            FROM orders`
        );

        return orderIds[0].ids;
};

const getOrderByOrderId = async (order_id) => {
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
};

const getOrderItemByOrderItemId = async (order_item_id) => {
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
};

// ------------------------- LINE 77 ----------------------------

const deleteOrders = async (order_id) => {
        const deleteOrders = await myDataSource.query(
            `DELETE FROM orders
            WHERE orders.id = ${order_id}`
        );

        return deleteOrders;
};

const deleteOrderItems = async (order_item_id) => {
        const deleteOrderItems = await myDataSource.query(
            `DELETE FROM order_items
            WHERE order_items.id = ${order_item_id}`
        );

        return deleteOrderItems;
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