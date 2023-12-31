import  express  from "express";
import { DeleteUser, GetUserById, UpdateUser, GetUsers, AddUser, LoginUser, UpdateDataByUser, LogoutUser } from "../controllers/user.controllers.js";
// import { userSchema } from '../validators/user.validators.js'
import { verifyToken } from "../helper/token_verify.js"
// import { isSuperAdmin } from "../middleware/isSuperAdmin.js";




const router =express.Router();
// const validateUser = (req, res, next) => {
//     const { error } = userSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };
  

router.post("/addUser", AddUser);
router.post('/login', LoginUser);
router.get("/getUsers", GetUsers);
router.delete("/deleteUser/:id", DeleteUser);
router.put("/updateUser/:id",UpdateUser );
router.put("/updateByUser/:id",verifyToken,UpdateDataByUser);
router.get("/getUserById/:id", GetUserById);
router.post("/logout",LogoutUser);







export default router ;