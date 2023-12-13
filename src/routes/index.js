import express from "express";
import userRoutes from './userRoute.js';
import employeeRoutes from './employeeRoute.js';
// import attendenceRoutes from './attendanceRoute.js'

const router =express.Router();

router.use("/users",userRoutes);
router.use("/employee",employeeRoutes);
// router.use("/attendence",attendenceRoutes);

export default router;