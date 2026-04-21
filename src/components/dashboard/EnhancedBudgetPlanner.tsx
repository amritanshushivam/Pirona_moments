'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Edit2, Save } from 'lucide-react';

interface EnhancedBudgetData {
  totalBudget: number;
  spentAmount: number;
  breakdown: {
    venue: { budget: number; spent: number };
    catering: { budget: number; spent: number };
    decor: { budget: number; spent: number };
    dj: { budget: number; spent: number };
    photography: { budget: number; spent: number };
    other: { budget: number; spent: number };
  };
}

const defaultBudget: EnhancedBudgetData = {
  totalBudget: 120000,
  spentAmount: 65800,
  breakdown: {
    venue: { budget: 30000, spent: 28000 },
    catering: { budget: 24000, spent: 10800 },
    decor: { budget: 18000, spent: 7350 },
    dj: { budget: 12000, spent: 1750 },
    photography: { budget: 12000, spent: 6500 },
    other: { budget: 24000, spent: 11400 },
  },
};

export function EnhancedBudgetPlanner() {
  const [budget, setBudget] = useState(defaultBudget);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(defaultBudget);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('enhancedBudget');
    if (saved) {
      try {
        setBudget(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load budget:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('enhancedBudget', JSON.stringify(editValues));
    setBudget(editValues);
    setIsEditing(false);
    setSaveStatus('✓ Budget saved!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const remainingAmount = budget.totalBudget - budget.spentAmount;
  const percentageUsed = (budget.spentAmount / budget.totalBudget) * 100;

  const pieData = [
    { name: 'Venue', value: 25 },
    { name: 'Catering', value: 20 },
    { name: 'Decor', value: 15 },
    { name: 'DJ', value: 10 },
    { name: 'Photography', value: 10 },
    { name: 'Other', value: 20 },
  ];

  const colors = ['#8B4513', '#C85A54', '#D4A574', '#C9AE7D', '#B8860B', '#D2B48C'];

  const categories = [
    { key: 'venue', label: 'Venue', icon: '🏛️', color: '#8B4513' },
    { key: 'catering', label: 'Catering', icon: '🍴', color: '#C85A54' },
    { key: 'decor', label: 'Decor', icon: '🎨', color: '#D4A574' },
    { key: 'dj', label: 'DJ', icon: '🎵', color: '#C9AE7D' },
    { key: 'photography', label: 'Photography', icon: '📷', color: '#B8860B' },
    { key: 'other', label: 'Other', icon: '💰', color: '#D2B48C' },
  ] as const;

  return (
    <motion.div
      className="backdrop-blur-md bg-gradient-to-br from-white/70 to-orange-50/40 border border-white/60 rounded-3xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Pirona Budget Planner</h2>
          <Button
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) setEditValues(budget);
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            {isEditing ? 'Cancel' : <Edit2 className="h-4 w-4" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Top Cards */}
          <div className="space-y-4">
            <motion.div
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6"
              whileHover={{ y: -4 }}
            >
              <p className="text-sm text-gray-600 mb-2">Total Budget</p>
              {isEditing ? (
                <input
                  type="number"
                  value={editValues.totalBudget}
                  onChange={(e) => setEditValues({ ...editValues, totalBudget: parseInt(e.target.value) || 0 })}
                  className="text-2xl font-bold w-full px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-3xl font-bold text-amber-700">₹{budget.totalBudget.toLocaleString()}</p>
              )}
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6"
              whileHover={{ y: -4 }}
            >
              <p className="text-sm text-gray-600 mb-2">Spent Amount</p>
              <p className="text-3xl font-bold text-red-700">₹{budget.spentAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{percentageUsed.toFixed(1)}% Used</p>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6"
              whileHover={{ y: -4 }}
            >
              <p className="text-sm text-gray-600 mb-2">Remaining Amount</p>
              <p className="text-3xl font-bold text-green-700">₹{remainingAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{(100 - percentageUsed).toFixed(1)}% Left</p>
            </motion.div>
          </div>

          {/* Middle: Pie Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">₹{budget.totalBudget.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Legend */}
          <div className="space-y-2">
            {categories.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map(({ key, label, icon, color }) => {
            const data = budget.breakdown[key];
            const percentageSpent = (data.spent / data.budget) * 100;
            return (
              <motion.div
                key={key}
                className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <p className="font-semibold text-gray-800">{label}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-600">{percentageSpent.toFixed(0)}%</p>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(percentageSpent, 100)}%`, backgroundColor: color }} />
                </div>
                <p className="text-xs text-gray-600">
                  ₹{data.spent.toLocaleString()} / ₹{data.budget.toLocaleString()}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" /> Save Budget
            </Button>
            {saveStatus && <p className="text-sm font-semibold text-green-600 self-center">{saveStatus}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
