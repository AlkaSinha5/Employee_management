// models/Salary.js
import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  monthYear: {
    type: String,
    
  },
  totalDays: {
    type: Number,
    
  },
  sallaryDistribution: {
    type: Number,
    
  },
  getSallary: {
    type: Number,
    
  },
});

export default  mongoose.model('Salary', SalarySchema);

