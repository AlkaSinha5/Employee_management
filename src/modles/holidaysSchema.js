import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema({
  holiday: String,
  holiDate: Date,
});

export default mongoose.model('Holiday', holidaySchema);
