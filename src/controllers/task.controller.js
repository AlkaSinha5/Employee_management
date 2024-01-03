import asyncHandler from "express-async-handler";
import { addTaskData, deleteTask, getAllTasks, getIncompetedTasksByUserId, getTaskById, getTasksByUserId, getcompetedTasksByUserId, updateTask } from "../services/task.service.js";


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

  export const GetTasksByUserId= asyncHandler(async (req, res) => {
    const result = await getTasksByUserId(req, res);
  });

  export const GetcompetedTasksByUserId= asyncHandler(async (req, res) => {
    const result = await getcompetedTasksByUserId(req, res);
  });

  export const GetIncompetedTasksByUserId= asyncHandler(async (req, res) => {
    const result = await getIncompetedTasksByUserId(req, res);
  });