import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define Auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // Function to login
    const login = (accessToken, role) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('role', role);
        setAccessToken(accessToken);
        setRole(role);
        setAuthenticated(true);
        if (role === 'ADMIN') {
            navigate('/admin/dashboard');
          } else if (role === 'USER') {
            navigate('/user/form');
          }
    };

    // Function to logout
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        setAccessToken(null);
        setRole(null);
        setAuthenticated(false);
    };

    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('role');

        if (token) {
            setAuthenticated(true);
            setAccessToken(token);
            setRole(role)
        }
    }, []);
    return (
        <AuthContext.Provider value={{ authenticated, accessToken, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
