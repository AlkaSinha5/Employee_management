import  express  from "express";
import { verifyToken } from "../helper/token_verify.js";
import { AddCertificates, GetCertificates } from "../controllers/certificates.controller.js";



const router =express.Router();

router.post("/addCertificates",verifyToken, AddCertificates );
router.get("/getCertificates" ,GetCertificates);
// router.delete("/deteteTask/:id",verifyToken, Deletetask);
// router.put("/updateTask/:id",verifyToken, Updatetask);
// router.get("/getTaskById/:id",verifyToken, GettaskById);
// router.get("/getTaskByUserId/:id",GetTasksByUserId);
// router.get("/getCompletedTaskByUserId/:id",GetcompetedTasksByUserId);
// router.get("/getIncompletedTaskByUserId/:id",GetIncompetedTasksByUserId)



export default router ;