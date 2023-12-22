import express from "express";
import userRoutes from './userRoute.js';
import employeeRoutes from './employeeRoute.js';
import attendenceRoutes from './attendanceRoute.js';
import roleRoutes from './roleRoutes.js'
import locationRoutes from "./correntLocationRoute.js"
import dailyRoutes from "./dailySummaryRoute.js"

const router =express.Router();

router.use("/users",userRoutes);
router.use("/employee",employeeRoutes);
router.use("/attendence",attendenceRoutes);
router.use("/role",roleRoutes);
router.use("/location",locationRoutes);
router.use("/daily",dailyRoutes)

export default router;