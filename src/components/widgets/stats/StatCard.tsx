import { motion } from 'framer-motion';
import React from 'react';

interface StatCardProps {
  icon?: string | React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
}

export function StatCard({ icon, label, value, subtext, color = 'from-amber-100 to-amber-50', trend, onClick }: StatCardProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-gradient-to-br ${color} border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      {typeof icon === 'string' ? <p className="text-2xl mb-3">{icon}</p> : <div className="mb-3">{icon}</div>}
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span className={`text-xs font-bold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
    </motion.div>
  );
}

interface StatGridProps {
  stats: StatCardProps[];
  columns?: number;
}

export function StatGrid({ stats, columns = 4 }: StatGridProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
  }[columns] || 'md:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
