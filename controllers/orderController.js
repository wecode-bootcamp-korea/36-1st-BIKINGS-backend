const orderService = require('../services/orderService');

const postOrders = async (req, res) => {
    try {
        const {user_id, status_order_id, user_address_id} = req.body;

        if (!user_id || !status_order_id || !user_address_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await orderService.postOrders(user_id, status_order_id, user_address_id);

        return res.status(201).json({message: 'orderCreated'});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    postOrders
}

