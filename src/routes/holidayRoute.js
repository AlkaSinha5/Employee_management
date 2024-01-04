import  express  from "express";

import { verifyToken } from "../helper/token_verify.js";
import { AddHolidayData, GetHolidayData } from "../controllers/holiday.controller.js";


const router =express.Router();


router.post("/addHoliday", AddHolidayData);
router.get("/getHoliday" ,GetHolidayData);





export default router ;