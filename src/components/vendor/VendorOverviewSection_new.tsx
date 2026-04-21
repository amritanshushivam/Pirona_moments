'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, Star, Award, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="w-full max-w-full space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white rounded-lg p-6 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back! 🎉</h1>
        <p className="text-blue-100 mb-4">You're doing great! Here's your performance overview.</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 cursor-pointer">
            View All Bookings
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-blue-700 cursor-pointer">
            Update Profile
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Your Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${stat.color} rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor} mb-2`} />
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Recent Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentBookings.map((booking, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <h3 className="font-bold text-gray-900 mb-1 text-base">{booking.event}</h3>
              <p className="text-sm text-gray-600 mb-2">{booking.client}</p>
              <p className="text-sm text-gray-500 mb-2">{booking.date}</p>
              <div className="flex flex-col items-center gap-2 w-full mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {booking.status}
                </span>
                <span className="font-bold text-gray-900">{booking.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
