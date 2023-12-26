import asyncHandler from 'express-async-handler';
import Task from '../modles/taskSchema.js'; 

// Create a task
export const addTaskData = asyncHandler(async (req, res) => {
  try {
    const { UserID, task, completed } = req.body;

    const tasks = await Task.create({
      UserID,
      task,
      completed,
    });

    res.status(201).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Get task by ID
export const getTaskById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Delete task by ID
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Update task by ID
export const updateTask = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, completed } = req.body;
  
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true, runValidators: true }
      );
  
      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  });
  