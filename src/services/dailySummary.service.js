import asyncHandler from 'express-async-handler';
import Daily from "../modles/dailySummarySchema.js";

export const addDailyData = asyncHandler(async (req, res) => {
    try {
        const { UserID, Description } = req.body;

        // console.log("Request Body:", req.body); // Log the request body for debugging

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
