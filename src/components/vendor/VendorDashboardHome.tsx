'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, CheckCircle, IndianRupee, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const paymentStatusData = [
  { name: 'Paid', value: 60 },
  { name: 'Pending', value: 35 },
  { name: 'Processing', value: 5 },
];

const COLORS = ['#FDB462', '#FB8072', '#BEBADA'];

export function VendorDashboardHome() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-foreground mt-2">142</p>
                <p className="text-green-600 text-sm mt-2">+12% vs last month</p>
              </div>
              <Calendar className="w-10 h-10 text-primary/30" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Upcoming Events</p>
                <p className="text-3xl font-bold text-foreground mt-2">8</p>
                <p className="text-sm text-muted-foreground mt-2">Next: 15 June 2024</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-300" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Verification Status</p>
                <p className="text-green-600 font-bold mt-2">Verified</p>
                <p className="text-sm text-muted-foreground mt-2">90% Complete</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground mt-2">₹4.5L</p>
                <p className="text-green-600 text-sm mt-2">+₹30K this week</p>
              </div>
              <IndianRupee className="w-10 h-10 text-yellow-500/30" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Monthly Earnings Line Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line type="monotone" dataKey="earnings" stroke="#d97706" strokeWidth={2} dot={{ fill: '#d97706' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Payment Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Payment Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={paymentStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Booking Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Booking Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#d97706" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
