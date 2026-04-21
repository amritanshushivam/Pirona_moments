'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Music, Heart, Building2, Camera, Edit2, Save, Trash2 } from 'lucide-react';

interface Booking {
  id: string;
  type: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'CONFIRMED' | 'IN_DISCUSSION' | 'PENDING';
  notes?: string;
}

const defaultBookings: Booking[] = [
  {
    id: '1',
    type: 'Catering',
    vendor: 'Perfect Bites Catering',
    amount: 12000,
    date: '12-Nov-2026',
    status: 'CONFIRMED',
    notes: 'Pure veg menu confirmed'
  },
  {
    id: '2',
    type: 'DJ',
    vendor: 'Rhythm Masters DJ',
    amount: 3500,
    date: '15-Oct-2026',
    status: 'IN_DISCUSSION',
    notes: ''
  },
  {
    id: '3',
    type: 'Decoration',
    vendor: 'Ornate Petals Decor',
    amount: 9800,
    date: '05-Oct-2026',
    status: 'PENDING',
    notes: ''
  },
  {
    id: '4',
    type: 'Venue',
    vendor: 'Marquise Grand Ballroom',
    amount: 28000,
    date: '01-Sep-2026',
    status: 'CONFIRMED',
    notes: 'Capacity: 500 guests'
  },
  {
    id: '5',
    type: 'Photography',
    vendor: 'Captured Moments Photography',
    amount: 6500,
    date: '20-Sep-2026',
    status: 'CONFIRMED',
    notes: 'Full day coverage'
  },
];

const typeIcons: Record<string, any> = {
  'Catering': UtensilsCrossed,
  'DJ': Music,
  'Decoration': Heart,
  'Venue': Building2,
  'Photography': Camera,
};

const typeColors: Record<string, string> = {
  'Catering': 'from-orange-400 to-orange-600',
  'DJ': 'from-purple-400 to-purple-600',
  'Decoration': 'from-pink-400 to-pink-600',
  'Venue': 'from-blue-400 to-blue-600',
  'Photography': 'from-cyan-400 to-cyan-600',
};

export function BookingsManagement() {
  const [bookings, setBookings] = useState(defaultBookings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Booking>>({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('weddingBookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load bookings:', e);
      }
    }
  }, []);

  const handleSave = () => {
    if (editingId) {
      const updatedBookings = bookings.map(b => 
        b.id === editingId ? { ...b, ...editValues } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('weddingBookings', JSON.stringify(updatedBookings));
      setEditingId(null);
      setSaveStatus('✓ Booking updated!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDelete = (id: string) => {
    const updatedBookings = bookings.filter(b => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem('weddingBookings', JSON.stringify(updatedBookings));
    setSaveStatus('✓ Booking deleted!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const statusColors: Record<string, string> = {
    'CONFIRMED': 'bg-green-600 hover:bg-green-700',
    'IN_DISCUSSION': 'bg-amber-600 hover:bg-amber-700',
    'PENDING': 'bg-orange-600 hover:bg-orange-700',
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
          <h2 className="text-3xl font-bold text-gray-900">Bookings Management</h2>
          <div className="text-right">
            {saveStatus && <p className="text-sm font-semibold text-green-600">{saveStatus}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const Icon = typeIcons[booking.type] || UtensilsCrossed;
            const isEditing = editingId === booking.id;

            return (
              <motion.div
                key={booking.id}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white border border-gray-100"
                whileHover={{ y: -8 }}
              >
                {/* Icon Section */}
                <div className={`relative h-16 bg-gradient-to-br ${typeColors[booking.type] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editValues.vendor || booking.vendor}
                        onChange={(e) => setEditValues({ ...editValues, vendor: e.target.value })}
                        className="w-full px-3 py-1 mb-2 border border-gray-300 rounded text-sm"
                        placeholder="Vendor name"
                      />
                      <input
                        type="number"
                        value={editValues.amount || booking.amount}
                        onChange={(e) => setEditValues({ ...editValues, amount: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-1 mb-2 border border-gray-300 rounded text-sm"
                        placeholder="Amount"
                      />
                      <input
                        type="text"
                        value={editValues.date || booking.date}
                        onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
                        className="w-full px-3 py-1 mb-2 border border-gray-300 rounded text-sm"
                        placeholder="Date"
                      />
                      <textarea
                        value={editValues.notes || booking.notes || ''}
                        onChange={(e) => setEditValues({ ...editValues, notes: e.target.value })}
                        className="w-full px-3 py-1 mb-3 border border-gray-300 rounded text-sm"
                        placeholder="Notes"
                        rows={2}
                      />
                      <select
                        value={editValues.status || booking.status}
                        onChange={(e) => setEditValues({ ...editValues, status: e.target.value as any })}
                        className="w-full px-3 py-1 mb-3 border border-gray-300 rounded text-sm"
                      >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="IN_DISCUSSION">In Discussion</option>
                        <option value="PENDING">Pending</option>
                      </select>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold cursor-pointer rounded flex items-center justify-center gap-1"
                        >
                          <Save className="h-3 w-3" /> Save
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold cursor-pointer rounded"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-gray-900 text-sm mb-1">{booking.type}</p>
                      <p className="text-xs text-gray-600 line-clamp-1 mb-3">{booking.vendor}</p>
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <p className="font-bold text-gray-800">₹{booking.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">📅 {booking.date}</p>
                        {booking.notes && <p className="text-xs text-gray-500 mt-1">{booking.notes}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className={`flex-1 text-xs font-bold cursor-pointer rounded text-white transition-all ${statusColors[booking.status]}`}
                          onClick={()=>{}}
                        >
                          {booking.status.replace('_', ' ')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs font-bold cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-100 rounded flex items-center justify-center gap-1"
                          onClick={() => {
                            setEditingId(booking.id);
                            setEditValues(booking);
                          }}
                        >
                          <Edit2 className="h-3 w-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-bold cursor-pointer border border-red-300 text-red-700 hover:bg-red-50 rounded"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
