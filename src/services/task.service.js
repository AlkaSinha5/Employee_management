import asyncHandler from 'express-async-handler';
import Task from '../modles/taskSchema.js'; 
import User from "../modles/userSchema.js"

// Create a task
export const addTaskData = asyncHandler(async (req, res) => {
  try {
    const { UserID, tasks,Date ,description} = req.body;

    const user = await User.findOne({ _id: UserID });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Assuming tasks is an array of task objects
    const newTasks = tasks.map(task => ({
      task: task.task,
      completed: task.completed,
      Date: task.Date,
      description: task.description,
    }));

    const createdTasks = await Task.insertMany(
      // tasks.map(task => ({ ...task, UserID: user._id }))
      // newTasks.map(task => ({ tasks:task, UserID: user._id }))
      {tasks:tasks, UserID: user._id,Date:Date,description:description}

    );

    // Assuming each task has an _id property
    user.tasks.push(...createdTasks.map(task => task._id));
    await user.save();

    res.status(201).json({
      success: true,
      data: createdTasks,
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
    const { description, completed, tasks } = req.body;

    // Update the tasks array and description
    const updatedData = {
      tasks: tasks,
      description: description,
    };

    // If 'completed' is provided, update the 'completed' field as well
    if (completed !== undefined) {
      updatedData.tasks.forEach((task, index) => {
        if (tasks[index].completed !== undefined) {
          updatedData.tasks[index].completed = tasks[index].completed;
        } else {
          updatedData.tasks[index].completed = completed;
        }
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    // Check if the task was not found
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

export const getTasksByUserId = asyncHandler(async (req, res) => {
  // console.log(req.params)
  const userId = req.params.id;
  // console.log(userId)

  // Fetch incomplete tasks by user ID
  const incompleteTasks = await Task.find({
   UserID: userId,
   'tasks.completed': false,
  
});

  res.status(200).json({
    success: true,
    data: incompleteTasks,
  });
});