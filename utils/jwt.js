const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY

const makeToken =(payLoad)=>{
    return jwt.sign(payLoad, key)
}

const isRightToken = (token)=>{
    return jwt.verify(token, key);
}

const validationToken = async (req,res,next)=>{
    try {
        const token= req.headers.authorization;
        const result = isRightToken(token);
        if(result){
            const {username , id, birth, contact , point , name} = result
            req.body.username = username; req.body.birth = birth
            req.body.id = id; req.body.contact = contact;
            req.body.point = point, req.body.name=name;
            next();
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({MESSAGE : "INVALID TOKEN"})
    }
}

module.exports ={
    makeToken, isRightToken, validationToken
}