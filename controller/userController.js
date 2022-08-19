const userService = require("../services/userService")

const signUp = async(req, res)=> {
try{
    const point = process.env.POINT;
    const {name,username, password, birth, contact} = req.body;
    if(!name||!username||!password||!birth||!contact){
       res.status(400).json({message : 'KEY_ERROR'});
    }
    const pwValidation = new RegExp(
        '^[a-zA-Z0-9]{4,10}$'
      );
      const userNameValidation = new RegExp(
        '^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$'
      );
      if (!pwValidation.test(password)) {
        return res.status(400).json({ message:"INVALID USER" });
      }
      if(!userNameValidation.test(username)){
        return res.status(400).json({ message:"INVALID USER" });
      }
    await userService.signUp(name,username, password, birth, contact, point);
    return res.status(201).json({message : "success"});
}catch{
    const error = new Error("failed");
    error.statusCode = 400;
    throw error
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
        return res.status(err.statusCode || 500).json({MESSAGE : "get_user_info_failed"})
    }
}

const deleteUser=async(req,res)=>{
    const {username} = req.body;
    if(!username){
       return res.status(400).json({message : 'KEY_ERROR'});
    }

    await userService.deleteUser(username);
    return res.status(204).json({
        message : "delete_user_success"
    })
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
    return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE})
    }
}
module.exports = {
    signUp,gettingUserInfo,deleteUser,logIn
}