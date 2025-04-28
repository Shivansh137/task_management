import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { FaCheck, FaClock, FaTasks } from 'react-icons/fa';
import Logout from '../components/auth/Logout';
import { FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ id: 0, email: '' });
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false)

  // Fetch user data from localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not found
    } else {
      const data = jwtDecode(token);
      console.log(data);
      
      setUserData(data);
    }
  }, [navigate]);


  // count of tasks by status
  const [taskStats, setTaskStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  })

  // Fetch tasks from local storage and update the counts
  useEffect(() => {
    let mytasks = JSON.parse(localStorage.getItem('tasks'));
    let total = mytasks?.length, active = 0, completed = 0;
    mytasks?.forEach(task => {
      if (task.status == 'Active') active++;
      else completed++;
    })
    setTaskStats({ total, active, completed })
  }, [])

  return (
    <>
      {/* show logout confirmation popup if showlogout is true */}
      {showLogout ? <Logout setShowLogout={setShowLogout} /> : ""}

      <div className="mt-16 relative flex flex-col items-center justify-center">
        {/* Dashboard Container */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-96">
          {/* User Email */}
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-lg text-gray-500">Welcome Back</h2>
            <p className="text-xl text-gray-600 ">{userData?.email}</p>
          </div>

          {/* Task Stats */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center bg-blue-100 p-4 rounded-lg">
              <FaTasks className='text-blue-800' />
              <span className="text-lg  text-blue-800">Total Tasks</span>
              <span className="text-xl ml-auto font-semibold text-blue-800">{taskStats.total}</span>
            </div>

            <div className="flex gap-2 items-center bg-yellow-100 p-4 rounded-lg">
              <FaClock className='text-yellow-800' />
              <span className="text-lg font-medium text-yellow-800">Active Tasks</span>
              <span className="text-xl ml-auto font-semibold text-yellow-800">{taskStats.active}</span>
            </div>

            <div className="flex gap-2 items-center bg-green-100 p-4 rounded-lg">
              <FaCheck className='text-green-800' />
              <span className="text-lg font-medium text-green-800">Completed Tasks</span>
              <span className="text-xl ml-auto font-semibold text-green-800">{taskStats.completed}</span>
            </div>
          </div>

          {/* Button to display Logout confirmation popup */}
          <button onClick={() => setShowLogout(true)} className='pt-8 mx-auto w-full text-gray-700'>
            <FiLogOut className='inline mx-2' />
            Logout</button>
        </div>
        
      </div>
    </>
  );
};

export default ProfilePage;
