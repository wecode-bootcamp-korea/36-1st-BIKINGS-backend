const userDao = require("../models/userDao")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt");
const salt = Number(process.env.SALT);

const signUp= async(name,username, password, birth, contact, point)=>{
    try{
        const newUser = await userDao.isNew(username);
        const zeroOrOne = Number(Object.values(newUser[0])[0])
        if(!zeroOrOne){
            const hashed = await bcrypt.makeHash(password, salt)
            return await userDao.createUser(
                name,username, hashed, birth, contact, point
                )
        }
    }catch{
        const error = new Error("SIGN_UP_FAILED")
        error.statusCode = 400;
        throw error
    }
}

const gettingUserInfo = async (id)=>{
    try{
        return await userDao.gettingUserInfo(id);
     }catch{
         const error = new Error("GET_USER_INFO_FAILED")
         error.statusCode = 400;
         throw error
     }
}

const deleteUser = async(username)=>{
    try{
        return await userDao.deleteUser(
         username
         )
     }catch(err){
         const error = new Error("DELETE_USER_FAILED")
         error.statusCode = 400;
         throw error
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
        const error = new Error("LOGIN_FAILED")
        error.statusCode = 400;
        throw error
    }
}

module.exports={
    signUp, gettingUserInfo, deleteUser,logIn
}