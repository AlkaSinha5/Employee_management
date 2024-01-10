import  express  from "express";
import { getDummy } from "../controllers/dummy.controller.js";
const router = express.Router();

router.get("/getDummy", getDummy);

export default router ;