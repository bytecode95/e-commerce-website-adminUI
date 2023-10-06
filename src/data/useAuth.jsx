import { useState, useEffect } from 'react';
import instance from "../service/axiosOrder.js";


export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    //console.log(user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }else{
            logout();
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    const login = (token) => {
        instance
            .get('/login/auth', {
                headers: {
                    token: token,
                },
            })
            .then((response) => {
                if (!response.data.error) {
                    localStorage.setItem('token', token);
                    setIsAuthenticated(true);
                    setUser(response.data.username);
                } else {
                    console.error('Token verification failed');
                }

            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    return {
        isAuthenticated,
        user,
        login,
        logout,
    };
}
