import Joi from 'joi';

const attendanceSchema = Joi.object({
  EmployeeID: Joi.string().hex().length(24).required(), // Assuming a valid ObjectId
  ClockInDateTime: Joi.date().required(),
  ClockOutDateTime: Joi.date().required(),
  GeolocationTracking: Joi.array().items(
    Joi.object({
      timestamp: Joi.date().required(),
      location: Joi.object({
        type: Joi.string().valid('Point').default('Point'),
        coordinates: Joi.array().items(Joi.number()).required(),
      }),
    })
  ),
  Status: Joi.string().valid('present', 'absent', 'leave').required(),
  Photo: Joi.string(),
});

export { attendanceSchema };
