import asyncHandler from "express-async-handler";
import { addDailyData, deleteSummary, getAllSummary, getSummaryById } from "../services/dailySummary.service.js";


export const AddDaily = asyncHandler(async (req, res) => {
    const result = await addDailyData(req, res);
  });

  export const GetSummaryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await getSummaryById(id);
    res.status(200).send({ result });
  });

  export const GetAllSummaryData = asyncHandler(async (req, res) => {
    const result = await getAllSummary(req, res);
  });

  export const DeleteSummary = asyncHandler(async (req, res) => {
    const result = await deleteSummary(req, res);
  });