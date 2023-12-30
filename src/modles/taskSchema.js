import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Date: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      task: String,
      completed: Boolean,
      _id:false,
    },
  ],
  description: { type: String, default: '' },
  
});

export default mongoose.model('Task', taskSchema);
