import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
  ComapnyEmplyeeID: { type: String, default: '' },
  ManagerId: { type: String, default: '' },
  JoiningDate: { type: Date, default: null },
  // Certificates: [{
  //   image: { type: String, default: '' },
  //   title: { type: String, default: '' },
  //   description: { type: String, default: '' },
  //   organization: { type: String, default: '' },
  // }],
  ProfilePhoto: { type: String, default: '' },
  JobTitle: { type: String, default: '' },
  MoblieNumber: { type: String, default: '' },
  CompanyName: { type: String, default: '' },
  Address: { type: String, default: '' },
  Department: { type: String, default: '' },
  Education: { type: String, default: '' },
  EmploymentStatus: { type: String, default: '' },
  WorkSedule: { type: String, default: '' },
  FirstName: { type: String },
  LastName: { type: String},
  Email: { type: String },
  Password: { type: String},
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
   
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificates',
    
  }],
});

export default mongoose.model('User', userSchema);
