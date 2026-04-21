import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ActionButtonProps {
  icon: string | React.ReactNode;
  label: string;
  description?: string;
  color?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function ActionButton({ icon, label, description, color = 'from-blue-400 to-blue-600', onClick, size = 'medium' }: ActionButtonProps) {
  const sizeClass = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  }[size];

  return (
    <motion.button
      className={`backdrop-blur-sm bg-gradient-to-br ${color} text-white rounded-2xl ${sizeClass} text-center hover:shadow-2xl transition-all group cursor-pointer border border-white/20`}
      whileHover={{ y: -8, scale: 1.05 }}
      onClick={onClick}
    >
      <div className={`${size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-4xl' : 'text-5xl'} mb-2 group-hover:scale-125 transition-transform`}>
        {typeof icon === 'string' ? icon : icon}
      </div>
      <p className={`font-bold ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{label}</p>
      {description && <p className={`${size === 'small' ? 'text-xs' : 'text-xs opacity-90'}`}>{description}</p>}
    </motion.button>
  );
}

interface ActionGridProps {
  actions: ActionButtonProps[];
  columns?: number;
}

export function ActionGrid({ actions, columns = 4 }: ActionGridProps) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-6',
    8: 'md:grid-cols-8',
  }[columns] || 'md:grid-cols-4';

  return (
    <div className={`grid grid-cols-2 ${gridClass} gap-4`}>
      {actions.map((action, idx) => (
        <ActionButton key={idx} {...action} />
      ))}
    </div>
  );
}
