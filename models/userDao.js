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
    createUser,isNew, userAddr, findUserId
}