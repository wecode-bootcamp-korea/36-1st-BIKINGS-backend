const userDao = require("../models/userDao")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt");
const salt = Number(process.env.SALT);

const signUp= async(name,username, password, birth, contact, point)=>{
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
}

const findUserId= async(username)=>{
        return await userDao.findUserId(username);
}

const userAddr= async(id, address)=>{
        return await userDao.userAddr(id, address);
}

const logIn=async(username, password)=>{
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
}

const gettingUserInfo = async (id)=>{
  return await userDao.gettingUserInfo(id);
}

const deleteUser = async(username)=>{
  return await userDao.deleteUser(
   username
   )
}

module.exports={
    signUp, findUserId, userAddr, logIn, gettingUserInfo,deleteUser
}