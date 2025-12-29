import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../api/favorites';
import HostelCard from '../components/HostelCard';
import Button from '../components/Button';
import { Plus, Heart, Home as HomeIcon } from 'lucide-react';

// Mock data/functions for now to avoid errors if API not ready
const DashboardPage = () => {
    const { user, logout } = useAuth();

    // Favorites Query
    const { data: favorites, isLoading: isFavLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        enabled: !!user && user.Role === 'student',
    });

    // Conditionally render based on role
    if (!user) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">Welcome back, {user.Name}</p>
                </div>

                {user.Role === 'owner' && (
                    <Button className="gap-2" onClick={() => window.location.href = '/create-hostel'}>
                        <Plus className="w-4 h-4" /> Add New Hostel
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats or Quick Actions */}
                <div className="glass p-6 rounded-xl space-y-2">
                    <h3 className="text-lg font-medium text-foreground">Account Type</h3>
                    <p className="text-2xl font-bold capitalize text-primary">{user.Role}</p>
                </div>

                <div className="glass p-6 rounded-xl space-y-2">
                    <h3 className="text-lg font-medium text-foreground">
                        {user.Role === 'student' ? 'Saved Hostels' : 'Listed Hostels'}
                    </h3>
                    <p className="text-2xl font-bold">{user.Role === 'student' ? favorites?.length || 0 : 0}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6">
                    {user.Role === 'student' ? 'Your Favorites' : 'Your Listings'}
                </h2>

                <div className={favorites && favorites.length > 0 ? "" : "p-12 glass rounded-xl border-dashed border-2 border-white/20 flex flex-col items-center justify-center text-center space-y-4"}>
                    {user.Role === 'student' ? (
                        favorites && favorites.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
                                {favorites.map((fav) => (
                                    <HostelCard key={fav.HostelID} hostel={fav.Hostel} />
                                ))}
                            </div>
                        ) : (
                            <>
                                <Heart className="w-12 h-12 text-muted-foreground" />
                                <h3 className="text-xl font-medium">No favorites yet</h3>
                                <p className="text-muted-foreground max-w-sm">Start exploring hostels and save the ones you like!</p>
                                <Button variant="outline" onClick={() => window.location.href = '/'}>Explore Hostels</Button>
                            </>
                        )
                    ) : (
                        <>
                            <HomeIcon className="w-12 h-12 text-muted-foreground" />
                            <h3 className="text-xl font-medium">No hostels listed</h3>
                            <p className="text-muted-foreground max-w-sm">List your property today and reach thousands of students.</p>
                            <Button onClick={() => window.location.href = '/create-hostel'}>Create Listing</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
