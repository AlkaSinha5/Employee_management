import  express  from "express";
import { AddAttendence, DeleteAttendence, GetAttendence, GetAttendenceById,  GetAttendenceByUserId,  GetAttendenceCount,  GetPerDayStatus,  GetSallaryByUserId,  GetStatusMonthWise,  UpdateAttendence } from "../controllers/attendence.controllers.js";
import { attendanceSchema } from "../validators/attendance.validators.js";
import { verifyToken } from "../helper/token_verify.js";



const router =express.Router();
const validatattendence = (req, res, next) => {
  const { error } = attendanceSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};


router.post("/addAttendence", AddAttendence);
router.get("/getAttendence",GetAttendence);
router.delete("/deteteAttendence/:id", DeleteAttendence);
router.put("/updateAttendence/:id", UpdateAttendence);
router.get("/getAttendenceById/:id",  GetAttendenceById);
router.get("/getAttendenceByUserId/:id",GetAttendenceByUserId)
router.get("/sallaryByUserId/:id",GetSallaryByUserId);
router.get("/attendance-count",GetAttendenceCount);
router.get("/perdaystatus/:employeeId/:startDate/:endDate",GetPerDayStatus);
router.get("/monthlystatus/:employeeId/:year/:month",GetStatusMonthWise)




export default router ;