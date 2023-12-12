import asyncHandler from "express-async-handler"
import { addEmployee } from "../services/employee.services.js";

export const AddEmployee = asyncHandler(async (req, res) => {
 
    const {
    UserID, 
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    ProfilePicture,  } = req.body;

   const customer = await addEmployee(req, res);
});