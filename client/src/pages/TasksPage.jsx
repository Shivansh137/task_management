// TasksPage.jsx
import React, { useEffect, useState } from 'react';
import Task from '../components/tasks/Task';
import AddNewTask from '../components/tasks/AddNewTask';
import axiosInstance from '../api/axios';

const TasksPage = () => {

  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user tasks from database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get('/tasks');
        setTasks(res.data); // Set the fetched tasks
        localStorage.setItem('tasks', JSON.stringify(res.data)); // store tasks in localStorage
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);


  const [isAddNewTaskVisible, setIsAddNewTaskVisible] = useState(false);

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter(task =>
    filter === 'All' || task.status === filter
  );

  const handleCompleteTask = (_id) => {
    const updatedTasks = tasks.map((task) =>
      task._id === _id ? { ...task, status: task.status === 'Completed' ? 'Incomplete' : 'Completed' } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (_id) => {
    const updatedTasks = tasks.filter((task) => task._id !== _id);
    setTasks(updatedTasks);
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toggleAddNewTaskForm();
  };

  // Toggle Add New Task Form 
  const toggleAddNewTaskForm = () => {
    setIsAddNewTaskVisible((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col grow">
      {/* Top Section: Filter Chips + Add New Task Button */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-8">
        {/* Filter Chips */}
        <div className="flex space-x-4 mx-auto md:mx-0">
          {['All', 'Active', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full text-sm md: ${filter === status
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                } hover:bg-indigo-200 hover:text-gray-800 transition`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Add New Task Button */}
        <button
          onClick={toggleAddNewTaskForm}
          className="py-2 px-6 bg-indigo-500 mx-auto md:mx-0 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {isAddNewTaskVisible ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      <hr className="border-t-2 border-gray-200 my-4" />

      {/* Task List */}
      <div className="space-y-4 relative flex overflow-y-auto flex-col grow bg-white rounded-lg p-4 mb-6">
        {
          loading ? <p className='text-lg w-full text-center'>Loading...</p> :
            filteredTasks.length === 0 ? (
              <div className='flex mt-8  flex-col items-center text-gray-700 '>
                <img src="/no_tasks.webp" className='w-md' alt="" />
                <p>No Task Found</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              ))
            )
        }
      </div>

      {/* Modal for Add New Task form */}
      {isAddNewTaskVisible && (
        <div className="fixed inset-0 p-4 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
            <button
              onClick={toggleAddNewTaskForm}
              className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>
            <AddNewTask onAddTask={handleAddTask} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
