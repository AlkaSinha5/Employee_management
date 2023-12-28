import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tasks: [
    {
      task: String,
      completed: Boolean,
      Date: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model('Task', taskSchema);
