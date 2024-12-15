JWT_SECRET_KEY="user";
const userSchema=require('../models/usermodel');
const taskSchema=require("../models/taskmodel");
const adminData=async(req,res)=>{
    try{
        const {name,email,password,role="admin"}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all credentials are required"
            });
        }

        const admin=await userSchema.findOne({role:role});
        if(admin){
            return res.status(400).json({
                message:"admin already exist"
            })
        }

        const data=await userSchema.create({
            name:name,
            email:email,
            password:password,
            role:role
        })
        res.status(200).json({
            message:"Registered successfully now login"
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}


const getAllUser=async(req,res)=>{
    try{
        const {page,limit}=req.query;
        const totaluser=await userSchema.countDocuments();
        const skipdata=(page-1)*limit;
                
        const users=await userSchema.find({role:"user"}).skip(skipdata).limit(limit).exec();
        if(!users){
            return res.status(404).json({
                message:"no user found"
            })
        }
        res.status(200).json({
            users,
            totalPages:Math.ceil(totaluser/limit)
        })

    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const deleteUser=async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return res.status(400).json("id is required");
        }

        const task=await taskSchema.deleteMany({assignedTo:id});

        const data=await userSchema.findByIdAndDelete(id);
        res.status(200).json({
            message:"User removed successfully"
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}


module.exports={
    adminData,
    getAllUser,
    deleteUser
}