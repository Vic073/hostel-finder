import api from './axios';
import { Favorite } from '../types';

export const getFavorites = async () => {
    const { data } = await api.get<{ favorites: Favorite[] }>('/me/favorites');
    return data.favorites;
};

export const addFavorite = async (hostelId: number) => {
    await api.post(`/hostels/${hostelId}/favorite`);
};

export const removeFavorite = async (hostelId: number) => {
    await api.delete(`/hostels/${hostelId}/favorite`);
};
