import asyncHandler from "express-async-handler";
import Attendance from "../modles/attendanceSchema.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";


export const addAttendance = asyncHandler(async (req, res) => {
  try {
    const {
      EmployeeID,
      ClockInDateTime,
      GeolocationTracking,
      Status,
      attendenceDate,
    } = req.body;

    // Check if an attendance record already exists for the given date and employee
    const existingAttendance = await Attendance.findOne({
      EmployeeID,
      attendenceDate,
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        error: 'Attendance record for this date and employee already exists.',
      });
    }

    let photoUrl = ''; // Initialize to an empty string

    // Check if Photo is provided in the request
    if (req.files && req.files.Photo) {
      const file = req.files.Photo;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      photoUrl = result.secure_url;
    }

    const attendance = await Attendance.create({
      EmployeeID,
      ClockInDateTime,
      GeolocationTracking,
      Status,
      Photo: photoUrl,
      attendenceDate,
    });

    deleteFile();

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



export const getAttendence = asyncHandler(async (paginationOptions,filter,sort) => {
  try {
    const { page, size } = paginationOptions;
    const totalDocuments = await Attendance.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;


    const collation = {
      locale: 'en',  
      strength: 2,
    };

    const success = await Attendance.find(filter)
    .populate('EmployeeID')
    .collation(collation)
    .sort(sort)
    .skip(skip)
    .limit(size);

    // console.log(success)
    

    return {
      page,
      size,
      data: success,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalDocuments,
    };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}); 

export const deleteAttendence = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await Attendance.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
  
    res.status(404).send({massage: "ID not found "})
      return { error: "not deleted..." };
  }
});

export const getAttendenceById = asyncHandler(async (id) => {
  const success = await Attendance.findById(id)
  .populate("EmployeeID");
  console.log(success);
  return success;
});

export const updateAttendence = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.Photo) {
      const file = req.files.Photo;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.Photo= result.secure_url;
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({
        success: false,
        error: "Attendence not found",
      });
    }
    

    res.status(200).json({
      success: true,
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});




export const getAttendenceCount = asyncHandler(async (req,res) => {
  try {
    const { date } = req.query; 

    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const attendanceCount = await Attendance.aggregate([
      {
        $match: {
          attendenceDate: new Date(date),
        },
      },
      {
        $group: {
          _id: '$Status',
          count: { $sum: 1 },
        },
      },
    ]);

    
    const defaultResult = {
      date,
      attendanceCount: [
        { _id: 'Present', count: 0 },
        { _id: 'Absent', count: 0 },
        { _id: 'Leave', count: 0 },
      ],
    };

   
    const result = {
      date,
      attendanceCount: defaultResult.attendanceCount.map((defaultItem) => {
        const foundItem = attendanceCount.find((item) => item._id === defaultItem._id);
        return foundItem || defaultItem;
      }),
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 
});
export const getperDayStatus = asyncHandler(async (req,res) => {
  try {
    const employeeId = req.params.employeeId;
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    // Add your existing filters and sorting logic here
    const filter = {
      EmployeeID: employeeId,
      attendenceDate: { $gte: startDate, $lte: endDate }
    };

    const perDayStatus = await Attendance.find(filter)
      .populate('EmployeeID')
      .sort({ attendenceDate: 1 }); // You can customize the sorting logic

    res.json({ success: true, data: perDayStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
 
});


export const getStatusMothWise = asyncHandler(async (req,res) => {
  try {
    const employeeId = req.params.employeeId;
    const year = req.params.year;
    const month = req.params.month;

    // Calculate the start and end dates for the specified month
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    // Add your existing filters and sorting logic here
    const filter = {
      EmployeeID: employeeId,
      attendenceDate: { $gte: startDate, $lt: endDate }
    };

    const monthlyStatus = await Attendance.find(filter)
      .populate('EmployeeID')
      .sort({ attendenceDate: 1 }); // You can customize the sorting logic

    // Count occurrences of "Present," "Absent," and "Leave"
    let presentCount = 0;
    let absentCount = 0;
    let leaveCount = 0;

    monthlyStatus.forEach((attendance) => {
      if (attendance.Status === 'Present') {
        presentCount++;
      } else if (attendance.Status === 'Absent') {
        absentCount++;
      } else if (attendance.Status === 'Leave') {
        leaveCount++;
      }
    });

    res.json({
      success: true,
      data: {
        monthlyStatus,
        counts: {
          present: presentCount,
          absent: absentCount,
          leave: leaveCount
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

})



const deleteFile = () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);

  const dirPath = decodeURIComponent(
    path.join(__dirname, "../../tmp").slice(1).replace(/\\/g, "/")
  );

  if (fs.existsSync(dirPath)) {
    // Read the contents of the directory
    const files = fs.readdirSync(dirPath);

    // Iterate over the files and remove them
    files.forEach((file) => {
      const curPath = path.join(dirPath, file);
      fs.unlinkSync(curPath);
    });

    // Remove the empty directory
    fs.rmdirSync(dirPath);
  } else {
    console.log(`Directory '${dirPath}' does not exist.`);
  }
};
