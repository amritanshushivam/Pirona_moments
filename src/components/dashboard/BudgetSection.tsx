'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BudgetSection() {
  const budgetItems = [
    { category: 'Venue', allocated: 300000, spent: 300000, percentage: 100, color: 'from-blue-100 to-blue-50' },
    { category: 'Catering', allocated: 400000, spent: 240000, percentage: 60, color: 'from-green-100 to-green-50' },
    { category: 'Decoration', allocated: 150000, spent: 90000, percentage: 60, color: 'from-purple-100 to-purple-50' },
    { category: 'Photography', allocated: 100000, spent: 50000, percentage: 50, color: 'from-pink-100 to-pink-50' },
    { category: 'Entertainment', allocated: 80000, spent: 60000, percentage: 75, color: 'from-yellow-100 to-yellow-50' },
    { category: 'Invitations', allocated: 30000, spent: 15000, percentage: 50, color: 'from-rose-100 to-rose-50' },
    { category: 'Makeup & Hair', allocated: 50000, spent: 25000, percentage: 50, color: 'from-indigo-100 to-indigo-50' },
    { category: 'Miscellaneous', allocated: 40000, spent: 20000, percentage: 50, color: 'from-gray-100 to-gray-50' },
  ];

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Planner</h1>
          <p className="text-gray-600">Track your wedding expenses and budget allocation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Budget Item
          </Button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Total Budget</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{(totalAllocated / 100000).toFixed(1)}L</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-100 to-red-50 rounded-2xl p-6 border border-red-200"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Total Spent</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{(totalSpent / 100000).toFixed(1)}L</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-6 border border-green-200"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-green-600">Remaining</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{(totalRemaining / 100000).toFixed(1)}L</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-6 border border-amber-200"
        >
          <div className="flex items-center justify-between mb-2">
            <PieChart className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-600">Spent %</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{((totalSpent / totalAllocated) * 100).toFixed(0)}%</p>
        </motion.div>
      </div>

      {/* Budget Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown</h2>
        <div className="space-y-6">
          {budgetItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{item.category}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.spent.toLocaleString()} of ₹{item.allocated.toLocaleString()}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.percentage}% spent</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 + 0.3 }}
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Budget Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Allocated</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Spent</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Remaining</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{item.category}</td>
                  <td className="py-4 px-4 text-right text-gray-700">₹{item.allocated.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right text-gray-700">₹{item.spent.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">
                    ₹{(item.allocated - item.spent).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.percentage === 100
                        ? 'bg-green-200 text-green-800'
                        : item.percentage >= 75
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-blue-200 text-blue-800'
                    }`}>
                      {item.percentage === 100 ? 'Spent' : 'On Track'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                <td className="py-4 px-4 text-gray-900">Total</td>
                <td className="py-4 px-4 text-right text-gray-900">₹{totalAllocated.toLocaleString()}</td>
                <td className="py-4 px-4 text-right text-gray-900">₹{totalSpent.toLocaleString()}</td>
                <td className="py-4 px-4 text-right text-gray-900">₹{totalRemaining.toLocaleString()}</td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                    {((totalSpent / totalAllocated) * 100).toFixed(0)}% Used
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
