import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    ClockInDateTime: { type: Date },
    ClockOutDateTime: { type: Date },
    GeolocationTracking: [
        {
            timestamp: { type: Date, required: true },
            location: {
                type: {
                    type: String,
                    enum: ['Point'],
                    required: true,
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
            },
        },
    ],
});


attendanceSchema.index({ Location: '2dsphere' });

export default mongoose.model('Attendance', attendanceSchema);
