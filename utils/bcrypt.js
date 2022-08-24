const bcrypt = require("bcrypt");

const makeHash= (password, saltRound)=>{
    return bcrypt.hash(password, saltRound)
}

const isRightPassword = (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}

module.exports ={
    makeHash, isRightPassword
}