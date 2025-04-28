import React from 'react'
import axiosInstance from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'


const Logout = ({setShowLogout}) => {
    const navigate = useNavigate();
    // API request to logout 
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.get('/auth/logout', {withCredentials: true});
            console.log(response);
            
            // if logout successful remove data from local storage
            if(response.status == 200){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tasks');
                navigate('/login')
            }
        } catch (error) {
            console.log(error);  
        }
    }
    
  return (
    <div className='w-screen h-screen top-0 left-0 absolute flex items-center z-50 bg-black/40'>
        <div className='shadow-md p-8 space-y-8 mb-16 text-center mx-auto w-fit bg-white rounded-lg'>
            <p>Are you sure you want to Logout ?</p>
            <div className='w-full flex gap-8 justify-end'>
                <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded-md'>Logout</button>
                <button onClick={() => setShowLogout(false)} className='text-gray-700'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

Logout.PropTypes = {
    setShowLogout: PropTypes.func.isRequired
}

export default Logout