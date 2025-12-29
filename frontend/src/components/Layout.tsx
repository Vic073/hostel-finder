import React from 'react';
import Navbar from './Navbar';
import { Outlet, Link } from 'react-router-dom';
import { Home, Mail, MapPin, Phone } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow pt-16 md:pt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <Outlet />
            </main>
            <footer className="border-t border-white/10 py-8 md:py-12 mt-auto glass">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                HostelFinder
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Making student housing search easier, safer, and more affordable.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
                            <div className="flex flex-col space-y-2 text-sm">
                                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
                            <div className="flex flex-col space-y-2 text-sm">
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    How It Works
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQs
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
                            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>info@hostelfinder.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>University District</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} HostelFinder. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
