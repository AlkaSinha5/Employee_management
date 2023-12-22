import mongoose from 'mongoose';

const currentLocationSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Description: {
    type: String},
  
});

export default mongoose.model('DailyDescription', currentLocationSchema);
