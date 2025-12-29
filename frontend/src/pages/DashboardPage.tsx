import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../api/favorites';
import HostelCard from '../components/HostelCard';
import Button from '../components/Button';
import { Plus, Heart, Home as HomeIcon, User, TrendingUp, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: favorites, isLoading: isFavLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        enabled: !!user && user.Role === 'student',
    });

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">Welcome back, {user.Name}</p>
                </div>

                {user.Role === 'owner' && (
                    <Button 
                        className="gap-2 w-full sm:w-auto" 
                        onClick={() => navigate('/create-hostel')}
                        size="md"
                    >
                        <Plus className="w-4 h-4" /> Add New Hostel
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="glass p-5 md:p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm md:text-base font-medium text-muted-foreground">Account Type</h3>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold capitalize text-primary">{user.Role}</p>
                </div>

                <div className="glass p-5 md:p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm md:text-base font-medium text-muted-foreground">
                            {user.Role === 'student' ? 'Saved Hostels' : 'Listed Hostels'}
                        </h3>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            {user.Role === 'student' ? (
                                <Heart className="w-5 h-5 text-primary" />
                            ) : (
                                <HomeIcon className="w-5 h-5 text-primary" />
                            )}
                        </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                        {user.Role === 'student' ? favorites?.length || 0 : 0}
                    </p>
                </div>

                <div className="glass p-5 md:p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm md:text-base font-medium text-muted-foreground">Activity</h3>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                        {user.Role === 'student' ? 'Active' : 'Growing'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold">
                        {user.Role === 'student' ? 'Your Favorites' : 'Your Listings'}
                    </h2>
                    {user.Role === 'student' && favorites && favorites.length > 0 && (
                        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                            Browse More
                        </Button>
                    )}
                </div>

                {isFavLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-80 md:h-96 rounded-xl bg-card/50 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className={favorites && favorites.length > 0 ? "" : "p-8 md:p-12 glass rounded-xl border-dashed border-2 border-white/20 flex flex-col items-center justify-center text-center space-y-4"}>
                        {user.Role === 'student' ? (
                            favorites && favorites.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                                    {favorites.map((fav) => (
                                        <HostelCard key={fav.HostelID} hostel={fav.Hostel} />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                        <Heart className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold">No favorites yet</h3>
                                    <p className="text-sm md:text-base text-muted-foreground max-w-sm">
                                        Start exploring hostels and save the ones you like!
                                    </p>
                                    <Button variant="primary" size="md" onClick={() => navigate('/')} className="mt-2">
                                        Explore Hostels
                                    </Button>
                                </>
                            )
                        ) : (
                            <>
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                    <HomeIcon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold">No hostels listed</h3>
                                <p className="text-sm md:text-base text-muted-foreground max-w-sm">
                                    List your property today and reach thousands of students.
                                </p>
                                <Button size="md" onClick={() => navigate('/create-hostel')} className="mt-2">
                                    Create Listing
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
