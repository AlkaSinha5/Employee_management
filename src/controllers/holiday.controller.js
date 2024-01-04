import asyncHandler from "express-async-handler";
import { addHolidayData, getAllHolidays } from "../services/holiday.service.js";


export const AddHolidayData = asyncHandler(async (req, res) => {
    const result = await addHolidayData(req, res);
  });

export const GetHolidayData = asyncHandler(async (req, res) => {
    const result = await getAllHolidays(req, res);
  });