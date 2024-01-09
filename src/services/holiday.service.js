import asyncHandler from 'express-async-handler';
import HoliDay from "../modles/holidaysSchema.js"


// Create a task
export const addHolidayData = asyncHandler(async (req, res) => {
  try {
    const { holiday, holiDate } = req.body;

    const holidayData = await HoliDay.create({
        holiday,holiDate
    });
   res.status(201).json({
      success: true,
      data: holidayData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const getAllHolidays = asyncHandler(async (req, res) => {
   
  try {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];

    // Find holidays where holiDate is equal to or greater than the current date
    const holidays = await HoliDay.find({
        holiDate: { $gte: currentDateString },
    });

    res.status(200).json({
        success: true,
        data: holidays,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        error: 'Server Error',
    });
}
  });