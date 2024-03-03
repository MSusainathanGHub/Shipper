import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
  
const AdminGuard = ({ children }) => {
    const { authenticated, role } = useAuth()
  
        if (authenticated && role !== 'ADMIN') {
            return <Navigate to="/login" replace />;
          }
        
           if (!authenticated) {
            return <Navigate to="/login" replace />;
          }
           return children;
    
  
};

export default AdminGuard;
