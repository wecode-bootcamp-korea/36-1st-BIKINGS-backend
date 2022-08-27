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


const postOrderItems = async(product_id, status_order_item_id, amount, order_id) => {
    const allProductIds = await orderDao.allProductIds();
    const allStatusOrderItemIds = await orderDao.allStatusOrderItemIds();
  
    if (!allProductIds.includes(product_id) || !allStatusOrderItemIds.includes(status_order_item_id)) {
        const err = new Error("NO_SUCH_PRODUCT_OR_STATUS_OR_ORDER");
        err.statusCode = 404;
        throw err;
    }

    const getProductStock = await orderDao.getProductStock(product_id);

    if (getProductStock < amount) {
        const err = new Error("NO_MORE_STOCK");
        err.statusCode = 404;
        throw err;
    }

    const postOrderItems = await orderDao.postOrderItems(product_id, status_order_item_id, amount, order_id);

    return postOrderItems;
};

const getOrderByOrderId = async (order_id) => {
    const getOrderByOrderId = await orderDao.getOrderByOrderId(order_id);

    if (!getOrderByOrderId[0]) {
        const err = new Error("NO_SUCH_ORDER");
        err.statusCode = 404;
        throw err;
    }

    return getOrderByOrderId;
};

const getOrderItemByOrderItemId = async (order_item_id) => {
    const getOrderItemByOrderItemId = await orderDao.getOrderItemByOrderItemId(order_item_id);

    if (!getOrderItemByOrderItemId[0]) {
        const err = new Error("NO_SUCH_ORDER_ITEM");
        err.statusCode = 404;
        throw err;
    }

    return getOrderItemByOrderItemId;
}

const deleteOrders = async (order_id) => {
    const allOrderIds = await orderDao.allOrderIds();

    if (allOrderIds == null || !allOrderIds.includes(Number(order_id))) {
        const err = new Error("NO_SUCH_ORDER_TO_DELETE");
        err.statusCode = 404;
        throw err;
    }

    const deleteOrders = await orderDao.deleteOrders(order_id);

    return deleteOrders;
}

const deleteOrderItems = async (order_item_id) => {
    const allOrderItemIds = await orderDao.allOrderItemIds();

    if (allOrderItemIds == null || !allOrderItemIds.includes(Number(order_item_id))) {
        const err = new Error("NO_SUCH_ORDER_ITEM_TO_DELETE");
        err.statusCode = 404;
        throw err;
    }

    const deleteOrderItems = await orderDao.deleteOrderItems(order_item_id);

    return deleteOrderItems;
}

module.exports = {
    postOrders,
    postOrderItems,
    getOrderByOrderId,
    getOrderItemByOrderItemId,
    deleteOrders,
    deleteOrderItems
}