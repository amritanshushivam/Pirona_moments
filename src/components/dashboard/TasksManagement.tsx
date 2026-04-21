'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProgressBarWidget } from '@/components/widgets';
import { Edit2, Trash2, Plus } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  progress: number;
}

const defaultTasks: Task[] = [
  { id: '1', name: 'Confirm Final Guest List', dueDate: '15-Mar-2026', urgency: 'HIGH', progress: 70 },
  { id: '2', name: 'Finalize Menu Options', dueDate: '05-Apr-2026', urgency: 'MEDIUM', progress: 90 },
  { id: '3', name: 'Review DJ Playlist', dueDate: '20-Apr-2026', urgency: 'LOW', progress: 40 },
  { id: '4', name: 'Book Makeup Artist', dueDate: '10-May-2026', urgency: 'MEDIUM', progress: 100 },
];

export function TasksManagement() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Task | null>(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('weddingTasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load tasks:', e);
      }
    }
  }, []);

  const handleSave = () => {
    if (editValues && editingId) {
      const updatedTasks = tasks.map(t => (t.id === editingId ? editValues : t));
      setTasks(updatedTasks);
      localStorage.setItem('weddingTasks', JSON.stringify(updatedTasks));
      setEditingId(null);
      setSaveStatus('✓ Task updated!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('weddingTasks', JSON.stringify(updatedTasks));
    setSaveStatus('✓ Task removed!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const urgencyColors = {
    HIGH: 'bg-red-600 text-white',
    MEDIUM: 'bg-amber-600 text-white',
    LOW: 'bg-green-600 text-white',
  };

  const progressColors = {
    HIGH: 'from-red-500 to-red-600',
    MEDIUM: 'from-amber-500 to-amber-600',
    LOW: 'from-green-500 to-green-600',
  };

  return (
    <motion.div
      className="backdrop-blur-md bg-gradient-to-br from-white/70 to-orange-50/40 border border-white/60 rounded-3xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Tasks & Progress Management</h2>
          <div className="text-right">
            {saveStatus && <p className="text-sm font-semibold text-green-600">{saveStatus}</p>}
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 flex items-start justify-between gap-4"
              whileHover={{ x: 4 }}
            >
              {editingId === task.id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editValues?.name || ''}
                    onChange={(e) => setEditValues({ ...editValues!, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Task name"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValues?.dueDate || ''}
                      onChange={(e) => setEditValues({ ...editValues!, dueDate: e.target.value })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Due date"
                    />
                    <select
                      value={editValues?.urgency || 'MEDIUM'}
                      onChange={(e) => setEditValues({ ...editValues!, urgency: e.target.value as any })}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option>HIGH</option>
                      <option>MEDIUM</option>
                      <option>LOW</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editValues?.progress || 0}
                    onChange={(e) => setEditValues({ ...editValues!, progress: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Progress %"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold cursor-pointer rounded"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold cursor-pointer rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{task.name}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${urgencyColors[task.urgency]}`}>{task.urgency}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">📅 {task.dueDate}</p>
                    <ProgressBarWidget label={`Progress: ${task.progress}%`} value={task.progress} color={progressColors[task.urgency]} />
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingId(task.id);
                        setEditValues(task);
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 cursor-pointer rounded flex items-center gap-1"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 cursor-pointer rounded flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 mx-auto">
            <Plus className="h-4 w-4" /> Add New Task
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
