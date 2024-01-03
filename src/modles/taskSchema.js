import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedDate:Date,

  task: String,
  completed: {type:Boolean, default: false},



  description: { type: String, default: '' },
  
});

export default mongoose.model('Task', taskSchema);
