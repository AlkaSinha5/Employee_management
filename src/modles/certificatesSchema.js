import mongoose from 'mongoose';

const certificatesSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  organization: { type: String, default: '' },
 

  
});

export default mongoose.model('Certificates', certificatesSchema);
