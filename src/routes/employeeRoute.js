import  express  from "express";
import { AddEmployee } from "../controllers/employee.controllers.js";


const router =express.Router();

router.post("/addEmployee", AddEmployee);



export default router ;