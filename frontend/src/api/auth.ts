import api from './axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', credentials);
    return data;
};

export const getMe = async () => {
    const { data } = await api.get('/protected/me');
    return data;
};
