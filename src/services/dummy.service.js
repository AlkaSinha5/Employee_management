import asyncHandler from "express-async-handler";
export const dummyService = asyncHandler(async (req, res) => {
    res.json("Dummy api");
    
  });