const {myDataSource} = require("../utils/dataSource");

const createUser = async(name,username, hashed, birth, contact, point)=>{
        const result =  await myDataSource.query(
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
        return result['insertId']
}

const createUserAddress = async (userId, address)=>{
        return await myDataSource.query(
            `
            INSERT INTO user_addresses (
            user_id,
            address
            ) VALUES (
                ?,?
            )
            `,[userId, address]
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

const findUserAddress = async(user_id)=>{
    return await myDataSource.query(
        `
        SELECT address
        FROM user_addresses
        JOIN users
        ON users.id = user_addresses.user_id
        WHERE users.id = "${user_id}"
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

const pointOut=async(user_id, price)=>{
    return await myDataSource.query(
        `
        UPDATE users 
        SET point =users.point-? 
        WHERE users.id = ?;
        `,[price, user_id]
    )
}

module.exports={
    createUser, gettingUserInfo, deleteUser, logIn,isNew, createUserAddress, pointOut,
    findUserAddress
}