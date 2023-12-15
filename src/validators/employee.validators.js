import Joi from 'joi';
const employeeJoiSchema = Joi.object({
    UserID: Joi.string().hex().length(24), // Assuming ObjectId is represented as a hex string with 24 characters
    FirstName: Joi.string(),
    LastName: Joi.string(),
    Email: Joi.string().email(),
    PhoneNumber: Joi.string(),
    ProfilePicture: Joi.string().uri(), // Assuming ProfilePicture is a URL
    jobType: Joi.string(),
    joiningDate: Joi.date(),
    companyName: Joi.string(),
  });


  export { employeeJoiSchema};