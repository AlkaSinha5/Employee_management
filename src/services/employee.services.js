import asyncHandler from "express-async-handler";
import Employee from "../modles/employeeSchema.js";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: "dhzk0ztrn",
    api_key: "571339484391153",
    api_secret: "WWmOJpVF5y02r7Blu2oAr0RxbU0",
  });
  export const addEmployee = asyncHandler(async (req, res) => {
    try {
      const {
        UserID,
        AttendenceID,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        jobType,
        joiningDate,
        companyName,
      } = req.body;
  
      const file = req.files.ProfilePicture;
  
      if (!file) {
        return res.status(400).json({
          success: false,
          error: "ProfilePicture is required.",
        });
      }
  
      // Ensure that joiningDate is a valid Date object or a valid date string
      const isValidDate =
        joiningDate && !isNaN(new Date(joiningDate).getTime());
  
      if (!isValidDate) {
        return res.status(400).json({
          success: false,
          error: "joiningDate is not a valid date.",
        });
      }
  
      const result = await cloudinary.uploader.upload(file.tempFilePath);
  
      const employee = await Employee.create({
        UserID,
        AttendenceID,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        jobType,
        joiningDate,
        companyName,
        ProfilePicture: result.secure_url,
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
      .limit(size)
      .populate('AttendenceID');
  
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
  
 export const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.ProfilePicture) {
      const file = req.files.ProfilePicture;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePicture = result.secure_url;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});



