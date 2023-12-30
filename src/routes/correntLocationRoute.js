import  express  from "express";
import { AddLocation, DeleteLocation, GetAllLocationData, GetLocationById } from "../controllers/correntLocation.controller.js";
import { verifyToken } from "../helper/token_verify.js";
// import { roleSchema } from "../validators/role.validation.js";


const router =express.Router();
// const validateRole = (req, res, next) => {
//     const { error } =roleSchema.validate(req.body);
  
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
  
//     next();
//   };
router.post("/addLocation", verifyToken , AddLocation);
router.get("/getAllLocation",GetAllLocationData);
router.get("/getLocationByID/:id",GetLocationById);
router.delete("/deteteLocation/:id", DeleteLocation);





export default router ;