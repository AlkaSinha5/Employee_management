import express from "express";
import userRoutes from './userRoute.js';

const router =express.Router();

router.use("/users",userRoutes);

export default router;