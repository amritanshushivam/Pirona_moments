'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, Star, Award, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VendorOverviewSection() {
  const stats = [
    { label: 'Total Bookings', value: '24', icon: Calendar, color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Completed Events', value: '18', icon: Award, color: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Happy Clients', value: '120', icon: Users, color: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { label: 'Revenue (Month)', value: '₹2.5L', icon: DollarSign, color: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { label: 'New Inquiries', value: '8', icon: TrendingUp, color: 'bg-pink-100', iconColor: 'text-pink-600' },
  ];

  const recentBookings = [
    { event: 'Wedding Reception', client: 'Raj & Priya', date: 'May 15, 2026', status: 'Confirmed', amount: '₹50,000' },
    { event: 'Sangeet Ceremony', client: 'Amit & Neha', date: 'May 20, 2026', status: 'In Progress', amount: '₹35,000' },
    { event: 'Engagement Party', client: 'Vikas & Anjali', date: 'May 25, 2026', status: 'Pending', amount: '₹25,000' },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Welcome back! 🎉
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          You're doing great! Here's your performance overview.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white cursor-pointer">
            View All Bookings
          </Button>
          <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 cursor-pointer">
            Update Profile
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Your Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${stat.color} rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all`}
              >
                <Icon className={`h-8 w-8 ${stat.iconColor} mb-4`} />
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Recent Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {recentBookings.map((booking, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{booking.event}</h3>
              <p className="text-sm text-gray-600 mb-3">{booking.client}</p>
              <p className="font-semibold text-gray-800 mb-3">{booking.date}</p>
              <div className="flex flex-col items-center gap-3 w-full">
                <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                  booking.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                  booking.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                  'bg-amber-200 text-amber-800'
                }`}>
                  {booking.status}
                </span>
                <span className="font-bold text-lg text-gray-900">{booking.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
