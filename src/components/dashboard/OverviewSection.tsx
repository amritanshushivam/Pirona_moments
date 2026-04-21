'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Target, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function OverviewSection() {
  const router = useRouter();

  const summaryCards = [
    {
      icon: Calendar,
      label: 'My Events',
      value: '2',
      subtext: 'Active',
      color: 'from-amber-100 to-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      icon: CheckCircle,
      label: 'Bookings',
      value: '10',
      subtext: 'Confirmed',
      color: 'from-green-100 to-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Target,
      label: 'Budget Used',
      value: '60%',
      subtext: 'of total',
      color: 'from-orange-100 to-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: Heart,
      label: 'Invitations',
      value: '120',
      subtext: 'Sent',
      color: 'from-rose-100 to-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome back to your wedding planning! 💍
        </h1>
        <p className="text-gray-600 mb-6">
          You're 50% through your planning journey. Let's make your special day perfect!
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => router.push('/planner')}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
          >
            Continue Planning
          </Button>
          <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
            Ask Pirona AI ✨
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${card.color} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer`}
              >
                <Icon className={`h-6 w-6 ${card.iconColor} mb-3`} />
                <p className="text-sm font-medium text-gray-600 mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-500">{card.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Planning Progress</h2>
        <div className="space-y-4">
          {[
            { name: 'Venue', progress: 100 },
            { name: 'Catering', progress: 75 },
            { name: 'Decoration', progress: 50 },
            { name: 'DJ & Entertainment', progress: 30 },
            { name: 'Photography', progress: 20 },
            { name: 'Invitations', progress: 10 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900">{item.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
