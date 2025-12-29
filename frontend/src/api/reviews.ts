import api from './axios';
import { Review } from '../types';

export const getReviews = async (hostelId: number) => {
    const { data } = await api.get<{ reviews: Review[] }>(`/hostels/${hostelId}/reviews`);
    return data.reviews;
};

export const addReview = async (hostelId: number, review: { rating: number, comment: string }) => {
    const { data } = await api.post<Review>(`/hostels/${hostelId}/reviews`, review);
    return data;
};
