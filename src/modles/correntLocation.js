import mongoose from 'mongoose';

const currentLocationSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Location: {
    type: String},
  Date: {
    type: Date},
  Time: {
    type: String},
  Address: {
    type: String},
});

export default mongoose.model('Location', currentLocationSchema);
