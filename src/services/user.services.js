import asyncHandler from "express-async-handler";
import User from "../modles/userSchema.js"; // Corrected the path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = asyncHandler(async (req, res) => {
  try {
    const {   
      ComapnyEmplyeeID, 
      ManagerId, 
      JoiningDate,
      Certificates,
      ProfilePhoto,
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
      tasks
    } = req.body;

    const hashpassword = await bcrypt.hash(Password, 10); 

    const user = await User.create({
      ComapnyEmplyeeID,
      ManagerId,
      JoiningDate,
      Certificates,
      ProfilePhoto,
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
      firstName: user.FirstName,
      lastName: user.LastName,
      Email: user.Email,
      id: user.id,
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
  const id = req.params.id;
  const updatedData = req.body;
  const success = await updateUser(id, updatedData);
  res.status(200).json({
    success: true,
    data: success,
  });
});
