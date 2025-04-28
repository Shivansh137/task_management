import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    // Validate inputs
    if (!title || !description || !priority) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    
    // Create a new task
    const task = new Task({
      title,
      description,
      priority,
      user: req.user,  // Associate task with the authenticated user
      createdAt: new Date(),
    });

    // Save the task to database
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a task by its ID
export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    // Find task by ID and make sure it's associated with the logged-in user
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // update the data
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    // save the task
    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task by its ID
export const deleteTask = async (req, res) => {
  try {
    // Find task by ID and ensure it's associated with the logged-in user
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
