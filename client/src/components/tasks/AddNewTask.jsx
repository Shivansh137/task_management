import React, { useState } from 'react';
import axiosInstance from '../../api/axios';
import PropTypes from 'prop-types'

const AddNewTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTaskData = { ...newTask };
    
    try {
      // Send the new task data to the backend
      const response = await axiosInstance.post('/tasks', newTaskData);
      
      if (response.status === 201) {
        // If task added successfully, call onAddTask to update parent component state
        onAddTask(response.data);

        // reset the form
        setNewTask({
          title: '',
          description: '',
          priority: 'Low',
        });

      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-xl md:text-2xl mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

AddNewTask.propTypes = {
  onAddTask: PropTypes.func.isRequired, // onAddTask must be a function and is required
};

export default AddNewTask;
