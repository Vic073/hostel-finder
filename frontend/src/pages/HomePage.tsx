import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHostels } from '../api/hostels';
import HostelCard from '../components/HostelCard';
import { Search, Shield, DollarSign, MapPin, Users, CheckCircle, ArrowRight, Star, Home as HomeIcon, MessageSquare } from 'lucide-react';
import Button from '../components/Button';

const HomePage = () => {
    const { data: hostels, isLoading, error } = useQuery({
        queryKey: ['hostels'],
        queryFn: getHostels,
    });

    return (
        <div className="space-y-16 md:space-y-24 -mt-6 md:-mt-8">
            {/* Hero Section */}
            <section className="relative rounded-2xl md:rounded-3xl overflow-hidden glass p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
                        Find Your Perfect <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Student Home
                        </span>
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
                        Discover comfortable, affordable, and safe hostels near your university. Your home away from home starts here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-2 md:p-3 glass rounded-xl border border-white/20 max-w-3xl mx-auto">
                        <div className="flex-grow">
                            <div className="relative">
                                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by location or name..."
                                    className="w-full bg-transparent border-none pl-10 md:pl-12 pr-4 py-3 md:py-4 placeholder-muted-foreground focus:outline-none text-foreground text-sm md:text-base"
                                />
                            </div>
                        </div>
                        <Button className="shrink-0 rounded-lg">
                            <Search className="w-4 h-4 mr-2" />
                            Search
                        </Button>
                    </div>

                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                        <Link to="/register">
                            <Button size="lg" className="w-full sm:w-auto">
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-56 h-56 md:w-80 md:h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* About/Mission Section */}
            <section className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">HostelFinder</span>?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    We understand the challenges students face when searching for accommodation. HostelFinder connects students with verified, safe, and affordable housing options near universities. Our platform makes finding your ideal student home simple, secure, and stress-free.
                </p>
            </section>

            {/* Key Features Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Safe & Verified</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        All properties are verified for safety and legitimacy. Your security is our priority.
                    </p>
                </div>

                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Affordable Options</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Find budget-friendly accommodations that fit your student lifestyle and wallet.
                    </p>
                </div>

                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <MapPin className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Near Campus</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        All hostels are strategically located close to major universities and colleges.
                    </p>
                </div>

                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Users className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Community Focused</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Join a vibrant community of students and make lifelong connections.
                    </p>
                </div>

                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Star className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Ratings & Reviews</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Read honest reviews from students to make informed decisions about your stay.
                    </p>
                </div>

                <div className="glass p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Easy Booking</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Simple, straightforward booking process. Find and book your home in minutes.
                    </p>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="glass rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 border border-white/10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
                    How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Works</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    <div className="relative text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                            <Search className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">1. Search</h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Browse through hundreds of verified hostels near your university using our smart search.
                        </p>
                        <div className="hidden md:block absolute top-10 -right-6 lg:-right-12 w-12 lg:w-24 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                    </div>

                    <div className="relative text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                            <HomeIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">2. View Details</h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Explore detailed information, photos, amenities, and reviews from fellow students.
                        </p>
                        <div className="hidden md:block absolute top-10 -right-6 lg:-right-12 w-12 lg:w-24 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                    </div>

                    <div className="relative text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                            <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">3. Connect</h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Contact property owners directly and schedule visits to find your perfect match.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Hostels Section */}
            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Featured Hostels</h2>
                        <p className="text-sm md:text-base text-muted-foreground">Discover top-rated accommodations</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 md:h-96 rounded-xl bg-card/50 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12 md:py-20 bg-destructive/10 rounded-xl text-destructive font-bold">
                        Error loading hostels. Please try again later.
                    </div>
                ) : hostels?.length === 0 ? (
                    <div className="text-center py-12 md:py-20 glass rounded-xl text-muted-foreground">
                        <HomeIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg md:text-xl font-semibold mb-2">No hostels available yet</h3>
                        <p className="text-sm md:text-base">Be the first to list a property!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {hostels?.slice(0, 6).map((hostel: any) => (
                            <HostelCard key={hostel.ID} hostel={hostel} />
                        ))}
                    </div>
                )}
            </section>

            {/* Trust/Social Proof Section */}
            <section className="glass rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 border border-white/10 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Students Everywhere</span>
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                    <div>
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">500+</div>
                        <p className="text-sm md:text-base text-muted-foreground">Happy Students</p>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">100+</div>
                        <p className="text-sm md:text-base text-muted-foreground">Verified Hostels</p>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">50+</div>
                        <p className="text-sm md:text-base text-muted-foreground">Partner Universities</p>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">4.8</div>
                        <p className="text-sm md:text-base text-muted-foreground">Average Rating</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative glass rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-white/10 overflow-hidden">
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                        Ready to Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Perfect Home</span>?
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                        Join thousands of students who have found their ideal accommodation through HostelFinder.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="w-full sm:w-auto">
                                Sign Up Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Browse Hostels
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-56 h-56 md:w-80 md:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            </section>
        </div>
    );
};

export default HomePage;
