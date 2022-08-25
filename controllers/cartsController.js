const cartsService = require("../services/cartsService");

const getProduct =async(req, res)=>{
    try{
        const {productId} = req.params;
        console.log(productId)
        const productInfo = await cartsService.getProduct(productId);
        return res.status(200).json({message : "success", data : productInfo})
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.message})
    }
}

const putCart = async (req, res)=>{
    try{
        const {productId} = req.params;
        console.log(req.params);
        const userId = req.body.id;
        await cartsService.putCart(productId, userId);
        return res.status(201).json({message : "success"})
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.message})
    }
}
const getCart = async (req,res)=>{
    try{
        const userId = req.body.id;
        console.log(userId)
        const info = await cartsService.getCart(userId);
        return res.status(200).json({message : "success", data : info})
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.message})
    }
}

const deleteCartByUserId  = async(req,res)=>{
    try{
        const userId = req.body.id;
        await cartsService.deleteCartByUserId(userId);
        return res.status(204).json({message : "success"})
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.message})
    }
}

const deleteCartByProductId = async(req,res)=>{
    try{
        const productId = req.params.productId
        const userId = req.body.id
        await cartsService.deleteCartByProductId(userId,productId);
        return res.status(204).json({message : "success"})
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.message})
    }
}

module.exports={
    getProduct, putCart, getCart,deleteCartByUserId,deleteCartByProductId
}