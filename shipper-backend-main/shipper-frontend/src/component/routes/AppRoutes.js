import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Login from '../auth/Login';
 import AdminRoutes from './adminroutes/adminRoutes';
import UserRoutes from './userroutes/userRoutes';


const AppRoutes = () => {
  const { authenticated, role } = useAuth()

  console.log("authenticated", authenticated)
  console.log("role", role)

  return (

    <Routes>
            <Route path="/" element={<AdminRoutes />} />

      <Route path="login" element={<Login />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route path="user/*" element={<UserRoutes />} />
    </Routes>

  )
}





export default AppRoutes;
