import { Zap, Droplet, Car, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';


export function BottomNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-card border-t border-border shadow-lg">
        <div className="flex items-center justify-around">
          {[
            { icon: HomeIcon, label: 'Home', active: true },
            { icon: Zap, label: 'Search', active: false },
            { icon: Car, label: 'Favorites', active: false },
            { icon: Droplet, label: 'Bookings', active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href="#"
                className={`flex flex-col items-center gap-1 py-3 px-4 transition-all ${
                  item.active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
}