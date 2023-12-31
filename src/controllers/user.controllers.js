
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

  try {
    const { page, size, search, sort } = req.query;

    const paginationOptions = {
      page: parseInt(page) || 1,
      size: parseInt(size) || 1000000,
    };

    const filter = {
      $or: [
       { FirstName: { $regex: search || "", $options: "i" } },
        { LastName: { $regex: search || "", $options: "i" } },
        // Add more conditions if needed
      ],
    };

    const sortingOptions = sort ? sort.split(",") : ["", ""];
    const sortByField = sortingOptions[0];
    const sortDirection = sortingOptions[1];
    const sortBy = {};
  if (sortByField) {
    sortBy[sortByField] = sortDirection;
  } else {
    sortBy.FirstName = 1;
  }

    const result = await getUsers(paginationOptions, filter, sortBy);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
  
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