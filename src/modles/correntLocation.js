import mongoose from 'mongoose';

const currentLocationSchema = new mongoose.Schema({
  EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
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
