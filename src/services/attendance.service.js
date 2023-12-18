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
      attendenceDate,
    } = req.body;

    // Check if GeolocationTracking is an array and not empty
    if (!Array.isArray(GeolocationTracking) || GeolocationTracking.length === 0) {
      return res.status(400).json({
        success: false,
        error: "GeolocationTracking must be a non-empty array.",
      });
    }

    const mappedGeolocation = GeolocationTracking.map(track => ({
      timestamp: track.timestamp,
      location: {
        type: "Point",
        coordinates: [track.longitude, track.latitude],
      },
    }));

    let photoUrl = ""; // Initialize to an empty string

    // Check if Photo is provided in the request
    if (req.files && req.files.Photo) {
      const file = req.files.Photo;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      photoUrl = result.secure_url;
    }

    const attendance = await Attendance.create({
      EmployeeID,
      ClockInDateTime,
      ClockOutDateTime,
      GeolocationTracking: mappedGeolocation,
      Status,
      Photo: photoUrl,
      attendenceDate,
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

    console.log(success)
    

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

    if (req.files && req.files.ProfilePicture) {
      const file = req.files.ProfilePicture;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePicture = result.secure_url;
    }

    const updatedAttendence = await Attendance.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedAttendence) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAttendence,
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