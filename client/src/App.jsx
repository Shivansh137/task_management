import { Route, Routes, useNavigate } from "react-router-dom"
import TasksPage from "./pages/TasksPage"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProfilePage"
import { useEffect } from "react"
import useRefreshToken from "./hooks/useRefreshToken"

const App = () => {
  useEffect(() => {
     useRefreshToken();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />} >
          <Route index element={<TasksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
