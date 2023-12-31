
import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    // UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    AttendenceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' },
    FirstName: { type: String},
    LastName: { type: String },
    Email: { type: String },
    PhoneNumber: { type: String },
    ProfilePicture: { type: String }, 
    jobType: { type: String },
    joiningDate:{type: Date},
    companyName:{type: String},

  
    
  });

  export default mongoose.model('Employee', employeeSchema);
  