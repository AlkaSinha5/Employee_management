import asyncHandler from "express-async-handler";
import User from "../modles/userSchema.js"; // Corrected the path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";

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

    // console.log("Request Body:", req.body);
    // console.log("Request Files:", req.files);

    const hashpassword = await bcrypt.hash(Password, 10);
    let profilePictureUrl = "";
    let certificateUrls = [];

    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl = result.secure_url;
    }

    // Check if Certificates are provided in the request
    if (req.files && req.files.Certificates) {
      const certificates = Array.isArray(req.files.Certificates)
        ? req.files.Certificates
        : [req.files.Certificates];

      for (const certificate of certificates) {
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
deleteFile()
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
      // token: accessToken,
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
        token: accessToken,
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
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Check if ProfilePicture is provided in the request
    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePhoto = result.secure_url;
    }

    // Check if Certificates are provided in the request
    if (req.files && req.files.Certificates) {
      const certificateUrls = [];

      // Ensure Certificates is iterable (array)
      const certificates = Array.isArray(req.files.Certificates)
        ? req.files.Certificates
        : [req.files.Certificates];

      for (const certificate of certificates) {
        const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
        certificateUrls.push(certificateResult.secure_url);
      }

      updatedData.Certificates = certificateUrls;
    }

    // Update the user based on the provided data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    // Check if the user was not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
deleteFile()
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


export const updateDataByUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    
    const { MoblieNumber, ProfilePhoto, Certificates } = req.body;
     const updatedData = {  
      MoblieNumber: MoblieNumber,
      ProfilePhoto: ProfilePhoto,
      Certificates: Certificates

     } ;

    // Check if ProfilePicture is provided in the request
    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePhoto = result.secure_url;
    }

    // Check if Certificates are provided in the request
    if (req.files && req.files.Certificates) {
      const certificateUrls = [];

      // Ensure Certificates is iterable (array)
      const certificates = Array.isArray(req.files.Certificates)
        ? req.files.Certificates
        : [req.files.Certificates];

      for (const certificate of certificates) {
        const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
        certificateUrls.push(certificateResult.secure_url);
      }

      updatedData.Certificates = certificateUrls;
    }

    // Update the user based on the provided data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    // Check if the user was not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
deleteFile()
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

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


