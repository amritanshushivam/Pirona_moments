'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, Star, Award, DollarSign } from 'lucide-react';

export function VendorOverviewSection() {
  const stats = [
    { label: 'Total Bookings', value: '24', icon: Calendar, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Completed Events', value: '18', icon: Award, color: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Happy Clients', value: '120', icon: Users, color: 'bg-purple-50', iconColor: 'text-purple-600' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Revenue (Month)', value: '₹2.5L', icon: DollarSign, color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { label: 'New Inquiries', value: '8', icon: TrendingUp, color: 'bg-pink-50', iconColor: 'text-pink-600' },
  ];

  const recentBookings = [
    { event: 'Wedding Reception', client: 'Raj & Priya', date: 'May 15, 2026', status: 'Confirmed', amount: '₹50,000' },
    { event: 'Sangeet Ceremony', client: 'Amit & Neha', date: 'May 20, 2026', status: 'In Progress', amount: '₹35,000' },
    { event: 'Engagement Party', client: 'Vikas & Anjali', date: 'May 25, 2026', status: 'Pending', amount: '₹25,000' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8"
      >
        <h1 className="text-4xl font-bold mb-3">Welcome back! 👋</h1>
        <p className="text-blue-100 text-lg mb-6">Here's your performance overview at a glance.</p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
            View All Bookings
          </button>
          <button className="border border-white text-white hover:bg-blue-700/50 px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
            Update Profile
          </button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`${stat.color} rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className={`${stat.iconColor} mb-3`}>
                  <Icon className="h-8 w-8" />
                </div>
                <p className="text-sm text-gray-700 font-medium mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBookings.map((booking, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{booking.event}</h3>
                <p className="text-sm text-gray-700 mb-1">👤 {booking.client}</p>
                <p className="text-sm text-gray-600">📅 {booking.date}</p>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div>
                  <span className={`inline-block px-4 py-2 rounded-lg text-xs font-bold ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{booking.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
