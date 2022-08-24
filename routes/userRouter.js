const express = require("express");
const router =express.Router();
const userController = require("../controllers/userController");
const jwt = require("../utils/jwt")
router.post("/signup",userController.signUp);
router.post("/login", userController.logIn);
router.get("",jwt.validationToken ,userController.gettingUserInfo);
router.delete("", jwt.validationToken ,userController.deleteUser);

module.exports={
    router
}