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
            <div className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-white/10 group-hover:border-primary/50 h-full flex flex-col">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    {hostel.Images && hostel.Images.length > 0 ? (
                        <img
                            src={hostel.Images[0].url}
                            alt={hostel.Name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                            No Image Available
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1.5 md:px-3 md:py-1 rounded-full flex items-center gap-1 text-yellow-400 text-xs md:text-sm font-bold shadow-lg">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400" />
                        <span>{hostel.average_rating ? hostel.average_rating.toFixed(1) : 'New'}</span>
                    </div>
                </div>

                <div className="p-4 md:p-5 flex-grow flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{hostel.Name}</h3>

                    <div className="flex items-center text-muted-foreground mb-3 text-xs md:text-sm">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 shrink-0" />
                        <span className="truncate">{hostel.Location}</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                        <div className="flex items-center text-base md:text-lg font-bold text-foreground">
                            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <span>{hostel.Price}</span>
                            <span className="text-xs md:text-sm text-muted-foreground font-normal ml-1">/ mo</span>
                        </div>
                        <span className="text-[10px] md:text-xs px-2 py-1 bg-primary/20 rounded-md text-primary font-medium uppercase tracking-wider">
                            View
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HostelCard;
