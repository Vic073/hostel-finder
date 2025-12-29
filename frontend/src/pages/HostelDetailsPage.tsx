import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHostel } from '../api/hostels';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import { getReviews } from '../api/reviews';
import Button from '../components/Button';
import { MapPin, DollarSign, Star, User, Share2, Heart, Wifi, Shield, Zap, Car, CheckCircle, ArrowLeft } from 'lucide-react';
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


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-muted-foreground">Loading details...</div>
            </div>
        );
    }
    
    if (error || !hostel) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <p className="text-destructive text-lg">Hostel not found</p>
                <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="mb-2 -ml-2"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-grow">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{hostel.Name}</h1>
                            <div className="flex items-center text-muted-foreground text-sm md:text-base">
                                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-1.5 shrink-0" />
                                <span>{hostel.Location}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                            {user?.Role === 'student' && (
                                <Button
                                    variant={isFavorite ? 'primary' : 'outline'}
                                    size="sm"
                                    className="gap-2 flex-1 sm:flex-none"
                                    onClick={() => toggleFavorite()}
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} /> 
                                    {isFavorite ? 'Saved' : 'Save'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="rounded-xl md:rounded-2xl overflow-hidden h-64 md:h-96">
                        {hostel.Images && hostel.Images.length > 0 ? (
                            <img 
                                src={hostel.Images[0].url} 
                                alt={hostel.Name} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 h-64 md:h-96">
                        {[1, 2, 3, 4].map((i) => (
                            <div 
                                key={i} 
                                className="bg-muted/50 rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground text-xs md:text-sm hover:bg-muted/70 transition-colors"
                            >
                                Image {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <div className="glass p-5 md:p-6 rounded-xl border border-white/10 space-y-4">
                        <h2 className="text-lg md:text-xl font-bold">About this place</h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {hostel.Description || "No description provided."}
                        </p>
                    </div>

                    <div className="glass p-5 md:p-6 rounded-xl border border-white/10 space-y-4">
                        <h2 className="text-lg md:text-xl font-bold">Amenities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                    <Wifi className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm md:text-base">WiFi</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                    <Shield className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm md:text-base">Security</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm md:text-base">Water & Electricity</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                    <Car className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm md:text-base">Parking</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-5 md:p-6 rounded-xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg md:text-xl font-bold">Reviews</h2>
                            <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-full">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold text-yellow-400">
                                    {hostel.average_rating ? hostel.average_rating.toFixed(1) : 'New'}
                                </span>
                            </div>
                        </div>

                        {reviews && reviews.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                {reviews.map((review) => (
                                    <div key={review.ID} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="font-semibold text-sm md:text-base">User {review.UserID}</span>
                                            </div>
                                            <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                                                <Star className="w-3 h-3 fill-current mr-1" /> {review.Rating}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-xs md:text-sm ml-10">{review.Comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm md:text-base text-center py-8">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="glass p-5 md:p-6 rounded-xl border border-white/10 lg:sticky lg:top-24 space-y-6">
                        <div className="pb-4 border-b border-white/10">
                            <div className="flex items-baseline gap-1 mb-2">
                                <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                                <span className="text-3xl md:text-4xl font-bold text-foreground">{hostel.Price}</span>
                                <span className="text-sm md:text-base text-muted-foreground">/ month</span>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">Great value for money</p>
                        </div>

                        <div className="space-y-3">
                            <Button 
                                className="w-full text-base md:text-lg py-6" 
                                size="lg"
                                onClick={() => user ? alert("Contacting Owner...") : navigate('/login')}
                            >
                                {user ? 'Contact Owner' : 'Login to Book'}
                            </Button>
                            
                            <p className="text-xs text-muted-foreground text-center">
                                You won't be charged yet
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-2">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                <span>Verified property</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                <span>Instant booking available</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                <span>Free cancellation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostelDetailsPage;
