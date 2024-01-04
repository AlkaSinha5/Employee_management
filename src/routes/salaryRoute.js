import  express  from "express";

import { verifyToken } from "../helper/token_verify.js";
import { GetAllSalaryByUserId } from "../controllers/salary.controller.js";



const router =express.Router();


// router.post("/addHoliday", AddHolidayData);
router.get("/getSallaryByUser/:id" ,GetAllSalaryByUserId);





export default router ;