import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/auth/check', { withCredentials: true });
                setIsLoggedIn(res.data.loggedIn === true);
                if (res.data.user.role === 'admin') setIsAdmin(true);
            } catch (err) {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
