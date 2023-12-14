import  express  from "express";
import { AddAttendence, DeleteAttendence, GetAttendence, GetAttendenceById, UpdateAttendence } from "../controllers/attendence.controllers.js";
// import attendanceSchema from "../validators/attendance.validators.js"


const router =express.Router();
const validateAttendence = (req, res, next) => {
    const { error } = attendanceSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };

router.post("/addAttendence", AddAttendence);
router.get("/getAttendence" ,GetAttendence);
router.delete("/deteteAttendence/:id", DeleteAttendence);
router.put("/updateAttendence/:id", UpdateAttendence);
router.get("/getAttendenceById/:id",  GetAttendenceById);



export default router ;