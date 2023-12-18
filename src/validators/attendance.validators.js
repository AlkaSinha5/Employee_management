import Joi from 'joi';

const attendanceSchema = Joi.object({
  EmployeeID: Joi.string(),
  ClockInDateTime: Joi.date(),
  // ClockOutDateTime: Joi.date(),
  GeolocationTracking: Joi.string(),
  Status: Joi.string().valid('Present', 'Absent', 'Leave'),
  Photo: Joi.string(),
  attendenceDate: Joi.date(),
});

export { attendanceSchema };
