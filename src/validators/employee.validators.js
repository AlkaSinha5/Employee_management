import Joi from 'joi';
const employeeJoiSchema = Joi.object({
    AttendenceID: Joi.string().hex().length(24), 
    LastName: Joi.string(),
    Email: Joi.string().email(),
    PhoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    ProfilePicture: Joi.string(),
    jobType: Joi.string(),
    joiningDate: Joi.date(),
    companyName: Joi.string(),
  });


  export { employeeJoiSchema};