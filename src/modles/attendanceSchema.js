import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  ClockInDateTime: { type: Date },
  ClockOutDateTime: { type: Date },
  GeolocationTracking: [
    {
      timestamp: { type: Date },
      latitude: { type: Number},
      longitude: { type: Number },
    },
  ],
  Status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
  },
  Photo: { type: String },
});

attendanceSchema.index({ 'GeolocationTracking.location': '2dsphere' });

export default mongoose.model('Attendance', attendanceSchema);
