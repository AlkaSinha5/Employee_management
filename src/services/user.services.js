import asyncHandler from "express-async-handler";
import User from "../modles/userSchema.js"; // Corrected the path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dhzk0ztrn",
  api_key: "571339484391153",
  api_secret: "WWmOJpVF5y02r7Blu2oAr0RxbU0",
});

export const addUser = asyncHandler(async (req, res) => {
  try {
    const {
      ComapnyEmplyeeID,
      ManagerId,
      JoiningDate,
      Certificates,
      JobTitle,
      MoblieNumber,
      CompanyName,
      Address,
      Department,
      Education,
      EmploymentStatus,
      WorkSedule,
      FirstName,
      LastName,
      Email,
      Password,
      locations,
      tasks,
    } = req.body;

    const hashpassword = await bcrypt.hash(Password, 10);
    let profilePictureUrl = "";
    let certificateUrls = [];

    if (req.files && req.files.ProfilePicture) {
      const file = req.files.ProfilePicture;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl = result.secure_url;
    }

    if (Certificates && Certificates.length > 0) {
      for (const certificate of Certificates) {
        const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
        certificateUrls.push(certificateResult.secure_url);
      }
    }

    const user = await User.create({
      ComapnyEmplyeeID,
      ManagerId,
      JoiningDate,
      Certificates: certificateUrls,
      ProfilePhoto: profilePictureUrl,
      JobTitle,
      MoblieNumber,
      CompanyName,
      Address,
      Department,
      Education,
      EmploymentStatus,
      WorkSedule,
      FirstName,
      LastName,
      Email,
      Password: hashpassword,
      locations,
      tasks,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email });

  if (user && (await bcrypt.compare(Password, user.Password))) {
    const accessToken = jwt.sign(
      {
        userData: {
          username: user.FirstName,
          email: user.Email,
          id: user.id,
          firstName: user.FirstName,
          lastName: user.LastName,
        },
      },
      process.env.secretKey,
      { expiresIn: process.env.Range }
    );

    return res.status(200).json({
      token: accessToken,
      user: {
        id: user.id,
        ComapnyEmplyeeID: user.ComapnyEmplyeeID,
        ManagerId: user.ManagerId,
        JoiningDate: user.JoiningDate,
        Certificates: user.Certificates,
        ProfilePhoto: user.ProfilePhoto,
        JobTitle: user.JobTitle,
        MoblieNumber: user.MoblieNumber,
        CompanyName: user.CompanyName,
        Address: user.Address,
        Department: user.Department,
        Education: user.Education,
        EmploymentStatus: user.EmploymentStatus,
        WorkSedule: user.WorkSedule,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
      },
    });
  } else {
    res.status(401).send("User or Password is Wrong"); // Simplified the response
  }
});


export const getUsers = asyncHandler(async (req, res) => {
  try {
    const { page, size, filter, sort } = req.query;
    const paginationOptions = { page: parseInt(page), size: parseInt(size) };

    const { totalDocuments, data, previousPage, nextPage } = await getUsers(
      paginationOptions,
      filter,
      sort
    );

    res.status(200).json({
      success: true,
      data,
      pagination: {
        previousPage,
        nextPage,
        totalDocuments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await User.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    res.status(404).json({ error: "not deleted..." }); // Changed to res.status(404)
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const {
    MoblieNumber,
    ComapnyEmplyeeID,
    ManagerId,
    JoiningDate,
    JobTitle,
    CompanyName,
    Address,
    Department,
    Education,
    EmploymentStatus,
    WorkSedule,
    FirstName,
    LastName,
    Email,
    Password,
    locations,
    tasks,
  } = req.body;

  try {
    const hashpassword = await bcrypt.hash(Password, 10);

    let profilePictureUrl = "";
    let certificateUrls = [];

    // Update ProfilePhoto if provided
    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl = result.secure_url;
    }

    // Update Certificates if provided
    if (req.files && req.files.Certificates && req.files.Certificates.length > 0) {
      for (const certificate of req.files.Certificates) {
        const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
        certificateUrls.push(certificateResult.secure_url);
      }
    }

    // Update all fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        MoblieNumber,
        ComapnyEmplyeeID,
        ManagerId,
        JoiningDate,
        JobTitle,
        CompanyName,
        Address,
        Department,
        Education,
        EmploymentStatus,
        WorkSedule,
        FirstName,
        LastName,
        Email,
        Password: hashpassword,
        locations,
        tasks,
        ProfilePhoto: profilePictureUrl,
        Certificates: certificateUrls,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

export const updateDataByUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { MoblieNumber, Certificates } = req.body;
  let profilePhotoUrl;

  try {
    // Update MoblieNumber if provided
    if (MoblieNumber) {
      await User.findByIdAndUpdate(userId, { MoblieNumber }, { new: true });
    }

    // Update ProfilePhoto if provided
    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePhotoUrl = result.secure_url;

      // Example: Save updated ProfilePhoto to the user's document
      await User.findByIdAndUpdate(userId, { ProfilePhoto: profilePhotoUrl }, { new: true });
    }

    // Update Certificates if provided
    if (Certificates && Certificates.length > 0) {
      const certificateUrls = [];
      for (const certificate of Certificates) {
        const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
        certificateUrls.push(certificateResult.secure_url);
      }

      // Example: Save updated Certificates to the user's document
      await User.findByIdAndUpdate(userId, { Certificates: certificateUrls }, { new: true });
    }

    // Fetch the updated user document
    const updatedUser = await User.findById(userId);

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});
