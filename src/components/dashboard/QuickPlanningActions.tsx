'use client';

import { motion } from 'framer-motion';
import { ActionGrid } from '@/components/widgets';

const quickActions = [
  { icon: '✉️', label: 'Create Invitations', description: 'Design custom invitations' },
  { icon: '🏢', label: 'Browse Vendors', description: 'Find wedding vendors' },
  { icon: '👥', label: 'Add Guests', description: 'Manage guest list' },
  { icon: '💰', label: 'Track Budget', description: 'Monitor spending' },
  { icon: '📦', label: 'Compare Packages', description: 'View package options' },
  { icon: '🏰', label: 'Book Venue', description: 'Reserve your venue' },
  { icon: '🤖', label: 'Ask Pirona AI', description: 'Get AI suggestions' },
  { icon: '🔔', label: 'Support Ticket', description: 'Get help & support' },
];

const colorMap = [
  'from-pink-400 to-rose-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-blue-400 to-cyan-500',
  'from-indigo-400 to-purple-500',
  'from-cyan-400 to-blue-500',
  'from-red-400 to-pink-500'
];

export function QuickPlanningActions() {
  const actions = quickActions.map((action, idx) => ({
    ...action,
    color: colorMap[idx],
    onClick: () => alert(`${action.label} feature coming soon!`),
  }));

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Planning Actions</h2>
      <ActionGrid actions={actions} columns={4} />
    </motion.div>
  );
}
