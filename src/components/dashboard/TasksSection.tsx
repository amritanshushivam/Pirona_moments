'use client';

import { motion } from 'framer-motion';
import { CheckSquare, Plus, Trash2, Calendar, Flag, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export function TasksSection() {
  const tasks = [
    {
      id: 1,
      title: 'Finalize venue details',
      priority: 'High',
      dueDate: 'Dec 10, 2024',
      category: 'Venue',
      completed: true,
      subtasks: [
        { id: 1, title: 'Confirm guest capacity', completed: true },
        { id: 2, title: 'Update decoration plan', completed: true },
        { id: 3, title: 'Arrange parking', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Create final catering menu',
      priority: 'High',
      dueDate: 'Dec 12, 2024',
      category: 'Catering',
      completed: false,
      subtasks: [
        { id: 1, title: 'Select appetizers', completed: true },
        { id: 2, title: 'Choose main course', completed: false },
        { id: 3, title: 'Pick desserts', completed: false },
        { id: 4, title: 'Approve with caterer', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Confirm photographer schedule',
      priority: 'Medium',
      dueDate: 'Dec 14, 2024',
      category: 'Photography',
      completed: false,
      subtasks: [
        { id: 1, title: 'Send photographer shot list', completed: false },
        { id: 2, title: 'Arrange pre-wedding shoot', completed: false },
        { id: 3, title: 'Discuss video package', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Send remaining invitations',
      priority: 'High',
      dueDate: 'Dec 8, 2024',
      category: 'Invitations',
      completed: false,
      subtasks: [
        { id: 1, title: 'Print remaining cards', completed: false },
        { id: 2, title: 'Address envelopes', completed: false },
        { id: 3, title: 'Mail out', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Confirm all vendor arrivals',
      priority: 'Medium',
      dueDate: 'Dec 20, 2024',
      category: 'Vendors',
      completed: false,
      subtasks: [
        { id: 1, title: 'Contact catering', completed: false },
        { id: 2, title: 'Confirm DJ', completed: false },
        { id: 3, title: 'Check with decorator', completed: false },
        { id: 4, title: 'Verify photographer', completed: false },
      ],
    },
    {
      id: 6,
      title: 'Plan honeymoon',
      priority: 'Low',
      dueDate: 'Dec 25, 2024',
      category: 'Personal',
      completed: false,
      subtasks: [
        { id: 1, title: 'Book flights', completed: false },
        { id: 2, title: 'Reserve hotel', completed: false },
        { id: 3, title: 'Plan activities', completed: false },
      ],
    },
  ];

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getTaskStats();

  const priorityColor: Record<string, string> = {
    'High': 'text-red-600 bg-red-100',
    'Medium': 'text-amber-600 bg-amber-100',
    'Low': 'text-blue-600 bg-blue-100',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks & Timeline</h1>
          <p className="text-gray-600">Track all wedding planning tasks and deadlines</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border border-green-200"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-6 border border-amber-200"
        >
          <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
          <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-900">Overall Progress</h3>
          <span className="text-lg font-bold text-gray-900">{((stats.completed / stats.total) * 100).toFixed(0)}%</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{stats.completed} of {stats.total} tasks completed</p>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-rose-600" />
          Your Tasks
        </h2>

        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all ${
              task.completed ? 'bg-gray-50' : ''
            }`}
          >
            {/* Task Header */}
            <div className="flex items-start gap-4 mb-4">
              <Checkbox checked={task.completed} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-bold ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>

                {/* Task Meta */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flag className="h-4 w-4" />
                    {task.category}
                  </div>
                </div>

                {/* Subtasks */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Subtasks</p>
                    <div className="space-y-2">
                      {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center gap-2 text-sm">
                          <Checkbox checked={subtask.completed} />
                          <span className={subtask.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Repeat2 className="h-3 w-3 mr-1" />
                    Set Reminder
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Task Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tasks by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Venue', count: 3, icon: '🏛️' },
            { name: 'Catering', count: 4, icon: '🍽️' },
            { name: 'Photography', count: 3, icon: '📸' },
            { name: 'Invitations', count: 3, icon: '💌' },
            { name: 'Vendors', count: 4, icon: '👥' },
            { name: 'Personal', count: 3, icon: '💕' },
            { name: 'Decoration', count: 2, icon: '🌸' },
            { name: 'Timeline', count: 2, icon: '📅' },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200 text-center hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.count} tasks</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
