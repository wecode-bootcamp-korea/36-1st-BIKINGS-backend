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


module.exports = {
    getProduct
}