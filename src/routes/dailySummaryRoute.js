import  express  from "express";
import { AddDaily } from "../controllers/dailySummarry.controller.js";

// import { roleSchema } from "../validators/role.validation.js";
// import { verifyToken } from "../helper/token_verify.js";

const router =express.Router();
// const validateRole = (req, res, next) => {
//     const { error } =roleSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };
router.post("/addDailySummary", AddDaily);
// router.get("/getByRole/:roleName",GetbyRoleName);
// router.get("/getAllRole",GetAllRoleData);
// router.get("/getByID/:id",GetByIdData)





export default router ;