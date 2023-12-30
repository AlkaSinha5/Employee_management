import  express  from "express";
import { Addtask, Deletetask, GetAlltaskData, GettaskById, Updatetask } from "../controllers/task.controller.js";
import { verifyToken } from "../helper/token_verify.js";


const router =express.Router();
// const validatemployee = (req, res, next) => {
//     const { error } = employeeJoiSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };

router.post("/addTask",verifyToken, Addtask);
router.get("/getTask" ,verifyToken,GetAlltaskData);
router.delete("/deteteTask/:id",verifyToken, Deletetask);
router.put("/updateTask/:id",verifyToken, Updatetask);
router.get("/getTaskById/:id",verifyToken, GettaskById);



export default router ;