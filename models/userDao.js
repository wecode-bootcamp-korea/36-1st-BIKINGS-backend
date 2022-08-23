const {appDataSource} = require("../utils/dataSource");

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

const findUserId = async(username)=>{
    try{
        return await appDataSource.query(
            `
            SELECT users.id
            FROM users
            WHERE users.username = "${username}"
            `
        )
    }catch{
        const error = new Error("SIGN_UP_FAILED")
        error.statusCode = 500;
        throw error;
    }
}

const userAddr = async (id, address)=>{
    try{
        return await appDataSource.query(
            `
            INSERT INTO user_addresses (
            user_id,
            address
            ) VALUES (
                ?,?
            )
            `,[id, address]
        )
    }
    catch{
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
    }catch(err){
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
    }catch(err){
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
    }catch(err){
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
    }catch (err){
        const error=new Error("aleady_exist")
        error.statusCode = 400;
        throw error
    }
}

module.exports={
    createUser, gettingUserInfo, deleteUser, logIn,isNew, userAddr, findUserId
}