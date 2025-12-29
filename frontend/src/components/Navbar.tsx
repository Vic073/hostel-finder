import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when clicking a link
    const handleLinkClick = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" onClick={handleLinkClick}>
                            HostelFinder
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Dashboard
                                    </Link>
                                    <span className="text-sm text-muted-foreground">Hi, {user?.Name}</span>
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
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium" onClick={handleLinkClick}>
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="block hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium" onClick={handleLinkClick}>
                                    Dashboard
                                </Link>
                                <div className="px-3 py-2">
                                    <span className="text-sm text-muted-foreground block mb-2">Hi, {user?.Name}</span>
                                    <Button variant="outline" size="sm" onClick={() => { logout(); handleLinkClick(); }} className="w-full">
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2 px-3 py-2">
                                <Link to="/login" onClick={handleLinkClick}>
                                    <Button variant="ghost" size="sm" className="w-full justify-start">Login</Button>
                                </Link>
                                <Link to="/register" onClick={handleLinkClick}>
                                    <Button variant="primary" size="sm" className="w-full justify-start">Register</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
