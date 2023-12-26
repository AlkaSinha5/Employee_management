import asyncHandler from "express-async-handler";
import { addTaskData, deleteTask, getAllTasks, getTaskById, updateTask } from "../services/task.service.js";


export const Addtask = asyncHandler(async (req, res) => {
    const result = await addTaskData(req, res);
  });

  export const GettaskById = asyncHandler(async (req, res) => {
    
    const result = await getTaskById(req,res);
    
  });

  export const GetAlltaskData = asyncHandler(async (req, res) => {
    const result = await getAllTasks(req, res);
  });

  export const Deletetask = asyncHandler(async (req, res) => {
    const result = await deleteTask(req, res);
  });

  export const Updatetask = asyncHandler(async (req, res) => {
    const result = await updateTask(req, res);
  });