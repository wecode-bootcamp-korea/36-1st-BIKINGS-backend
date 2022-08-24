const userService = require("../services/userService")

const signUp = async(req, res)=> {
try{
    const point = process.env.POINT;
    const {name,username, password, birth, contact, address} = req.body;
    if(!name||!username||!password||!birth||!contact||!address){
       res.status(400).json({message : 'KEY_ERROR'});
    }
    await userService.signUp(name,username, password, birth, contact, point);
    const userId = await userService.findUserId(username);
    await userService.userAddr(userId[0].id,address);
   
    return res.status(201).json({message : "success"});
}catch(err){
    return res.status(err.statusCode || 400).json({MESSAGE : err.message})
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
    signUp,logIn
}