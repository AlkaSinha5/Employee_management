import asyncHandler from "express-async-handler"
import Admin from "../modles/adminSchema.js"
import { addAdmin, loginAdmin } from "../services/admin.service.js";



export const AddAdmin = asyncHandler(async (req, res) => {
 try {
  const { Email} = req.body;

  
  const useAvailable = await Admin.findOne({ Email });
  if (useAvailable) {
    res.status(400);
    throw new Error("Email already exit");
  }
   const user = await addAdmin(req, res);
 } catch (error) {
  res.status(400).json({
    success: false,
    error: error.message,
  });
 }
    
});

export const LoginAdmin = asyncHandler(async (req, res) => {
 
    const user = await loginAdmin(req, res); 

 
});