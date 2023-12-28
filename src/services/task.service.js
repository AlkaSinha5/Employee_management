import asyncHandler from 'express-async-handler';
import Task from '../modles/taskSchema.js'; 
import User from "../modles/userSchema.js"

// Create a task
export const addTaskData = asyncHandler(async (req, res) => {
  try {
    const { UserID, tasks } = req.body;

    const user = await User.findOne({ _id: UserID });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Assuming tasks is an array of task objects
    const newTasks = await Task.insertMany(tasks.map(task => ({ ...task, UserID })));

    // Assuming each task has an _id property
    user.tasks.push(...newTasks.map(task => task._id));
    await user.save();

    res.status(201).json({
      success: true,
      data: newTasks,
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
    const tasks = await Task.find().lean();

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
    const task = await Task.findById(id).lean();

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
    const task = await Task.findByIdAndDelete(id).lean();

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
    ).lean();

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