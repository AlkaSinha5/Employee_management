import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
//   ClockInDateTime: { type: Date },
//   ClockOutDateTime: { type: Date },
//   GeolocationTracking: [
//     {
//       timestamp: { type: Date },
//       location: {
//         type: {
//           type: String,
//           enum: ['Point'],
//           default: 'Point',
//         },
//         coordinates: {
//           type: [Number],
//           required: true,
//         },
//       },
//     },
//   ],
//   Status: {
//     type: String,
//     enum: ['Present', 'Absent', 'Leave'],
//   },
//   Photo: { type: String },
//   attendenceDate: {type: Date},
// });


// attendanceSchema.index({ 'GeolocationTracking.location': '2dsphere' });
const attendanceSchema = new mongoose.Schema({
  EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  ClockInDateTime: { type: String },
  // ClockOutDateTime: { type: Date },
  GeolocationTracking: {
    type :String,
  },
  
  Status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
  },
  Photo: { type: String },
  attendenceDate: {type: Date},
});


attendanceSchema.index({ 'GeolocationTracking.location': '2dsphere' });

export default mongoose.model('Attendance', attendanceSchema);