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

export const addUser = async (req, res) => {
  try {
      const {  ComapnyEmplyeeID,
        ManagerId,
        JoiningDate,
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
        Salary,
        Password,
        locations,
        tasks,} = req.body
        console.log(req.body)

      const hashpassword = await bcrypt.hash(Password, 10);
    let profilePictureUrl = "";
    

    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl = result.secure_url;
    }

    // Check if Certificates are provided in the request
   
      const userData = new User({
        ComapnyEmplyeeID:ComapnyEmplyeeID,
        ManagerId:ManagerId,
        JoiningDate:JoiningDate,
       ProfilePhoto: profilePictureUrl,
        JobTitle: JobTitle,
        MoblieNumber: MoblieNumber,
        CompanyName: CompanyName,
        Address: Address,
        Salary: Salary,
        Department: Department,
        Education: Education,
        EmploymentStatus: EmploymentStatus,
        WorkSedule:WorkSedule,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: hashpassword,
        locations:locations,
        tasks: tasks,
      })
     
      const result = await userData.save()
     
 
     deleteFile()
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
}


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
        Salary:user. Salary,
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


export const getUsers = asyncHandler(async (paginationOptions,filter,sort) => {
  try {
    const { page, size } = paginationOptions;
    const totalDocuments = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;

    const collation = {
      locale: 'en',  
      strength: 2,
    };

    const success = await User.find(filter)
    .collation(collation)
    .sort(sort)
    .skip(skip)
    .limit(size);
    

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

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await User.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    res.status(404).json({ error: "not deleted..." }); // Changed to res.status(404)
  }
});

// user.controllers.js

export const getUserById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});


//  const certificateUrlsAdmin = [];
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

// const certificateUrls = [];
export const updateDataByUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    
    const { MoblieNumber, ProfilePhoto } = req.body;
     const updatedData = {  
      MoblieNumber: MoblieNumber,
      ProfilePhoto: ProfilePhoto,
      // Certificates: Certificates

     } ;

    // Check if ProfilePicture is provided in the request
    if (req.files && req.files.ProfilePhoto) {
      const file = req.files.ProfilePhoto;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePhoto = result.secure_url;
    }

    // Check if Certificates are provided in the request
    // if (req.files && req.files.Certificates) {
    //    const certificateUrls = [];
    //   // Ensure Certificates is iterable (array)
    //   const certificates = Array.isArray(req.files.Certificates)
    //   ? req.files.Certificates
    //   : [req.files.Certificates];
      
    //   for (const certificate of certificates) {
    //     const certificateResult = await cloudinary.uploader.upload(certificate.tempFilePath);
    //     // let updatedata = {$push : {Certificates:certificateResult.secure_url}}
    //     certificateUrls.push(certificateResult.secure_url);
    //     // await User.updateOne(id,updatedata)
    //   }

    //   updatedData.Certificates = certificateUrls;
    // }

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


export const logoutUser = (req, res) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  // Extract the token without the "Bearer " prefix
  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.secretKey);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

