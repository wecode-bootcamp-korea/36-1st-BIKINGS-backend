const userDao = require("../models/userDao")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt");
const salt = Number(process.env.SALT);

const errorFunc = (value, str)=>{
    const error = new Error(str);
    error.statusCode = value;
    throw error;
}

const signUp= async(name,username, password, birth, contact, point)=>{
    try{
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
        const newUser = await userDao.isNew(username);
        const zeroOrOne = Number(Object.values(newUser[0])[0])
        if(!zeroOrOne){
            const hashed = await bcrypt.makeHash(password, salt)
            return await userDao.createUser(
                name,username, hashed, birth, contact, point
                )
        }
    }catch{
        errorFunc(400, "failied")
    }
}

const findUserId= async(username)=>{
    try{
        return await userDao.findUserId(username);
    }catch{
        errorFunc(400, "failied")
    }
}

const userAddr= async(id, address)=>{
    try{
        return await userDao.userAddr(id, address);
    }catch{
        errorFunc(400, "failied")
    }
}

const gettingUserInfo = async (id)=>{
    try{
        return await userDao.gettingUserInfo(id);
     }catch{
        errorFunc(400, "failied")
     }
}

const deleteUser = async(username)=>{
    try{
        return await userDao.deleteUser(
         username
         )
     }catch(err){
        errorFunc(400, "failied")
     }
}

const logIn=async(username, password)=>{
    try{
        const newUser = await userDao.isNew(username);
        const zeroOrOne=Number(Object.values(newUser[0])[0]);
        if(zeroOrOne === 0) return false;

        const userInfo = await userDao.logIn(username);
        const temp = userInfo[0].password;
        const payLoad = {username : userInfo[0].username, id : userInfo[0].id, 
            birth : userInfo[0].birth, contact : userInfo[0].contact, 
            point : userInfo[0].point, name: userInfo[0].name};
        const auth = await bcrypt.isRightPassword(password,temp);
        if(auth){
            return jwt.makeToken(payLoad)
        }
        else return auth;
    }catch{
        errorFunc(400, "failied")
    }
}

module.exports={
    signUp, gettingUserInfo, deleteUser,logIn, findUserId, userAddr
}