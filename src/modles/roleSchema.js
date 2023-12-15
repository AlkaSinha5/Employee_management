import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    roleName: String,
    isEnabled: {
      type: Boolean,
      default: true,
    },
  })
  
  export default mongoose.model('Role', roleSchema);