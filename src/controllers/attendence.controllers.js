import asyncHandler from "express-async-handler"
import { addAttendance} from "../services/attendance.service.js";


export const AddAttendence = asyncHandler(async (req, res) => {
const customer = await addAttendance(req, res);
});