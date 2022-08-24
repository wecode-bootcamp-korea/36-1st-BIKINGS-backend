const cartsDao = require("../models/cartsDao");

const getProduct= async(productId)=>{
        return await cartsDao.getProduct(productId) 
}

module.exports={
    getProduct
}