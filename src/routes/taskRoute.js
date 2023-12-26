import  express  from "express";
import { Addtask, Deletetask, GetAlltaskData, GettaskById, Updatetask } from "../controllers/task.controller.js";



const router =express.Router();
// const validatemployee = (req, res, next) => {
//     const { error } = employeeJoiSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };

router.post("/addTask", Addtask);
router.get("/getTask" ,GetAlltaskData);
router.delete("/deteteTask/:id", Deletetask);
router.put("/updateTask/:id", Updatetask);
router.get("/getTaskById/:id",  GettaskById);



export default router ;