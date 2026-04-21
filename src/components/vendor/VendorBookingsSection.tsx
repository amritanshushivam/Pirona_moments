'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Phone, Mail, CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function VendorBookingsSection() {
  const bookings = [
    { id: 1, event: 'Wedding Reception', client: 'Raj Kumar', date: 'May 15, 2026', time: '7:00 PM', status: 'Confirmed', service: 'Catering', amount: '₹50,000' },
    { id: 2, event: 'Sangeet Ceremony', client: 'Priya Singh', date: 'May 20, 2026', time: '6:00 PM', status: 'Pending Payment', service: 'Decoration', amount: '₹40,000' },
    { id: 3, event: 'Engagement Party', client: 'Amit Patel', date: 'May 25, 2026', time: '5:00 PM', status: 'In Progress', service: 'Catering', amount: '₹30,000' },
    { id: 4, event: 'Wedding Ceremony', client: 'Anushka Sharma', date: 'June 10, 2026', time: '8:00 PM', status: 'Completed', service: 'Entertainment', amount: '₹60,000' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-200 text-green-800';
      case 'Pending Payment':
        return 'bg-amber-200 text-amber-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return CheckCircle;
      case 'Pending Payment':
        return AlertCircle;
      case 'In Progress':
        return Clock;
      case 'Completed':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
        <p className="text-gray-600">Manage all your upcoming and past bookings</p>
      </div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Event</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Client</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.event}</p>
                        <p className="text-sm text-gray-500 mt-1">{booking.service}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{booking.client}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-900 font-medium">{booking.date}</p>
                          <p className="text-gray-500">{booking.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">{booking.amount}</td>
                    <td className="py-4 px-6">
                      <Button size="sm" className="gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Details
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
