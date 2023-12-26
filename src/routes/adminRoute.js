import  express  from "express";

import { AddAdmin, LoginAdmin } from "../controllers/admin.controller.js";
// import { userSchema } from '../validators/user.validators.js'
// import { verifyToken } from "../helper/token_verify.js";
// import { isSuperAdmin } from "../middleware/isSuperAdmin.js";




const router =express.Router();
// const validateUser = (req, res, next) => {
//     const { error } = userSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };
  
router.post("/addAdmin", AddAdmin);
router.post('/login', LoginAdmin);




export default router ;