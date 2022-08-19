const {appDataSource} = require("../utils/dataSource");

//point 모호함 실험 필요. 천만 주거나 디폴트 주거나. 실험 해보자.
const createUser = async(name,username, hashed, birth, contact, point)=>{
    try{
        return await appDataSource.query(
            `
            INSERT INTO users(
                name,
                username,
                password,
                birth,
                contact,
                point
            )VALUES (
                ?,?,?,?,?,?
            )
            `,[name,username, hashed, birth, contact, point]
        )
    }catch(err){
        const error = new Error("SIGN_UP_FAILED")
        error.statusCode = 500;
        throw error;
    }
}

const gettingUserInfo = async(id)=>{
    try{
        return await appDataSource.query(`
            SELECT 
                * 
            FROM users
            WHERE users.id=?
            `,[id]
        );
    }catch{
        const error = new Error("SIGN_UP_FAILED")
        error.statusCode = 500;
        throw error;
    }
}

const deleteUser = async(username)=>{
    try{
        return await appDataSource.query(
            `
            DELETE 
            FROM users
            WHERE users.username ="${username}"
            `
        )
    }catch{
        const error = new Error("SIGN_UP_FAILED")
        error.statusCode = 500;
        throw error;
    }
}

const logIn = async(username)=>{
    try{
        return await appDataSource.query(
            `
        SELECT *
        FROM users
        WHERE users.username="${username}"
        `
        )
    }catch{
        const error = new Error("LOG_IN_FAILED")
        error.statusCode = 500;
        throw error;
    }
}

const isNew=async(username)=>{
    try{
        return await appDataSource.query(
        `
        SELECT EXISTS(
            SELECT *
            FROM users 
            WHERE users.username = "${username}"
            )
        `
        )
    }catch{
        const error=new Error("aleady_exist")
        error.statusCode = 400;
        throw error
    }
}

module.exports={
    createUser, gettingUserInfo, deleteUser, logIn,isNew
}