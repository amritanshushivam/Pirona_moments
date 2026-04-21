'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Bell, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EventsSection() {
  const events = [
    {
      id: 1,
      name: 'Main Wedding Ceremony',
      date: 'December 25, 2024',
      time: '8:00 PM',
      location: 'The Grand Palace, Delhi',
      guests: 500,
      status: 'Confirmed',
      color: 'from-rose-100 to-pink-100',
    },
    {
      id: 2,
      name: 'Sangeet Performance',
      date: 'December 23, 2024',
      time: '7:00 PM',
      location: 'Taj Banquet Hall, Delhi',
      guests: 300,
      status: 'Confirmed',
      color: 'from-purple-100 to-pink-100',
    },
    {
      id: 3,
      name: 'Wedding Reception',
      date: 'December 26, 2024',
      time: '7:00 PM',
      location: 'Burg Carlton, Delhi',
      guests: 600,
      status: 'Planning',
      color: 'from-amber-100 to-orange-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events & Timeline</h1>
          <p className="text-gray-600">Manage all your wedding events in one place</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Calendar Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-rose-600" />
          Timeline Overview
        </h2>
        <div className="space-y-3">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-r ${event.color} rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'Confirmed'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-amber-200 text-amber-800'
                }`}>
                  {event.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="h-4 w-4" />
                  {event.guests} guests
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-gray-700">
                  <Edit2 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-gray-700">
                  <Bell className="h-3 w-3 mr-1" />
                  Reminders
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Planning Timeline</h2>
        <div className="relative space-y-4">
          {[
            { month: '12 Feb 2024', task: 'Book Venue', completed: true },
            { month: '15 Feb 2024', task: 'Select Catering', completed: true },
            { month: '20 Feb 2024', task: 'Photography Selection', completed: true },
            { month: '01 Mar 2024', task: 'Design Invitations', completed: false },
            { month: '10 Mar 2024', task: 'Send Invitations', completed: false },
            { month: '20 Dec 2024', task: 'Wedding Day', completed: false },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`h-4 w-4 rounded-full ${
                  item.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                {idx < 5 && <div className="h-12 w-0.5 bg-gray-200 mt-2" />}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-xs font-semibold text-gray-500 uppercase">{item.month}</p>
                <p className={`text-sm font-medium ${
                  item.completed ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {item.task}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
