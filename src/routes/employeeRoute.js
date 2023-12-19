import  express  from "express";
import { AddEmployee, DeleteEmployee, GetEmployee, GetEmployeeById, UpdateEmployee } from "../controllers/employee.controllers.js";
import { employeeJoiSchema } from "../validators/employee.validators.js";


const router =express.Router();
const validatemployee = (req, res, next) => {
    const { error } = employeeJoiSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };

router.post("/addEmployee", AddEmployee);
router.get("/getEmployee" ,GetEmployee);
router.delete("/deteteEmployee/:id", DeleteEmployee);
router.put("/updateEmployee/:id", UpdateEmployee);
router.get("/getEmployeeById/:id",  GetEmployeeById);



export default router ;