const userSchema=require("../models/usermodel")
const jwt=require('jsonwebtoken');
JWT_SECRET_KEY="user";

const userData=async(req,res)=>{
    try{
        const {name,email,password,role="user"}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all credentials are required"
            });
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

const getUserData=async(req,res)=>{
    try{
    const {email,password,role}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All credentials required"
        })
    }
    const user=await userSchema.findOne({email:email});
    if(!user){
        return res.status(404).json({
            message:"No user found"
        })
    }
    if(user.password!=password){
        return res.status(400).json({
            user,
            message:"Invalid password"
        })
    }
    if(user.role!=role){
        return res.status(400).json({
            message:"Invalid access"
        })
    }
    const token=jwt.sign({id:user._id,name:user.name,role:user.role},JWT_SECRET_KEY,{expiresIn:'90d'})
    res.status(200).json({token,role:user.role});
}catch(err){
    res.status(500).json({
        message:err
    })
}

}

const userInfo=async(req,res)=>{
    try{
           const {token}=req.query;
           const decode =jwt.verify(token,JWT_SECRET_KEY);
           const user=await userSchema.findById(decode.id);
           if(!user){
            return res.status(404).json({
                message:"no user found"
            })
           }
           res.status(200).json(user);

        }catch(err){
            return res.status(500).json(err || "Internal server error");
        }
}

module.exports={
    userData,
    getUserData,
    userInfo
}