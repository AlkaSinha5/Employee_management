import asyncHandler from "express-async-handler";
import { addDailyData } from "../services/dailySummary.service.js";


export const AddDaily = asyncHandler(async (req, res) => {
    const result = await addDailyData(req, res);
  });