const orderService = require('../services/orderService');

const postOrders = async (req, res) => {
    try {
        const {user_id, status_order_id, user_address_id} = req.body;

        if (!user_id || !status_order_id || !user_address_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const postOrders = await orderService.postOrders(user_id, status_order_id, user_address_id);

        return res.status(201).json({data : postOrders});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const postOrderItems = async (req, res) => {
    try {
        const {product_id, status_order_item_id, amount, order_id} = req.body;

        if (!product_id || !status_order_item_id || !amount || !order_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const postOrderItems = await orderService.postOrderItems(product_id, status_order_item_id, amount, order_id);

        return res.status(200).json({data: postOrderItems});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getOrderByOrderId = async (req, res) => {
    try {
        const {order_id} = req.params;

        if (!order_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getOrderByOrderId = await orderService.getOrderByOrderId(order_id);
        
        return res.status(201).json(getOrderByOrderId);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getOrderItemByOrderItemId = async (req, res) => {
    try {
        const {order_item_id} = req.params;

        if (!order_item_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const getOrderItemByOrderItemId = await orderService.getOrderItemByOrderItemId(order_item_id);
        
        return res.status(201).json(getOrderItemByOrderItemId);
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const deleteOrders = async (req, res) => {
    try {
        const {order_id} = req.params;

        if (!order_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await orderService.deleteOrders(order_id);

        return res.status(200).json({message: 'orderDeleted'});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const deleteOrderItems = async (req, res) => {
    try {
        const {order_item_id} = req.params;

        if (!order_item_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await orderService.deleteOrderItems(order_item_id);

        return res.status(200).json({message: 'orderItemDeleted'});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    postOrders,
    postOrderItems,
    getOrderByOrderId,
    getOrderItemByOrderItemId,
    deleteOrders,
    deleteOrderItems
}
