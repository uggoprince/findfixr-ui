'use client';

import { useState } from 'react';
import { Star, Heart, Calendar, Navigation, MapPin, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TechnicianCardProps {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  distance: string;
  hourlyRate: number;
  status: 'online' | 'busy';
  statusText?: string;
  isInitiallyFavorite?: boolean;
}

export function TechnicianCard({
  name,
  specialty,
  avatar,
  rating,
  reviewCount,
  distance,
  hourlyRate,
  status,
  statusText,
  isInitiallyFavorite = false,
}: Readonly<TechnicianCardProps>) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="technician-card bg-card border border-border rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex gap-5">
        {/* Avatar with Status */}
        <div className="relative w-24 h-24 shrink-0">
          <Avatar className="w-24 h-24 rounded-2xl shadow-md">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span
            className={`absolute -top-1 -right-1 w-7 h-7 rounded-full border-3 border-white flex items-center justify-center shadow-md ${
              status === 'online' ? 'bg-success' : 'bg-warning'
            }`}
          >
            {status === 'online' ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-white" />
            )}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold text-lg mb-2">{name}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">{specialty}</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {distance}
                </span>
                <Badge
                  variant={status === 'online' ? 'default' : 'secondary'}
                  className={
                    status === 'online'
                      ? 'bg-success/10 text-success border-success/20'
                      : 'bg-warning/10 text-warning border-warning/20'
                  }
                >
                  {statusText ||
                    (status === 'online' ? 'Available Now' : 'Busy')}
                </Badge>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
                isFavorite
                  ? 'bg-destructive/10 border-destructive'
                  : 'bg-card border-border hover:bg-muted'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite
                    ? 'fill-destructive text-destructive'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          </div>

          {/* Rating and Price */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="font-bold text-sm">{rating}</span>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} reviews)
            </span>
            <span className="text-sm font-bold text-secondary ml-auto">
              ${hourlyRate}/hr
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5">
            <button className="btn btn-primary flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Calendar className="w-4 h-4" />
              Book Now
            </button>
            <button className="btn btn-secondary flex items-center gap-2 px-4 py-2.5 bg-card text-primary border-2 border-primary rounded-xl font-semibold text-sm hover:bg-primary/5 transition-all">
              <Navigation className="w-4 h-4" />
              Track Live
            </button>
            <button className="btn btn-tertiary flex items-center gap-2 px-4 py-2.5 bg-card text-foreground border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-all">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
