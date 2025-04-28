import React from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../api/axios'
import PropTypes from 'prop-types';


const Task = ({ task, onDelete, onComplete }) => {
  const handleComplete = async () => {
    try {
      // Send the new task data to the backend
      const response = await axiosInstance.put(`/tasks/${task._id}`, { status: "Completed" });

      // If task update successfully, call onComplete to update parent component state
      if (response.status == 200) {
        onComplete(task._id);

      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleDelete = async () => {
    try {
      // API request to delete task by _id
      const response = await axiosInstance.delete(`/tasks/${task._id}`);

      // If task deleted successfully, call onDelete to update parent component state
      if (response.status == 200) {
        onDelete(task._id);

      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-md flex flex-col space-y-4 sm:space-y-0">

      <div >
        <div className='w-full flex justify-between'>
          {/* Status Chip */}
          <span 
          className={`inline-flex text-xs items-center rounded-full font-medium ${task.status === 'Completed' ? 'text-green-500' : 'text-indigo-500'
              }`}
          >
            {task.status}
          </span>

          {/* Priority Chip */}
          <span
            className={`inline-flex items-center text-xs md:text-sm px-3 py-1 rounded-full font-medium ${task.priority === 'High'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
          >
            {task.priority} Priority
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="md:text-lg mt-4 md:mt-0 text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600 max-w-sm md:max-w-md mt-1">{task.description}</p>

      </div>

      {/* Action Buttons */}
      <div className='flex justify-between items-end mt-4'>
        <div className="flex space-x-3">
          <button
            onClick={handleComplete}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${task.status === 'Completed'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            disabled={task.status === 'Completed'}
          >
            <FiCheck className="md:text-lg" />
            <span>{task.status === 'Completed' ? 'Completed' : 'Complete'}</span>
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-500  text-sm hover:bg-red-100 transition"
          >
            <span>Delete</span>
          </button>
        </div>
        {/* Created At */}
        <span className='text-xs text-gray-500 px-4'>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

// Prop validation
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,  // task id
    title: PropTypes.string.isRequired,  // Task title
    description: PropTypes.string,  // Optional description
    status: PropTypes.string.isRequired,  // Task status ('Completed', 'Pending')
    priority: PropTypes.string.isRequired,  // Task priority ('High', 'Medium', 'Low')
    creationDate: PropTypes.string.isRequired,  // Task creation date
  }).isRequired,
  onDelete: PropTypes.func.isRequired,  // onDelete should be a function
  onComplete: PropTypes.func.isRequired,  // onComplete should be a function
};


export default Task;
