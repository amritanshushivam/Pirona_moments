'use client';

import { motion } from 'framer-motion';
import { Users, Plus, Search, Mail, Phone, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GuestsSection() {
  const guests = [
    { id: 1, name: 'Raj Kumar', category: 'Groom Side', email: 'raj@email.com', phone: '+91 98765 43210', rsvp: 'Confirmed' },
    { id: 2, name: 'Priya Singh', category: 'Bride Side', email: 'priya@email.com', phone: '+91 87654 32109', rsvp: 'Confirmed' },
    { id: 3, name: 'Amit Patel', category: 'Groom Side', email: 'amit@email.com', phone: '+91 76543 21098', rsvp: 'Pending' },
    { id: 4, name: 'Anushka Sharma', category: 'Bride Side', email: 'anushka@email.com', phone: '+91 65432 10987', rsvp: 'Declined' },
    { id: 5, name: 'Vikram Desai', category: 'Groom Side', email: 'vikram@email.com', phone: '+91 54321 09876', rsvp: 'Confirmed' },
    { id: 6, name: 'Neha Reddy', category: 'Bride Side', email: 'neha@email.com', phone: '+91 43210 98765', rsvp: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Guest Management</h1>
        <p className="text-gray-600">Manage your guest list and RSVP status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Guests', value: '500', color: 'from-blue-100 to-blue-50' },
          { label: 'Confirmed', value: '420', color: 'from-green-100 to-green-50' },
          { label: 'Pending', value: '60', color: 'from-amber-100 to-amber-50' },
          { label: 'Declined', value: '20', color: 'from-red-100 to-red-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 border border-gray-200`}
          >
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search guests..."
                className="pl-10 border-gray-300"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </div>
        </div>

        {/* Guest Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">RSVP</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, idx) => (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">{guest.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {guest.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {guest.email}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {guest.phone}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guest.rsvp === 'Confirmed'
                        ? 'bg-green-200 text-green-800'
                        : guest.rsvp === 'Pending'
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-red-200 text-red-800'
                    }`}>
                      {guest.rsvp}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
