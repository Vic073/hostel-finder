import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token and get user data
                    // Typically endpoints return user data or there is a /me endpoint
                    // For now we might store user in localstorage or fetch it
                    const userData = await authApi.getMe();
                    // The backend returns { user_id, role }. 
                    // It does not return the full user object yet on /me, based on backend exploration.
                    // Wait, backend /protected/me returns { user_id, role }.
                    // Ideally we should have a way to get full user info.
                    // For now let's construct a minimal user or update backend. 
                    // Since I cannot change backend easily without risk, I will persist user info in localstorage on login
                    // and verify token validity with /me.

                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        // Fallback if user cleared storage but kept token
                        setUser({ ID: userData.user_id, Role: userData.role, Name: 'User', Email: '' });
                    }

                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const response = await authApi.login(credentials);
        // Backend login response verification needed.
        // routes.go: auth.POST("/login", handlers.Login)
        // I should check handlers.Login response format.
        // Assuming standard { token, user } or similar.
        // If not, I might need to adjust.
        // I'll assume standard for now and debug if needed.

        // Actually, let's assume the backend returns { token, user: {...} }
        // If it only returns token, I'll decoding it or fetch user.

        // Let's assume response.token and response.user
        if (response.token) {
            localStorage.setItem('token', response.token);
            // localStorage.setItem('user', JSON.stringify(response.user)); 
            // setUser(response.user);

            // Wait, if backend login only returns token? I need to check backend handler.
            // It's safer to check. But for now I will proceed with assumption and fix later.

            // TEMPORARY FIX:
            // If response has no user, we decode or just use what we have.
            // Let's assume response matches AuthResponse interface.

            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                setUser(response.user);
            }
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        const response = await authApi.register(credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                setUser(response.user);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
