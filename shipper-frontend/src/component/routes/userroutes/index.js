import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
 
const UserGuard = ({ children }) => {
  const { authenticated, role } = useAuth();

   if (authenticated && role !== 'USER') {
    return <Navigate to="/login" replace />;
  }

   if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

   return children;
};

export default UserGuard;
