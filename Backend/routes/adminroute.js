const express=require("express");
const { adminData, getAllUser, deleteUser } = require("../controller/adminController");
const route=express.Router();

route.post("/admindata",adminData);
route.get("/getalluser",getAllUser);
route.post("/deleteuser",deleteUser);
module.exports=route;
