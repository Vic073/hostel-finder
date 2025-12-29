import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Home, LayoutDashboard } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 transition-all" 
                            onClick={handleLinkClick}
                        >
                            HostelFinder
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2">
                            <Link to="/" className="hover:text-primary hover:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                                Home
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="hover:text-primary hover:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                                        Dashboard
                                    </Link>
                                    <span className="text-sm text-muted-foreground px-2">Hi, {user?.Name}</span>
                                    <Button variant="outline" size="sm" onClick={logout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="primary" size="sm">Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-3 rounded-lg text-foreground hover:text-primary hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[44px] min-w-[44px]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div 
                className={`md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl transition-all duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-3 overflow-y-auto h-full">
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 hover:bg-white/5 px-4 py-4 rounded-lg text-base font-medium transition-all min-h-[44px]" 
                        onClick={handleLinkClick}
                    >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="flex items-center gap-3 hover:bg-white/5 px-4 py-4 rounded-lg text-base font-medium transition-all min-h-[44px]" 
                                onClick={handleLinkClick}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span>Dashboard</span>
                            </Link>
                            <div className="px-4 py-3 space-y-4 border-t border-white/10 mt-4 pt-6">
                                <p className="text-sm text-muted-foreground">
                                    Signed in as <span className="font-medium text-foreground">{user?.Name}</span>
                                </p>
                                <Button 
                                    variant="outline" 
                                    size="md" 
                                    onClick={() => { logout(); handleLinkClick(); }} 
                                    className="w-full justify-center"
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-3 px-4 py-4 border-t border-white/10 mt-4 pt-6">
                            <Link to="/login" onClick={handleLinkClick}>
                                <Button variant="outline" size="md" className="w-full justify-center">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register" onClick={handleLinkClick}>
                                <Button variant="primary" size="md" className="w-full justify-center">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
