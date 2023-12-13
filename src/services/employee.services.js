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
        ProfilePicture,
        jobType,  } = req.body;
    
const employee = await Employee.create({
    UserID,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    ProfilePicture,
    jobType, 
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

  export const getEmployee = asyncHandler(async (paginationOptions,filter,sort) => {
    try {
      const { page, size } = paginationOptions;
      const totalDocuments = await Employee.countDocuments(filter);
      const totalPages = Math.ceil(totalDocuments / size);
      const skip = (page - 1) * size;
  
      const collation = {
        locale: 'en',  
        strength: 2,
      };
  
      const success = await Employee.find(filter)
      .collation(collation)
      .sort(sort)
      .skip(skip)
      .limit(size);
  
      return {
        page,
        size,
        data: success,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocuments,
      };
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }); 

  export const deleteEmployee = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const success = await Employee.findByIdAndDelete(id);
    if (success) {
      res.status(200).send({ success, message: "Ok deleted ......" });
    } else {
    
      res.status(404).send({massage: "ID not found "})
        return { error: "not deleted..." };
    }
  });
  
export const getEmployeeById = asyncHandler(async (id) => {
    const success = await Employee.findById(id);
    console.log(success);
    return success;
  });
  
export const updateEmployee = asyncHandler(async (id, updatedData) => {
    const success = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log(success);
    return success;
  });

