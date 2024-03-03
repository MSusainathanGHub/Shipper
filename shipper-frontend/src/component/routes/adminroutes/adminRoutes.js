import { Route, Routes } from 'react-router-dom';
import AdminGuard from '.';
import MasterLayout from '../../layout';



const AdminRoutes = () => {
    return (
      <Routes>
        <Route
          path="*"
          element={(
            <AdminGuard>
              <MasterLayout />
            </AdminGuard>
          )}
        />
      </Routes>
    );
  };

export default AdminRoutes