import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/auth/check', { withCredentials: true });
                if (res.data.loggedIn) {
                    setIsLoggedIn(true)
                }
            } catch (err) {
                setIsLoggedIn(false)
            }
        };

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

