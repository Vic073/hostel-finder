import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHostels } from '../api/hostels';
import HostelCard from '../components/HostelCard';
import { Search } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

const HomePage = () => {
    const { data: hostels, isLoading, error } = useQuery({
        queryKey: ['hostels'],
        queryFn: getHostels,
    });

    // Mock data if backend is empty (Optional, for demo purposes)
    // But let's rely on api.

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden glass p-8 md:p-12 mb-12">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Find your perfect <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Student Home
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Discover comfortable, affordable, and safe hostels near your university.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 p-2 glass rounded-xl border border-white/20">
                        <div className="flex-grow">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by location or name..."
                                    className="w-full bg-transparent border-none pl-10 pr-4 py-3 placeholder-muted-foreground focus:outline-none text-foreground"
                                />
                            </div>
                        </div>
                        <Button className="shrink-0 rounded-lg">Search Hostels</Button>
                    </div>
                </div>
                {/* Abstract background elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Listings Section */}
            <div>
                <h2 className="text-3xl font-bold mb-8">Featured Hostels</h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-96 rounded-xl bg-card/50 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-destructive/10 rounded-xl text-destructive font-bold">
                        Error loading hostels. Please try again later.
                    </div>
                ) : hostels?.length === 0 ? (
                    <div className="text-center py-20 glass rounded-xl text-muted-foreground">
                        No hostels found. Be the first to list one!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hostels?.map((hostel: any) => (
                            <HostelCard key={hostel.ID} hostel={hostel} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
