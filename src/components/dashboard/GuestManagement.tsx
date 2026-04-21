'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Edit2, Save, Trash2, Plus, Download, Share2 } from 'lucide-react';

interface GuestData {
  name: string;
  status: 'Confirmed' | 'Pending' | 'Declined';
  rsvpDate: string;
}

interface StatsData {
  totalGuests: number;
  invitesSent: number;
  rsvpReceived: number;
  pendingResponses: number;
}

const defaultGuestData: GuestData[] = [
  { name: 'Alice Green', status: 'Confirmed', rsvpDate: '12 Oct 2024' },
  { name: 'Bob Brown', status: 'Confirmed', rsvpDate: '12 Oct 2024' },
  { name: 'Ran Lillian', status: 'Confirmed', rsvpDate: '12 Oct 2024' },
  { name: 'Satin Carnah', status: 'Pending', rsvpDate: '-' },
  { name: 'Anna Green', status: 'Pending', rsvpDate: '-' },
  { name: 'Marta Stones', status: 'Pending', rsvpDate: '-' },
];

const defaultStats: StatsData = {
  totalGuests: 200,
  invitesSent: 150,
  rsvpReceived: 95,
  pendingResponses: 55,
};

export function GuestManagement() {
  const [guests, setGuests] = useState(defaultGuestData);
  const [stats, setStats] = useState(defaultStats);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<GuestData | null>(null);
  const [newGuest, setNewGuest] = useState<GuestData | null>(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('weddingGuests');
    if (saved) {
      try {
        setGuests(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load guests:', e);
      }
    }
  }, []);

  const handleSave = (id: number) => {
    if (editValues) {
      const updatedGuests = guests.map((g, idx) => (idx === id ? editValues : g));
      setGuests(updatedGuests);
      localStorage.setItem('weddingGuests', JSON.stringify(updatedGuests));
      setEditingId(null);
      setSaveStatus('✓ Guest updated!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleAddGuest = () => {
    if (newGuest && newGuest.name) {
      const updatedGuests = [...guests, newGuest];
      setGuests(updatedGuests);
      localStorage.setItem('weddingGuests', JSON.stringify(updatedGuests));
      setNewGuest(null);
      setSaveStatus('✓ Guest added!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDelete = (id: number) => {
    const updatedGuests = guests.filter((_, idx) => idx !== id);
    setGuests(updatedGuests);
    localStorage.setItem('weddingGuests', JSON.stringify(updatedGuests));
    setSaveStatus('✓ Guest removed!');
    setTimeout(() => setSaveStatus(''), 3000);
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
          <h2 className="text-3xl font-bold text-gray-900">Guest & Invitation Management</h2>
          <div className="text-right">
            {saveStatus && <p className="text-sm font-semibold text-green-600">{saveStatus}</p>}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Guests', value: stats.totalGuests, icon: '👥' },
            { label: 'Invites Sent', value: stats.invitesSent, icon: '✉️' },
            { label: 'RSVP Received', value: stats.rsvpReceived, icon: '✓' },
            { label: 'Pending Responses', value: stats.pendingResponses, icon: '⏳' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4"
              whileHover={{ y: -4 }}
            >
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Guest Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/40 border-b-2 border-gray-200">
                <th className="text-left p-4 font-bold text-gray-800">Name</th>
                <th className="text-left p-4 font-bold text-gray-800">Status</th>
                <th className="text-left p-4 font-bold text-gray-800">RSVP Date</th>
                <th className="text-left p-4 font-bold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-white/30">
                  <td className="p-4">
                    {editingId === idx ? (
                      <input
                        type="text"
                        value={editValues?.name || ''}
                        onChange={(e) => setEditValues({ ...editValues!, name: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{guest.name}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === idx ? (
                      <select
                        value={editValues?.status || guest.status}
                        onChange={(e) => setEditValues({ ...editValues!, status: e.target.value as any })}
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        <option>Confirmed</option>
                        <option>Pending</option>
                        <option>Declined</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          guest.status === 'Confirmed'
                            ? 'bg-green-200 text-green-800'
                            : guest.status === 'Pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {guest.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">{guest.rsvpDate}</td>
                  <td className="p-4 flex gap-2">
                    {editingId === idx ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleSave(idx)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 cursor-pointer"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-3 cursor-pointer"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingId(idx);
                            setEditValues(guest);
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(idx)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Guest */}
        <div className="backdrop-blur-sm bg-white/40 border border-white/40 rounded-2xl p-4 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Add New Guest</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Guest name"
              value={newGuest?.name || ''}
              onChange={(e) => setNewGuest({ ...newGuest || { status: 'Pending', rsvpDate: '-' }, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <select
              value={newGuest?.status || 'Pending'}
              onChange={(e) => setNewGuest({ ...newGuest || { name: '', rsvpDate: '-' }, status: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Declined</option>
            </select>
            <Button
              onClick={handleAddGuest}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Guest
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
