import asyncHandler from "express-async-handler";
import Admin from "../modles/adminSchema.js"; // Corrected the path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addAdmin = asyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, PhoneNumber } = req.body;

    const hashpassword = await bcrypt.hash(Password, 10);

    const admin = await Admin.create({
      FirstName,
      LastName,
      Email,
      Password: hashpassword,
      PhoneNumber,
    });

    res.status(201).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const admin = await Admin.findOne({ Email });

  if (admin && (await bcrypt.compare(Password, admin.Password))) {
    const accessToken = jwt.sign(
      {
        adminData: {
          username: admin.FirstName,
          email: admin.Email,
          id: admin.id,
          firstName: admin.FirstName,
          lastName: admin.LastName,
        },
      },
      process.env.secretKey, 
      { expiresIn: process.env.Range } 
    );

    return res.status(200).json({
      // token: accessToken,
      user: {
        id: admin.id,
        FirstName: admin.FirstName,
        LastName: admin.LastName,
        Email: admin.Email,
        token: accessToken,
      },
    });
  } else {
    res.status(401).send("User or Password is Wrong");
  }
});
