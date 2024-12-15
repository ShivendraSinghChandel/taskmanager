const mongoose=require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: {
      type:Date,
      default:Date.now()
    },
    status: { type: String, default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

  module.exports=mongoose.model('Task',TaskSchema);