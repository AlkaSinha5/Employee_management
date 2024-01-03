import asyncHandler from 'express-async-handler';
import Task from '../modles/taskSchema.js'; 
import User from "../modles/userSchema.js"

// Create a task
export const addTaskData = asyncHandler(async (req, res) => {
  try {
    const { UserID, completedDate, task, completed, description } = req.body;

    const user = await User.findOne({ _id: UserID });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const taskData = await Task.create({
      UserID,
      completedDate,
      task,
      completed,
      description,
    });

    // Add the new task's _id to the user's tasks array
    user.tasks.push(taskData._id);
    await user.save();

    res.status(201).json({
      success: true,
      data: taskData,
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
    const {  completedDate, task, completed, description } = req.body;

    // Update the tasks array and description
    const updatedData = {
      compledDate:completedDate,
      task: task,
      completed: completed,
      description: description,
    };

   
    

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
  const userId = req.params.id;


  const Tasks = await Task.find({
    "UserID": userId,
  
  });

  res.status(200).json({
    success: true,
    data: Tasks,
  });
});

export const getcompetedTasksByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;


  const Tasks = await Task.find({
    "UserID": userId,
    "completed": true,
  
  });

  res.status(200).json({
    success: true,
    data: Tasks,
  });
});

export const getIncompetedTasksByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;


  const Tasks = await Task.find({
    "UserID": userId,
    "completed": false,
  
  });

  res.status(200).json({
    success: true,
    data: Tasks,
  });
});


// export const getTasksByUserId = asyncHandler(async (req, res) => {
//   // console.log(req.params)
//   const userId = req.params.id;
//   // console.log(userId)

//   // Fetch incomplete tasks by user ID
//   const incompleteTasks = await Task.find({
//    UserID: userId,

  
// });

//   res.status(200).json({
//     success: true,
//     data: incompleteTasks,
//   });
// });