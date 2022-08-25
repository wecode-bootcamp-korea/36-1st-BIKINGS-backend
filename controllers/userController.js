const userService = require("../services/userService")

const signUp = async(req, res)=> {
try{
    const point = process.env.POINT;
    const {name,username, password, birth, contact, address} = req.body;
    if(!name||!username||!password||!birth||!contact||!address){
       return res.status(400).json({message : 'failed'});
    }
    const userId = await userService.signUp(name,username, password, birth, contact, point);
    console.log(userId)
    await userService.createUserAddress(userId,address);
    return res.status(201).json({message : "success"});
}catch(err){
    return res.status(err.statusCode || 400).json({MESSAGE : err.message})
}   
}

const gettingUserInfo=async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
           return res.status(400).json({message : 'failed'});
        }
        const userInfo = await userService.gettingUserInfo(id);
        return res.status(201).json({message : "success", data : userInfo})
    } catch(err) {
        return res.status(err.statusCode || 400).json({MESSAGE : "failed"})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const {username} = req.body;
        if(!username){
        return res.status(400).json({message : 'failed'});
    }
        await userService.deleteUser(username);
        return res.status(204).json({
        message : "success"
    })
    }catch(err){
        return res.status(err.statusCode || 400).json({message : err.MESSAGE})
    }
}

const logIn =async (req,res)=>{
try {
    const {username, password} = req.body;
    if(!username||!password){
        return res.status(400).json({message : 'failed'})
    }
    const token = await userService.logIn(username, password);
    if(token){
        return res.status(201).json({message : "success", message : token});
    }
    return res.status(400).json({message : "failed"});
}catch(err){
    return res.status(err.statusCode || 400).json({message : err.MESSAGE})
    }
}

const pointOut= async(req,res)=>{
    try{
        const {id} = req.body;
        const {price} = req.params;
        await userService.pointOut(price, id);
        if(!price){
            return res.status(400).json({message : "failed"})
        }
        return res.status(201).json({MESSAGE : "success"});
    }catch{
        return res.status(400).json({message : "failed"})
    }
}

const findUserAddress=async(req,res)=>{
    try{
        const {id} = req.body;
        const userAddress = await userService.findUserAddress(id);
        return res.status(201).json({MESSAGE : "success", data : userAddress});
    }catch(err){
        return res.status(400).json({message : "failed"})
    }
}

module.exports = {
    signUp,gettingUserInfo,deleteUser,logIn,pointOut,findUserAddress
}