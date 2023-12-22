import  express  from "express";
import { AddLocation } from "../controllers/correntLocation.controller.js";

// import { roleSchema } from "../validators/role.validation.js";


const router =express.Router();
// const validateRole = (req, res, next) => {
//     const { error } =roleSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };
router.post("/addLocation", AddLocation);
// router.get("/getByRole/:roleName",GetbyRoleName);
// router.get("/getAllRole",GetAllRoleData);
// router.get("/getByID/:id",GetByIdData)





export default router ;