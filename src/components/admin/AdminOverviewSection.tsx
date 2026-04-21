'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Activity, Calendar } from 'lucide-react';

export function AdminOverviewSection() {
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      change: '+12%',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Activity,
      label: 'Active Vendors',
      value: '89',
      change: '+5%',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: '567',
      change: '+23%',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      icon: TrendingUp,
      label: 'Revenue',
      value: '₹45.6L',
      change: '+18%',
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">System performance and key metrics</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-300">
                      {stat.label}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className={`text-xs mt-2 ${stat.color}`}>{stat.change} from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: 'New user registration', time: '2 hours ago', type: 'user' },
                { event: 'Vendor joined platform', time: '4 hours ago', type: 'vendor' },
                { event: 'New booking created', time: '6 hours ago', type: 'booking' },
                { event: 'Payment received', time: '1 day ago', type: 'payment' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-700 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{activity.event}</p>
                  </div>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
