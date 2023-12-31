import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  ComapnyEmplyeeID: String, // Assuming it's a string, you can adjust the type
  ManagerId: String , // Assuming ManagerId is a reference to another User
  JoiningDate: Date,
  Certificates:[{
    image: String,
    title: String,
    description: String,
    organization: String,
  }], // Assuming an array of strings, adjust as needed
  ProfilePhoto: String,
  JobTitle: String,
  MoblieNumber: String, // Assuming it's a string, you can adjust the type
  CompanyName: String,
  Address: String,
  Department: String,
  Education: String,
  EmploymentStatus: String,
  WorkSedule: String, // You might want to use a more appropriate type or schema for the work schedule
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

export default mongoose.model('User', userSchema);
