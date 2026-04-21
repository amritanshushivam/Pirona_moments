'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingDown, TrendingUp, Edit2, Save, X } from 'lucide-react';

interface BudgetData {
  totalBudget: number;
  spentAmount: number;
  breakdown: {
    venue: { budget: number; spent: number; percentage: number };
    catering: { budget: number; spent: number; percentage: number };
    decor: { budget: number; spent: number; percentage: number };
    dj: { budget: number; spent: number; percentage: number };
    photography: { budget: number; spent: number; percentage: number };
    other: { budget: number; spent: number; percentage: number };
  };
}

const defaultBudget: BudgetData = {
  totalBudget: 120000,
  spentAmount: 65800,
  breakdown: {
    venue: { budget: 30000, spent: 28000, percentage: 25 },
    catering: { budget: 24000, spent: 10800, percentage: 20 },
    decor: { budget: 18000, spent: 7350, percentage: 15 },
    dj: { budget: 12000, spent: 1750, percentage: 10 },
    photography: { budget: 12000, spent: 6500, percentage: 10 },
    other: { budget: 24000, spent: 11400, percentage: 20 },
  },
};

export function BudgetPlanner() {
  const [budget, setBudget] = useState(defaultBudget);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(defaultBudget);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('weddingBudget');
    if (saved) {
      try {
        setBudget(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load budget:', e);
      }
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('weddingBudget', JSON.stringify(editValues));
      setBudget(editValues);
      setIsEditing(false);
      setSaveStatus('✓ Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (e) {
      setSaveStatus('✗ Failed to save');
    }
  };

  const remainingAmount = budget.totalBudget - budget.spentAmount;
  const percentageUsed = (budget.spentAmount / budget.totalBudget) * 100;

  const categories = [
    { key: 'venue', label: 'Venue', icon: '🏛️', color: 'from-blue-400 to-blue-600' },
    { key: 'catering', label: 'Catering', icon: '🍴', color: 'from-orange-400 to-orange-600' },
    { key: 'decor', label: 'Decor', icon: '🎨', color: 'from-pink-400 to-pink-600' },
    { key: 'dj', label: 'DJ', icon: '🎵', color: 'from-purple-400 to-purple-600' },
    { key: 'photography', label: 'Photography', icon: '📷', color: 'from-cyan-400 to-cyan-600' },
    { key: 'other', label: 'Other', icon: '💰', color: 'from-gray-400 to-gray-600' },
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
          <motion.button
            className="p-2 hover:bg-white/50 rounded-lg transition-all"
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) setEditValues(budget);
            }}
            whileHover={{ scale: 1.1 }}
          >
            {isEditing ? <X className="h-6 w-6 text-gray-600" /> : <Edit2 className="h-6 w-6 text-gray-600" />}
          </motion.button>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6"
            whileHover={{ y: -4 }}
          >
            <DollarSign className="h-8 w-8 text-amber-600 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Total Budget</p>
            {isEditing ? (
              <input
                type="number"
                value={editValues.totalBudget}
                onChange={(e) => setEditValues({
                  ...editValues,
                  totalBudget: parseInt(e.target.value) || 0
                })}
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
            <TrendingDown className="h-8 w-8 text-red-600 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Spent Amount</p>
            <p className="text-3xl font-bold text-red-700">₹{budget.spentAmount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{percentageUsed.toFixed(1)}% Used</p>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6"
            whileHover={{ y: -4 }}
          >
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Remaining Amount</p>
            <p className="text-3xl font-bold text-green-700">₹{remainingAmount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{(100 - percentageUsed).toFixed(1)}% Left</p>
          </motion.div>
        </div>

        {/* Budget Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                    style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  ₹{data.spent.toLocaleString()} / ₹{data.budget.toLocaleString()}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          {isEditing && (
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          )}
          {saveStatus && (
            <p className="text-sm font-semibold text-green-600">{saveStatus}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
