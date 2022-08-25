const orderDao = require('../models/orderDao');

const postOrders = async (user_id, status_order_id, user_address_id) => {
    const allUserIds = await orderDao.allUserIds();
    const allStatusOrderIds = await orderDao.allStatusOrderIds();

    if (!allUserIds.includes(user_id) || !allStatusOrderIds.includes(status_order_id)) {
        const err = new Error("NO_SUCH_USER_OR_STATUS");
        err.statusCode = 404;
        throw err;
    }

    const allAddressIdsOfUserId = await orderDao.allAddressIdsOfUserId(user_id);

    if (!allAddressIdsOfUserId.includes(user_address_id)) {
        const err = new Error("NO_SUCH_ADDRESS");
        err.statusCode = 404;
        throw err;
    }

    const postOrders = await orderDao.postOrders(user_id, status_order_id, user_address_id);

    return postOrders;
};


module.exports = {
    postOrders
}