import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  ClockInDateTime: { type: Date },
  ClockOutDateTime: { type: Date },
  GeolocationTracking: [
    {
      timestamp: { type: Date },
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
  ],
  Status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
  },
  Photo: { type: String },
});

// Add a 2dsphere index on the 'GeolocationTracking.location' field
attendanceSchema.index({ 'GeolocationTracking.location': '2dsphere' });

export default mongoose.model('Attendance', attendanceSchema);