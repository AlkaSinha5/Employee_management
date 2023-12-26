import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  Date:{
    type:Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Task', taskSchema);
