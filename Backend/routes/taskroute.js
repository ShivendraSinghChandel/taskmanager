const express=require("express");
const {  getTask, getTaskById,updateStatus, setTask, getAllTask, deleteTask, updateTask } = require("../controller/taskcontroller");
const route=express.Router();

route.post("/settask",setTask);
route.get("/getalltask",getAllTask);
route.post("/deletetask",deleteTask);
route.post("/updateTask",updateTask);
route.get("/gettask",getTask);
route.get("/gettaskbyid",getTaskById);
route.post("/updatestatus",updateStatus);

module.exports=route;