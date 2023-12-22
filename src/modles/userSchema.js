import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
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
  
});

export default mongoose.model('User', userSchema);
