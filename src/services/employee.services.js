import asyncHandler from "express-async-handler";
import Employee from "../modles/employeeSchema.js";


export const addEmployee = asyncHandler(async (req, res) => {
    try {
        const {   
        UserID,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        ProfilePicture, } = req.body;
    
const employee = await Employee.create({
    UserID,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    ProfilePicture,
        });
  
        res.status(201).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
  });

  