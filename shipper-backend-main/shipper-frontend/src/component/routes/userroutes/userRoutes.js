import { Route, Routes } from 'react-router-dom';
import MasterLayout from '../../layout';
import UserGuard from '.';


const UserRoutes = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={(
                    <UserGuard>
                        <MasterLayout />
                    </UserGuard>
                )}
            />
        </Routes>

    );
};

export default UserRoutes