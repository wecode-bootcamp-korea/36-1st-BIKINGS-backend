const userService = require("../services/userService")

const signUp = async(req, res)=> {
try{
    const point = process.env.POINT;
    const {name,username, password, birth, contact, address} = req.body;
    if(!name||!username||!password||!birth||!contact||!address){
       res.status(400).json({message : 'KEY_ERROR'});
    }
    const a = await userService.signUp(name,username, password, birth, contact, point);
    const userId = await userService.findUserId(username);
    // const b = await userService.userAddr(userId, address);
    console.log(a, userId)
    return res.status(201).json({message : "success"});
}catch(err){
    return res.status(err.statusCode || 400).json({MESSAGE : err.message})
}   
}

const gettingUserInfo=async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
           return res.status(400).json({message : 'KEY_ERROR'});
        }
        const userInfo = await userService.gettingUserInfo(id);
        return res.status(201).json({message : "get_user_info_success", data : userInfo})
    } catch(err) {
        return res.status(err.statusCode || 400).json({MESSAGE : "get_user_info_failed"})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const {username} = req.body;
        if(!username){
        return res.status(400).json({message : 'KEY_ERROR'});
    }
        await userService.deleteUser(username);
        return res.status(204).json({
        message : "delete_user_success"
    })
    }catch(err){
        return res.status(err.statusCode || 400).json({MESSAGE : err.MESSAGE})
    }
}

const logIn =async (req,res)=>{
try {
    const {username, password} = req.body;
    if(!username||!password){
        return res.status(400).json({message : 'id, password invalid'})
    }
    const token = await userService.logIn(username, password);
    if(token){
        return res.status(201).json({MESSAGE : "login success", TOKEN : token});
    }
    return res.status(400).json({MESSAGE : "login failed"});
}catch(err){
    return res.status(err.statusCode || 400).json({MESSAGE : err.MESSAGE})
    }
}
module.exports = {
    signUp,gettingUserInfo,deleteUser,logIn
}