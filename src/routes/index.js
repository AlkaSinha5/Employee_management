import express from "express";
import userRoutes from './userRoute.js';
import employeeRoutes from './employeeRoute.js';

const router =express.Router();

router.use("/users",userRoutes);
router.use("/employee",employeeRoutes)

export default router;