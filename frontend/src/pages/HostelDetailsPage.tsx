import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHostel } from '../api/hostels';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import { getReviews } from '../api/reviews';
import Button from '../components/Button';
import { MapPin, DollarSign, Star, User, Share2, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HostelDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: hostel, isLoading, error } = useQuery({
        queryKey: ['hostel', id],
        queryFn: () => getHostel(Number(id)),
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    // Favorites Logic
    const { data: favorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        enabled: !!user && user.Role === 'student',
    });

    const isFavorite = favorites?.some(f => f.HostelID === Number(id));

    const { mutate: toggleFavorite } = useMutation({
        mutationFn: () => isFavorite ? removeFavorite(Number(id)) : addFavorite(Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    });

    // Reviews Logic
    const { data: reviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: () => getReviews(Number(id)),
        enabled: !!id,
    });


    if (isLoading) return <div className="text-center py-20">Loading details...</div>;
    if (error || !hostel) return <div className="text-center py-20 text-destructive">Hostel not found</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header & Images */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{hostel.Name}</h1>
                        <div className="flex items-center text-muted-foreground mt-2">
                            <MapPin className="w-5 h-5 mr-1" />
                            {hostel.Location}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" /> Share
                        </Button>
                        {user?.Role === 'student' && (
                            <Button
                                variant={isFavorite ? 'primary' : 'outline'}
                                size="sm"
                                className="gap-2"
                                onClick={() => toggleFavorite()}
                            >
                                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} /> {isFavorite ? 'Saved' : 'Save'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                    <div className="rounded-xl overflow-hidden h-full">
                        {hostel.Images && hostel.Images.length > 0 ? (
                            <img src={hostel.Images[0].url} alt={hostel.Name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        {/* Placeholders for gallery */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground">
                                Image {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass p-6 rounded-xl space-y-4">
                        <h2 className="text-xl font-bold">About this place</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {hostel.Description || "No description provided."}
                        </p>
                    </div>

                    <div className="glass p-6 rounded-xl space-y-4">
                        <h2 className="text-xl font-bold">Amenities</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                WiFi
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Security
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Water & Electricity
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Parking
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="glass p-6 rounded-xl space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Reviews <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /> {hostel.average_rating ? hostel.average_rating.toFixed(1) : 'New'}
                        </h2>

                        {reviews && reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.ID} className="border-b border-white/10 pb-4 last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold">User {review.UserID}</span>
                                            <div className="flex items-center text-yellow-400 text-sm">
                                                <Star className="w-3 h-3 fill-current mr-1" /> {review.Rating}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{review.Comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No reviews yet.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar / Booking */}
                <div className="lg:col-span-1">
                    <div className="glass p-6 rounded-xl sticky top-24 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">${hostel.Price}</span>
                                <span className="text-muted-foreground ml-1">/ month</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full text-lg py-6" onClick={() => user ? alert("Contacting Owner...") : navigate('/login')}>
                                {user ? 'Contact Owner' : 'Login to Book'}
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                            You won't be charged yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostelDetailsPage;
