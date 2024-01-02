// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
//   ComapnyEmplyeeID: String, // Assuming it's a string, you can adjust the type
//   ManagerId: String , // Assuming ManagerId is a reference to another User
//   JoiningDate: Date,
//   Certificates:[{
//     image: String,
//     title: String,
//     description: String,
//     organization: String,
//   }], // Assuming an array of strings, adjust as needed
//   ProfilePhoto: String,
//   JobTitle: String,
//   MoblieNumber: String, // Assuming it's a string, you can adjust the type
//   CompanyName: String,
//   Address: String,
//   Department: String,
//   Education: String,
//   EmploymentStatus: String,
//   WorkSedule: String, // You might want to use a more appropriate type or schema for the work schedule
//   FirstName: String,
//   LastName: String,
//   Email: String,
//   Password: String,
//   locations: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Location',
//     },
//   ],
//   tasks: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Task',
//     },
//   ],
// });

// export default mongoose.model('User', userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
  ComapnyEmplyeeID: { type: String, default: '' },
  ManagerId: { type: String, default: '' },
  JoiningDate: { type: Date, default: null },
  Certificates: [{
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    organization: { type: String, default: '' },
  }],
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
});

export default mongoose.model('User', userSchema);
