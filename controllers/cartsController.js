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

module.exports={
    getProduct
}