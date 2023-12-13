import  express  from "express";
import { AddEmployee, DeleteEmployee, GetEmployee, GetEmployeeById, UpdateEmployee } from "../controllers/employee.controllers.js";


const router =express.Router();

router.post("/addEmployee", AddEmployee);
router.get("/getEmployee" ,GetEmployee);
router.delete("/deteteEmployee/:id", DeleteEmployee);
router.put("/updateEmployee/:id", UpdateEmployee);
router.get("/getEmployeeById/:id",  GetEmployeeById);



export default router ;