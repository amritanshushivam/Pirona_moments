'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VendorEarningsSection() {
  const earnings = [
    { month: 'April 2026', total: '₹2,50,000', bookings: 8, status: 'Paid', date: 'Apr 30' },
    { month: 'March 2026', total: '₹1,80,000', bookings: 6, status: 'Paid', date: 'Mar 31' },
    { month: 'February 2026', total: '₹2,10,000', bookings: 7, status: 'Paid', date: 'Feb 28' },
    { month: 'January 2026', total: '₹1,95,000', bookings: 6, status: 'Paid', date: 'Jan 31' },
  ];

  const stats = [
    { label: 'Total Earnings', value: '₹8,35,000', trend: '+12%', color: 'from-emerald-100 to-emerald-50' },
    { label: 'This Month', value: '₹2,50,000', trend: '+8%', color: 'from-blue-100 to-blue-50' },
    { label: 'Pending Payments', value: '₹1,20,000', trend: '-5%', color: 'from-amber-100 to-amber-50' },
    { label: 'Total Transactions', value: '27', trend: '+15%', color: 'from-purple-100 to-purple-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
          <p className="text-gray-600">Track your revenue and payments</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-gray-200`}
          >
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUpRight className="h-4 w-4" />
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Earnings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Period</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Bookings</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Total Earned</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Commission</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earning, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">{earning.month}</td>
                  <td className="py-4 px-6 text-gray-900">{earning.bookings}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{earning.total}</td>
                  <td className="py-4 px-6 text-gray-600">10% (~₹25,000)</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                      {earning.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
