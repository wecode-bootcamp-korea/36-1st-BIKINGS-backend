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

        return postOrders;
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
    postOrders
}