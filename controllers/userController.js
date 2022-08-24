const userService = require("../services/userService")

const signUp = async(req, res)=> {
try{
    // const point = process.env.POINT;
    const {name,username, password, birth, contact, address} = req.body;
    if(!name||!username||!password||!birth||!contact||!address){
       res.status(400).json({message : 'KEY_ERROR'});
    }
    await userService.signUp(name,username, password, birth, contact);
    const userId = await userService.findUserId(username);
    await userService.createUserAddress(userId[0].id,address);
   
    return res.status(201).json({message : "success"});
}catch(err){
    return res.status(err.statusCode || 400).json({MESSAGE : err.message})
}   
}

module.exports = {
    signUp
}