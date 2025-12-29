import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { Hostel } from '../types';

interface HostelCardProps {
    hostel: Hostel;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel }) => {
    return (
        <Link to={`/hostels/${hostel.ID}`} className="block group">
            <div className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-white/10 group-hover:border-primary/50">
                <div className="relative h-64 overflow-hidden">
                    {hostel.Images && hostel.Images.length > 0 ? (
                        <img
                            src={hostel.Images[0].url}
                            alt={hostel.Name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                            No Image Available
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-yellow-400 text-sm font-bold">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span>{hostel.average_rating ? hostel.average_rating.toFixed(1) : 'New'}</span>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{hostel.Name}</h3>

                    <div className="flex items-center text-muted-foreground mb-3 text-sm">
                        <MapPin className="w-4 h-4 mr-1 shrink-0" />
                        <span className="truncate">{hostel.Location}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-lg font-bold text-foreground">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span>{hostel.Price}</span>
                            <span className="text-sm text-muted-foreground font-normal ml-1">/ month</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground font-medium uppercase tracking-wider">
                            Details
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HostelCard;
