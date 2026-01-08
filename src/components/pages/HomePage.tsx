import React, { useState } from 'react';
import { 
  Search, MapPin, Star, Heart, Filter, 
  Zap, Droplet, Car, Home, Wrench, MessageCircle
} from 'lucide-react';

const AuthenticatedHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Categories data
  const categories = [
    { id: 'all', icon: <Home className="w-5 h-5" />, name: 'All Services', count: 450 },
    { id: 'electrician', icon: <Zap className="w-5 h-5" />, name: 'Electrician', count: 120 },
    { id: 'plumber', icon: <Droplet className="w-5 h-5" />, name: 'Plumber', count: 85 },
    { id: 'mechanic', icon: <Car className="w-5 h-5" />, name: 'Auto Repair', count: 65 },
    { id: 'handyman', icon: <Wrench className="w-5 h-5" />, name: 'Handyman', count: 140 },
  ];

  // Featured/Nearby Technicians
  const technicians = [
    {
      id: 1,
      name: 'John Doe',
      profession: 'Master Electrician',
      rating: 4.9,
      reviews: 124,
      hourlyRate: 85,
      distance: '2.3 miles',
      image: '👨‍🔧',
      verified: true,
      isBookmarked: true,
      availability: 'Available Now',
      skills: ['Wiring', 'Lighting', 'Panel Upgrades'],
    },
    {
      id: 2,
      name: 'Sarah Miller',
      profession: 'Licensed Plumber',
      rating: 5.0,
      reviews: 89,
      hourlyRate: 75,
      distance: '3.1 miles',
      image: '👩‍🔧',
      verified: true,
      isBookmarked: false,
      availability: 'Available Today',
      skills: ['Pipe Repair', 'Drain Cleaning', 'Water Heaters'],
    },
    {
      id: 3,
      name: 'Mike Ross',
      profession: 'Auto Mechanic',
      rating: 4.8,
      reviews: 156,
      hourlyRate: 90,
      distance: '1.8 miles',
      image: '👨‍🔧',
      verified: true,
      isBookmarked: true,
      availability: 'Available Tomorrow',
      skills: ['Engine Repair', 'Oil Change', 'Diagnostics'],
    },
    {
      id: 4,
      name: 'Emily Chen',
      profession: 'Handyman',
      rating: 4.7,
      reviews: 98,
      hourlyRate: 65,
      distance: '4.2 miles',
      image: '👩‍🔧',
      verified: true,
      isBookmarked: false,
      availability: 'Available Now',
      skills: ['General Repairs', 'Assembly', 'Painting'],
    },
    {
      id: 5,
      name: 'David Park',
      profession: 'Electrician',
      rating: 4.9,
      reviews: 142,
      hourlyRate: 80,
      distance: '2.9 miles',
      image: '👨‍🔧',
      verified: true,
      isBookmarked: false,
      availability: 'Available Now',
      skills: ['Smart Home', 'Ceiling Fans', 'Outlets'],
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      profession: 'Plumber',
      rating: 4.6,
      reviews: 76,
      hourlyRate: 70,
      distance: '3.5 miles',
      image: '👩‍🔧',
      verified: true,
      isBookmarked: true,
      availability: 'Available Today',
      skills: ['Faucet Repair', 'Toilet Repair', 'Gas Lines'],
    },
  ];

  const [bookmarkedTechs, setBookmarkedTechs] = useState(
    new Set(technicians.filter(t => t.isBookmarked).map(t => t.id))
  );

  const toggleBookmark = (techId: number) => {
    setBookmarkedTechs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(techId)) {
        newSet.delete(techId);
      } else {
        newSet.add(techId);
      }
      return newSet;
    });
  };

  const filteredTechnicians = technicians.filter(tech => {
    if (selectedCategory && selectedCategory !== 'all') {
      return tech.profession.toLowerCase().includes(selectedCategory);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ========== SEARCH SECTION ========== */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Find Your Perfect Technician</h2>
              <p className="text-gray-600">Search from over 500 verified professionals near you</p>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-3 border-2 border-gray-200">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Service Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-600 transition text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>

                {/* Location Input */}
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your location"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-600 transition text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>

                {/* Search Button */}
                <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 whitespace-nowrap">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className={`text-sm ${
                  selectedCategory === category.id ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedCategory && selectedCategory !== 'all' 
                ? `${categories.find(c => c.id === selectedCategory)?.name} Technicians`
                : 'All Technicians'
              }
            </h3>
            <p className="text-gray-600 text-sm mt-1">{filteredTechnicians.length} results found</p>
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition font-medium text-gray-700"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel (when expanded) */}
        {showFilters && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none">
                  <option>Highest Rated</option>
                  <option>Nearest</option>
                  <option>Lowest Price</option>
                  <option>Most Reviews</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none">
                  <option>Any Price</option>
                  <option>$0 - $50/hr</option>
                  <option>$50 - $100/hr</option>
                  <option>$100+/hr</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none">
                  <option>Any Time</option>
                  <option>Available Now</option>
                  <option>Today</option>
                  <option>This Week</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Distance</label>
                <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none">
                  <option>Any Distance</option>
                  <option>Within 5 miles</option>
                  <option>Within 10 miles</option>
                  <option>Within 25 miles</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Technicians Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-600 hover:shadow-xl transition-all duration-300 group relative"
            >
              {/* Bookmark Button */}
              <button
                onClick={() => toggleBookmark(tech.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-blue-600 transition z-10"
              >
                <Heart 
                  className={`w-5 h-5 ${
                    bookmarkedTechs.has(tech.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>

              {/* Technician Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-3xl shadow-lg relative flex-shrink-0">
                  {tech.image}
                  {tech.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{tech.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{tech.profession}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{tech.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({tech.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-500">📍 {tech.distance} away</p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tech.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Availability & Price */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Availability</p>
                  <p className="text-sm font-semibold text-green-600">{tech.availability}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
                  <p className="text-lg font-bold text-gray-900">${tech.hourlyRate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition">
                  View Profile
                </button>
                <button className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition">
            Load More Technicians
          </button>
        </div>
      </main>
    </div>
  );
};

export default AuthenticatedHomePage;