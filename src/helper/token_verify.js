import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";



export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
      let token;
      let authHeader = req.headers.Authorization || req.headers.authorization;
  
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        if (!token) {
          return res.status(401).json({
            success: false,
            error: "User not authorized or token missing",
          });
        }
  
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              success: false,
              error: "Invalid Token",
            });
          }
          req.user = decoded.user;
          next();
        });
      } else {
        return res.status(401).json({
          success: false,
          error: "Authorization header with Bearer token is required",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  });
  
