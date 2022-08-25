const cartsDao = require("../models/cartsDao");

const getProduct= async(productId)=>{
        return await cartsDao.getProduct(productId) 
}

const putCart=async(productId,userId)=>{
        return await cartsDao.putCart(productId,userId)
}

const getCart=async(userId)=>{
        return await cartsDao.getCart(userId);
}

const deleteCartByUserId=async(userId)=>{
        return await cartsDao.deleteCartByUserId(userId);
}

const deleteCartByProductId=async(userId, productId)=>{
        return await cartsDao.deleteCartByProductId(userId,productId);
}

module.exports={
    getProduct, putCart,getCart,deleteCartByUserId,deleteCartByProductId
}