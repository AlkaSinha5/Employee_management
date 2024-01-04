import asyncHandler from "express-async-handler"
import { addAttendance, deleteAttendence, getAttendence, getAttendenceById,  getAttendenceByUserId,  getAttendenceCount,  getSallaryByUserId,  getStatusMothWise,  getperDayStatus,  updateAttendence} from "../services/attendance.service.js";


export const AddAttendence = asyncHandler(async (req, res) => {
const customer = await addAttendance(req, res);
});

export const GetAttendence = asyncHandler(async (req, res) => {
    try {
      const { page, size, search, sort } = req.query;
  
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10000000,
      };
  
      const filter = {
        $or: [
         { Status: { $regex: search || "", $options: "i" } },
         
          // Add more conditions if needed
        ],
      };
  
      const sortingOptions = sort ? sort.split(",") : ["", ""];
      const sortByField = sortingOptions[0];
      const sortDirection = sortingOptions[1];
      const sortBy = {};
    if (sortByField) {
      sortBy[sortByField] = sortDirection;
    } 
  
      const result = await getAttendence(paginationOptions, filter, sortBy);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });

  export const DeleteAttendence = asyncHandler(async (req, res) => {
    const result = await deleteAttendence(req, res);
  });
  
  export const UpdateAttendence = asyncHandler(async (req, res) => {
    
    const success = await updateAttendence(req,res)
    
  });
  
  export const GetAttendenceById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await getAttendenceById(id);
    res.status(200).send({ result });
  });

  export const GetAttendenceCount = asyncHandler(async (req, res) => {
    const result = await getAttendenceCount(req,res);
  });

  export const GetPerDayStatus = asyncHandler(async (req, res) => {
    const result = await getperDayStatus(req,res);
  });

  export const GetStatusMonthWise = asyncHandler(async (req, res) => {
    const result = await getStatusMothWise(req,res);
  });

  export const GetAttendenceByUserId = asyncHandler(async (req, res) => {
    const result = await getAttendenceByUserId(req,res);
  });

  export const GetSallaryByUserId = asyncHandler(async (req, res) => {
    const result = await getSallaryByUserId(req,res);
  });