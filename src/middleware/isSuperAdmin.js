import User from "../modles/userSchema.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
    try {
        //console.log("token: ", req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ', ''); // Assuming the token is in the Authorization header
        if (!token) {
          return res.status(401).json({ error: 'Access denied' });
        }
    const decoded = jwt.verify(token, process.env.secretKey);
    
    const user = await User.findById(decoded.userData.id).populate('roleId');
    // console.log(user.roleId.roleName)
    if (!user || user.roleId.roleName !== 'Admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }
    req.userId = decoded.userId;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred due To token Expired' });
      }
};


export const isUser = async (req, res, next) => {
    try {
        //console.log("token: ", req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ', ''); // Assuming the token is in the Authorization header
        if (!token) {
          return res.status(401).json({ error: 'Access denied' });
        }
    const decoded = jwt.verify(token, process.env.secretKey);
        
    const user = await User.findById(decoded.userData.id).populate('roleId');
    // console.log(user.roleId.roleName)
    if (!user || user.roleId.roleName !== 'User') {
      return res.status(403).json({ error: 'Permission denied' });
    }
    req.userId = decoded.userId;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred due To token Expired' });
      }
};


export const checkAdmin = async (req, res) => {
  try {
      //console.log("token: ", req.header('Authorization'))
      const token = req.header('Authorization').replace('Bearer ', ''); // Assuming the token is in the Authorization header
      if (!token) {
        return res.status(401).json({ error: 'Access denied' });
      }
  const decoded = jwt.verify(token, process.env.secretKey);
      
  const user = await User.findById(decoded.userData.id).populate('roleId');
  // console.log(user.roleId.roleName)
      return user;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred due To token Expired' });
    }
};
