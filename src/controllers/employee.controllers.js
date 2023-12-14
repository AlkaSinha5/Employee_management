import asyncHandler from "express-async-handler"
import { addEmployee, deleteEmployee, getEmployee, getEmployeeById, updateEmployee } from "../services/employee.services.js";

export const AddEmployee = asyncHandler(async (req, res) => {
 
    const {
    UserID, 
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    ProfilePicture,
    jobType,  } = req.body;

   const customer = await addEmployee(req, res);
});

export const GetEmployee = asyncHandler(async (req, res) => {
    try {
      const { page, size, search, sort } = req.query;
  
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
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
  
      const result = await getEmployee(paginationOptions, filter, sortBy);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });

  export const DeleteEmployee = asyncHandler(async (req, res) => {
    const result = await deleteEmployee(req, res);
  });
  
  export const UpdateEmployee = asyncHandler(async (req, res) => {
    
    const success = await updateEmployee(req,res);
    
  });
  
  export const GetEmployeeById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await getEmployeeById(id);
    res.status(200).send({ result });
  });