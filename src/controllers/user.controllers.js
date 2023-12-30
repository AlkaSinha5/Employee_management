
import asyncHandler from "express-async-handler"
import userSchema from "../modles/userSchema.js";
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateDataByUser, updateUser } from "../services/user.services.js";



export const AddUser = asyncHandler(async (req, res) => {
 try {
  const { Email} = req.body;

  
  const useAvailable = await userSchema.findOne({ Email });
  if (useAvailable) {
    res.status(400);
    throw new Error("Email already exit");
  }
   const user = await addUser(req, res);
 } catch (error) {
  res.status(400).json({
    success: false,
    error: error.message,
  });
 }
    
});

export const LoginUser = asyncHandler(async (req, res) => {
 
    const user = await loginUser(req, res); 

 
});

export const GetUsers = asyncHandler(async (req, res) => {

const result = await getUsers(req,res);
  
});

export const DeleteUser = asyncHandler(async (req, res) => {
  const result = await deleteUser(req, res);
});

export const UpdateUser = asyncHandler(async (req, res) => {
  
  const success = await updateUser(req,res)
   
});

export const GetUserById = asyncHandler(async (req, res) => {
  
  const result = await getUserById(req,res);
  
});

export const UpdateDataByUser= asyncHandler(async (req, res) => {
  const success = await updateDataByUser(req,res)
  
});