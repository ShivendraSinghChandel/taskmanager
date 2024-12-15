const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser")
const port=5000;
const userRoute=require("./routes/userroute");
const taskRoute=require("./routes/taskroute");
const adminRoute=require("./routes/adminroute");
const morgan=require('morgan')
mongoose.connect("mongodb://127.0.0.1:27017/taskmanagement").then(()=>{
    console.log("Database connected")
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use('/task',taskRoute);
app.use('/admin',adminRoute);

morgan('tiny')


app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
