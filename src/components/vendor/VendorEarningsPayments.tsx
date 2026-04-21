'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Download, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 40000 },
  { month: 'Feb', earnings: 65000 },
  { month: 'Mar', earnings: 55000 },
  { month: 'Apr', earnings: 90000 },
  { month: 'May', earnings: 75000 },
  { month: 'Jun', earnings: 120000 },
];

const bookingTrendData = [
  { month: 'Jan', bookings: 25 },
  { month: 'Feb', bookings: 30 },
  { month: 'Mar', bookings: 16 },
  { month: 'Apr', bookings: 22 },
  { month: 'May', bookings: 29 },
  { month: 'Jun', bookings: 13 },
];

const payoutHistory = [
  { date: '30 Jun 2024', amount: '₹2,30,000', method: 'NEFT', status: 'Paid' },
  { date: '27 Jun 2024', amount: '₹2,15,000', method: 'NEFT', status: 'Paid' },
  { date: '20 Jun 2024', amount: '₹1,60,000', method: 'NEFT', status: 'Paid' },
  { date: '16 Jun 2024', amount: '₹1,75,000', method: 'NEFT', status: 'Pending' },
  { date: '15 Jun 2024', amount: '₹2,75,000', method: 'NEFT', status: 'Practical' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Practical':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function VendorEarningsPayments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">Earnings & Payments</h2>
          <p className="text-muted-foreground">Track your income and payouts</p>
        </div>
        <Button className="gap-2" variant="default">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* This Month Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">This Month Earnings</p>
                <p className="text-4xl font-bold text-foreground mt-3">₹2.15 Lakhs</p>
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +8.2% vs. last month
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pending Payout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending Payout</p>
                <p className="text-4xl font-bold text-foreground mt-3">₹75,000</p>
                <p className="text-muted-foreground text-sm mt-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Next payout: 15 Jun 2024
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Monthly Earnings Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => {
                  const numValue = Number(value) || 0;
                  return `₹${(numValue / 1000).toFixed(0)}K`;
                }} />
                <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Booking Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Booking Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Recent Payouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Recent Payouts</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Method</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((payout, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm">{payout.date}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{payout.amount}</td>
                    <td className="py-3 px-4 text-sm">{payout.method}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(payout.status)}>
                        {payout.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
