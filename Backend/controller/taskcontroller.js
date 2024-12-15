const taskSchema=require("../models/taskmodel");
const jwt=require("jsonwebtoken");
const JWT_SECRET_KEY="user";

const getAllTask=async(req,res)=>{
    try{
        const {page,limit}=req.query;
        const totaltask=await taskSchema.countDocuments();
        const skipdata=(page-1)*limit;
        
        const tasks=await taskSchema.find().skip(skipdata).limit(limit).populate('assignedTo').exec();
        res.status(200).json({
            tasks,
            totalPages:Math.ceil(totaltask/limit)
        })

    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}

const deleteTask=async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return res.status(400).json("Id required");
        }
        const data=await taskSchema.findByIdAndDelete(id);
        res.status(200).json("task deleted")

    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}

const updateTask=async(req,res)=>{
    try{
        const {title, description, dueDate, priority,id}=req.body;
        if(!id){
            return res.status(400).json("Id required");
        }
        const task=await taskSchema.findById(id);
        task.title=title;
        task.description=description;
        task.dueDate=dueDate;
        task.priority=priority;
        await task.save();
        res.status(200).json("task updated");

    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}

const setTask=async(req , res)=>{
    try{
        const {title, description, dueDate, priority ,id}=req.body;
        const data=taskSchema.create({
            title:title,
            description:description,
            dueDate:dueDate,
            priority:priority,
            assignedTo:id
        })
        
        res.status(200).json("Task saved");
    }catch(err){
        res.status(500).json(err || "internal server error")
    }
}

const getTask=async(req,res)=>{
    try{
        const {page,limit,token}=req.query;
        const decode =jwt.verify(token,JWT_SECRET_KEY);
        if(!decode){
            return res.status(400).json("Invalid user");
        }
        const totaltask=await taskSchema.find({assignedTo:decode.id}).countDocuments();
        const skipdata=(page-1)*limit;
        
        const tasks=await taskSchema.find({assignedTo:decode.id}).skip(skipdata).limit(limit).exec();
        res.status(200).json({
            tasks,
            totalPages:Math.ceil(totaltask/limit)
        })

    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}


// const getTask = async (req, res) => {
//     try {
//       const { token } = req.query;
  
//       // Decode the token
//       const decode = jwt.verify(token, JWT_SECRET_KEY);
//       if (!decode) {
//         return res.status(400).json("Invalid user");
//       }
  
//       // Fetch all tasks assigned to the user
//       const tasks = await taskSchema.find({ assignedTo: decode.id }).exec();
  
//       res.status(200).json({
//         tasks,
//       });
//     } catch (err) {
//       return res.status(500).json(err.message || "Internal server error");
//     }
//   };
  

const getTaskById=async(req,res)=>{
    try{
        const {id}=req.query;
        if(!id){
            return res.status(400).json("Id is required");
        }
        const data=await taskSchema.findById(id).populate("assignedTo");
        res.status(200).json(data);

    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}

const updateStatus=async(req,res)=>{
    try{
      const {id,taskstatus}=req.body;
      if(!id){
        return res.status(400).json("Id required");
      }
      const task=await taskSchema.findById(id);
      task.status=taskstatus;
      await task.save();
      res.status(200).json("task status updated");
    }catch(err){
        return res.status(500).json(err || "Internal server error");
    }
}

module.exports={
    getAllTask,
    deleteTask,
    updateTask,
    setTask,
    getTask,
    getTaskById,
    updateStatus,
}