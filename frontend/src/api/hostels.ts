import api from './axios';
import { Hostel } from '../types';

export const getHostels = async () => {
    const { data } = await api.get<{ hostels: Hostel[] }>('/hostels');
    return data.hostels;
};

export const getHostel = async (id: number) => {
    const { data } = await api.get<Hostel>(`/hostels/${id}`);
    return data;
};

// Only for owners
export const createHostel = async (hostel: Omit<Hostel, 'ID' | 'Images' | 'average_rating' | 'OwnerID'>) => {
    const { data } = await api.post<Hostel>('/hostels', hostel);
    return data;
};

export const deleteHostel = async (id: number) => {
    await api.delete(`/hostels/${id}`);
};

// Add more as needed
