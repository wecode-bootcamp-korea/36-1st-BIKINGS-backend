const {myDataSource}= require("../utils/dataSource");

const getProduct= async(productId)=>{
        const product = await myDataSource.query(
        `
        SELECT * 
        FROM products
        WHERE products.id=?
        `,[productId]
        )
        return product;
}

const putCart=async(productId, userId)=>{
    console.log(productId)
        const carts = await myDataSource.query(
            `
            INSERT INTO carts (
                product_id,
                user_id
            ) VALUES (
                ?,?
            )
            `,[productId, userId]
        )
        return carts;
}

const getCart = async(userId)=>{
       const userCart = myDataSource.query(
        `
        SELECT 
        users.id user_id, 
        users.name user_name, 
        users.username email, 
        products.id,
        products.name,
        products.cover_image_url,
        products.price
        FROM carts JOIN users ON carts.user_id = users.id
        JOIN products ON carts.product_id = products.id
        WHERE users.id = ?
        `,[userId]
    )
    return userCart;
}

const deleteCartByUserId = async (userId)=>{
        return myDataSource.query(
            `
            DELETE
            FROM carts
            WHERE user_id = ?
            `,[userId]
        )
}

const deleteCartByProductId = async (userId,productId)=>{
        return myDataSource.query(
            `
            DELETE FROM carts 
            WHERE carts.user_id = ${userId}
            AND carts.product_id = ${productId}
            `
        )
}

module.exports = {
    getProduct, putCart, getCart, deleteCartByUserId,deleteCartByProductId
}