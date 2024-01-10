import asyncHandler from "express-async-handler";
import { dummyService } from "../services/dummy.service.js";

export const getDummy = asyncHandler(async (req, res) => {
    const result = await dummyService(req, res);
  });