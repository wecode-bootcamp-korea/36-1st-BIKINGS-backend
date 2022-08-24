const {myDataSource} = require("../utils/dataSource");

const createUser = async(name,username, hashed, birth, contact, point)=>{
        return await myDataSource.query(
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
}

const findUserId = async(username)=>{
        return await myDataSource.query(
            `
            SELECT users.id
            FROM users
            WHERE users.username = "${username}"
            `
        )
}

const userAddr = async (id, address)=>{
        return await myDataSource.query(
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



const gettingUserInfo = async(id)=>{
        return await myDataSource.query(`
            SELECT 
                * 
            FROM users
            WHERE users.id=?
            `,[id]
        );
}

const deleteUser = async(username)=>{
        return await myDataSource.query(
            `
            DELETE 
            FROM users
            WHERE users.username ="${username}"
            `
        )
}

const logIn = async(username)=>{
        return await myDataSource.query(
            `
        SELECT *
        FROM users
        WHERE users.username="${username}"
        `
        )
}

const isNew=async(username)=>{
        return await myDataSource.query(
        `
        SELECT EXISTS(
            SELECT *
            FROM users 
            WHERE users.username = "${username}"
            )
        `
        )
}

module.exports={
    createUser, gettingUserInfo, deleteUser, logIn,isNew, userAddr, findUserId
}