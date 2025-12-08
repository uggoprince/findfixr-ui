'use client';

import { useState } from 'react';
import {
  Search, MapPin, Star, CheckCircle, ArrowRight,
  Zap, Droplet, Car, Home, Menu, X
} from 'lucide-react';
import { Header } from '@/components/shared/Header';

const categories = [
  { id: 'electrician', icon: Zap, name: 'Electrician', count: 120 },
  { id: 'plumber', icon: Droplet, name: 'Plumber', count: 85 },
  { id: 'mechanic', icon: Car, name: 'Auto Repair', count: 65 },
  { id: 'home', icon: Home, name: 'Home Services', count: 140 },
];

const technicians = [
  {
    id: 1,
    name: 'John Doe',
    profession: 'Master Electrician',
    rating: 4.9,
    reviews: 124,
    image: '👨‍🔧',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Miller',
    profession: 'Licensed Plumber',
    rating: 5.0,
    reviews: 89,
    image: '👩‍🔧',
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Ross',
    profession: 'Auto Mechanic',
    rating: 4.8,
    reviews: 156,
    image: '👨‍🔧',
    verified: true,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ========== HEADER ========== */}
      <Header onMenuClick={() => setMobileMenuOpen(true)} isAuthenticated={false} />

      {/* ========== HERO SECTION ========== */}
      <section className="py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Trusted Technicians
              <br />
              <span className="text-primary-600">Near You</span>
            </h2>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-2xl p-3 border-2 border-gray-100">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Service Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none outline-none text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your location"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none outline-none text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>

                  {/* Search Button */}
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 whitespace-nowrap">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Browse Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-6">Browse Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.count}+ available</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get help in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
                  <Search className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Search</h3>
              <p className="text-gray-600">Find verified technicians in your area with real-time availability</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-blue-300" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Book</h3>
              <p className="text-gray-600">Compare reviews and prices. Book instantly or schedule for later</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary-300" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
                  <Star className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Done</h3>
              <p className="text-gray-600">Get the job done right. Leave a review and rate your experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED TECHNICIANS ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Technicians</h2>
            <p className="text-xl text-gray-600">Meet our top-rated professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl shadow-lg relative">
                    {tech.image}
                    {tech.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{tech.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{tech.profession}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{tech.rating}</span>
                      <span className="text-xs text-gray-500">({tech.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* View Profile Button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition flex items-center gap-2 mx-auto">
              View All Technicians
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF ========== */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-6">Trusted by</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Verified Technicians</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">4.9</div>
                <div className="text-gray-600 font-medium flex items-center justify-center gap-1">
                  Average Rating
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers finding reliable technicians
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition text-lg">
              Find a Technician
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition text-lg">
              Become a Technician
            </button>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <h3 className="text-xl font-bold">FindFixr</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Find trusted technicians near you, instantly.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Electrician</a></li>
                <li><a href="#" className="hover:text-white transition">Plumber</a></li>
                <li><a href="#" className="hover:text-white transition">Auto Repair</a></li>
                <li><a href="#" className="hover:text-white transition">Home Services</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Become a Technician</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 FindFixr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
