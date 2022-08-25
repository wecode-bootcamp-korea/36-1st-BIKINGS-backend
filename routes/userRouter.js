const express = require("express");
const userController = require("../controllers/userController");
const jwt = require("../utils/jwt");
const router =express.Router();

router.post("/signup",userController.signUp);
router.post("/login", userController.logIn);
router.get("",jwt.validationToken ,userController.gettingUserInfo);
router.delete("", jwt.validationToken ,userController.deleteUser);
router.patch("/:price", jwt.validationToken,userController.pointOut);
router.get("/address", jwt.validationToken, userController.findUserAddress);

module.exports={
    router
}