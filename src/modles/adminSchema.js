
import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    
    FirstName: { type: String},
    LastName: { type: String },
    Email: { type: String },
    Password:{type: String},
    PhoneNumber: { type: String },
});

  export default mongoose.model('Admin', adminSchema);
  