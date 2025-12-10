'use client';

import { useState } from 'react';
import { Zap, Droplet, Car, Home as HomeIcon, MapPin, ArrowRight, Maximize2 } from 'lucide-react';
import { ServiceCard } from '@/components/dashboard/ServiceCard';
import { TechnicianCard } from '@/components/technician/TechnicianCard';
import { FavoriteCard } from '@/components/dashboard/FavoriteCard';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/shared/Sidebar';
import { BottomNavigation } from '@/components/shared/BottomNavigation';
import { Header } from '@/components/shared/Header';

const services = [
  { icon: Zap, title: 'Electrician' },
  { icon: Droplet, title: 'Plumber' },
  { icon: Car, title: 'Auto Repair' },
  { icon: HomeIcon, title: 'Home Services' },
];

const favorites = [
  {
    id: '1',
    name: 'John Doe',
    specialty: 'Electrician',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.8,
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    specialty: 'Plumber',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 4.9,
    status: 'busy' as const,
  },
  {
    id: '3',
    name: 'Mike Ross',
    specialty: 'Auto Repair',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 4.7,
    status: 'online' as const,
  },
  {
    id: '4',
    name: 'Lisa Park',
    specialty: 'Electrician',
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 5.0,
    status: 'online' as const,
  },
  {
    id: '5',
    name: 'Emma Wilson',
    specialty: 'Plumber',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 4.9,
    status: 'online' as const,
  },
];

const nearbyTechnicians = [
  {
    id: '1',
    name: 'John Doe',
    specialty: 'Electrician',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.8,
    reviewCount: 124,
    distance: '0.5 mi',
    hourlyRate: 50,
    status: 'online' as const,
    statusText: 'Available Now',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    specialty: 'Plumber',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 4.9,
    reviewCount: 89,
    distance: '1.2 mi',
    hourlyRate: 60,
    status: 'busy' as const,
    statusText: 'Busy until 3PM',
    isInitiallyFavorite: true,
  },
  {
    id: '3',
    name: 'Mike Ross',
    specialty: 'Auto Repair',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 4.7,
    reviewCount: 56,
    distance: '2.1 mi',
    hourlyRate: 45,
    status: 'online' as const,
    statusText: 'Available Now',
  },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        userName="Alex"
        userAvatar="https://i.pravatar.cc/150?img=12"
        notificationCount={3}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Good Morning, Alex! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            What service do you need today?
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              onClick={() => console.log(`Selected: ${service.title}`)}
            />
          ))}
        </div>

        {/* Live Map View */}
        <div className="mb-12">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm h-[350px] relative">
            <img
              src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-122.4194,37.7749,12,0/1200x350@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />

            {/* Map Controls */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <Badge className="bg-success/10 text-success border-success/20 px-4 py-2.5 font-semibold backdrop-blur-sm bg-white/90">
                <MapPin className="w-4 h-4 mr-2" />
                12 Technicians Nearby
              </Badge>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm text-foreground border border-border rounded-xl font-semibold text-sm hover:bg-white transition-all">
                <Maximize2 className="w-4 h-4" />
                Expand
              </button>
            </div>
          </div>
        </div>

        {/* Your Favorites */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Your Favorites</h3>
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} {...favorite} />
            ))}
          </div>
        </div>

        {/* Nearby Now */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Nearby Now</h3>
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              See All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-4">
            {nearbyTechnicians.map((technician) => (
              <TechnicianCard key={technician.id} {...technician} />
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Recent Bookings</h3>
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View History
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="Mike Ross"
                className="w-20 h-20 rounded-2xl shadow-md"
              />
              <div className="flex-1">
                <h4 className="font-bold text-base mb-2">Mike Ross - Auto Repair</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1.5 text-success font-medium">
                    ✓ Completed
                  </span>
                  <span>Jan 15, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg">
                  Book Again
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-card text-foreground border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-all">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
