import  express  from "express";
import { AddRole, GetAllRoleData, GetByIdData, GetbyRoleName } from "../controllers/role.controller.js";
import { roleSchema } from "../validators/role.validation.js";
// import { verifyToken } from "../helper/token_verify.js";

const router =express.Router();
const validateRole = (req, res, next) => {
    const { error } =roleSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };
router.post("/addRole",validateRole, AddRole);
router.get("/getByRole/:roleName",GetbyRoleName);
router.get("/getAllRole",GetAllRoleData);
router.get("/getByID/:id",GetByIdData)





export default router ;