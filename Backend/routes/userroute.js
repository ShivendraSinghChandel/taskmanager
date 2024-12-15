const express=require("express");
const { getUserData, userInfo, userData } = require("../controller/usercontroller");
const route=express.Router();

route.post("/getuserdata",getUserData);
route.get("/userinfo",userInfo);
route.post("/userdata",userData);

module.exports=route;