import asyncHandler from 'express-async-handler';
import Salary from '../modles/sallarySchema.js';
import moment from 'moment';

export const getAllSalaryByUserId = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const currentDate = new Date();
        const currentMonthYear = moment(currentDate).format('MMMM YYYY');
        
        // Find salary entries where userId is equal to the requested userId and monthYear is equal to the current month
        const userSalaries = await Salary.find({
          userId: userId,
          monthYear: currentMonthYear,
        });
    
        res.status(200).json({
          success: true,
          data: userSalaries,
        });
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
          success: false,
          error: 'Server Error',
        });
      }
    
  });
  