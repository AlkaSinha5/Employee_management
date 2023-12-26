import asyncHandler from 'express-async-handler';
import Daily from "../modles/dailySummarySchema.js";

export const addDailyData = asyncHandler(async (req, res) => {
    try {
        const { UserID, Description } = req.body;

        const daily = await Daily.create({
            UserID,
            Description
        });

        res.status(201).json({
            success: true,
            data: daily,
        });
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

export const getAllSummary = asyncHandler(async (req, res) => {
    try {
        const dailySummary = await Daily.find();

        res.status(200).json({
            success: true,
            data: dailySummary,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
});

export const getSummaryById = asyncHandler(async (id) => {
    const success = await Daily.findById(id);
    // console.log(success);
    return success;
  });


  export const deleteSummary = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const success = await Daily.findByIdAndDelete(id);
    if (success) {
      res.status(200).send({ success, message: "Ok deleted ......" });
    } else {
    
      res.status(404).send({massage: "ID not found "})
        return { error: "not deleted..." };
    }
  });