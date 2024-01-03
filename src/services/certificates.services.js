import asyncHandler from 'express-async-handler';
import Certificates from "../modles/certificatesSchema.js";
import User from "../modles/userSchema.js";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "dhzk0ztrn",
    api_key: "571339484391153",
    api_secret: "WWmOJpVF5y02r7Blu2oAr0RxbU0",
  });
  
  // Create a certificate with Cloudinary integration
  export const addCertificates = asyncHandler(async (req, res) => {
    try {
      const { UserID, title, description, organization } = req.body;
  
      const user = await User.findOne({ _id: UserID });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
  
      // Check if an image file is provided in the request
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
  
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
  
        // Create a certificate with the Cloudinary image URL
        const certificatesData = await Certificates.create({
          UserID,
          title,
          description,
          organization,
          image: result.secure_url,
        });
  
        // Add the new certificate's _id to the user's certificates array
        user.certificates.push(certificatesData._id);
        await user.save();
  
        res.status(201).json({
          success: true,
          data: certificatesData,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: 'Image file not provided',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });
  
  export const getAllCertificates = asyncHandler(async (req, res) => {
    try {
      const certificates = await Certificates.find();
  
      res.status(200).json({
        success: true,
        data: certificates,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  });