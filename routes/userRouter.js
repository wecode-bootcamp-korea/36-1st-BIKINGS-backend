const express = require("express");
const userController = require("../controllers/userController");
const jwt = require("../utils/jwt");
const router =express.Router();

router.post("/signup",userController.signUp);
router.post("/login", userController.logIn);
router.get("/info",jwt.validationToken ,userController.gettingUserInfo);
router.delete("/withrowal", jwt.validationToken ,userController.deleteUser);

module.exports={
    router
}