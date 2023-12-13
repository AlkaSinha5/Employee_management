import asyncHandler from "express-async-handler";
import Attendance from "../modles/attendanceSchema.js";


export const addAttendance = asyncHandler(async (req, res) => {
    try {
      const {
        EmployeeID,
        ClockInDateTime,
        ClockOutDateTime,
        GeolocationTracking,
        Status,
        Photo,
      } = req.body;
  
      const attendance = await Attendance.create({
        EmployeeID,
        ClockInDateTime,
        ClockOutDateTime,
        GeolocationTracking: GeolocationTracking.map(track => ({
          timestamp: track.timestamp,
          location: {
            type: "Point",
            coordinates: [track.longitude, track.latitude],
          },
        })),
        Status,
        Photo,
      });
  
      res.status(201).json({
        success: true,
        data: attendance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });