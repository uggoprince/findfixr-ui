'use client';

import { Star, Check, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FavoriteCardProps {
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  status: 'online' | 'busy';
}

export function FavoriteCard({
  name,
  specialty,
  avatar,
  rating,
  status,
}: FavoriteCardProps) {
  return (
    <div className="flex-shrink-0 w-36 text-center transition-all hover:-translate-y-1 cursor-pointer">
      <div className="relative inline-block mb-3">
        <Avatar className="w-24 h-24 rounded-2xl border-3 border-white shadow-lg hover:shadow-xl hover:border-primary transition-all">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute -top-1 -right-1 w-7 h-7 rounded-full border-3 border-white flex items-center justify-center shadow-md ${
            status === 'online' ? 'bg-success' : 'bg-warning'
          }`}
        >
          {status === 'online' ? (
            <Check className="w-3 h-3 text-white" />
          ) : (
            <Clock className="w-3 h-3 text-white" />
          )}
        </span>
      </div>
      <h4 className="font-semibold text-sm mb-2">{name}</h4>
      <div className="flex items-center justify-center gap-1 mb-1">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold">{rating}</span>
      </div>
      <p className="text-xs text-muted-foreground">{specialty}</p>
    </div>
  );
}
