import asyncHandler from "express-async-handler";
import { getAllSalaryByUserId } from "../services/salary.service.js";





export const GetAllSalaryByUserId = asyncHandler(async (req, res) => {
    const result = await getAllSalaryByUserId(req, res);
  });