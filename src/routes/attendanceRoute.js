import  express  from "express";
import { AddAttendence } from "../controllers/attendence.controllers.js";



const router =express.Router();

router.post("/addAttendence", AddAttendence);
// router.get("/getEmployee" ,GetEmployee);
// router.delete("/deteteEmployee/:id", DeleteEmployee);
// router.put("/updateEmployee/:id", UpdateEmployee);
// router.get("/getEmployeeById/:id",  GetEmployeeById);



export default router ;