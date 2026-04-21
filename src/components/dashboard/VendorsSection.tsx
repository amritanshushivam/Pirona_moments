'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Star, Phone, Mail, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function VendorsSection() {
  const vendors = [
    {
      id: 1,
      name: 'Taste of India Catering',
      category: 'Catering',
      location: 'New Delhi',
      rating: 4.8,
      reviews: 156,
      price: '₹800/plate',
      status: 'Booked',
      contact: '+91 98765 43210',
      email: 'contact@tasteofindia.com',
      image: '🍽️',
    },
    {
      id: 2,
      name: 'Floral Dreams',
      category: 'Decoration',
      location: 'Delhi NCR',
      rating: 4.9,
      reviews: 203,
      price: '₹50k onwards',
      status: 'Booked',
      contact: '+91 87654 32109',
      email: 'info@floraldreams.com',
      image: '🌸',
    },
    {
      id: 3,
      name: 'Golden Frame Photography',
      category: 'Photography',
      location: 'New Delhi',
      rating: 4.7,
      reviews: 89,
      price: '₹1L onwards',
      status: 'Pending',
      contact: '+91 76543 21098',
      email: 'bookings@goldenframe.com',
      image: '📸',
    },
    {
      id: 4,
      name: 'DJ Beats Studio',
      category: 'Entertainment',
      location: 'Gurgaon',
      rating: 4.6,
      reviews: 120,
      price: '₹30k onwards',
      status: 'Available',
      contact: '+91 65432 10987',
      email: 'contact@djbeats.com',
      image: '🎵',
    },
    {
      id: 5,
      name: 'Elegance Venue',
      category: 'Venue',
      location: 'Delhi',
      rating: 4.9,
      reviews: 342,
      price: '₹3L onwards',
      status: 'Booked',
      contact: '+91 54321 09876',
      email: 'info@elegancevenue.com',
      image: '🏛️',
    },
    {
      id: 6,
      name: 'Bridal Bliss Makeup',
      category: 'Makeup Artist',
      location: 'New Delhi',
      rating: 4.8,
      reviews: 267,
      price: '₹10k onwards',
      status: 'Booked',
      contact: '+91 43210 98765',
      email: 'book@bridal-bliss.com',
      image: '💄',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendors & Bookings</h1>
          <p className="text-gray-600">Manage all your vendors and service bookings</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor, idx) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 flex items-center justify-between">
              <div className="text-4xl">{vendor.image}</div>
              <Badge className={`${
                vendor.status === 'Booked'
                  ? 'bg-green-200 text-green-800'
                  : vendor.status === 'Pending'
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-blue-200 text-blue-800'
              }`}>
                {vendor.status}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{vendor.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{vendor.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{vendor.rating}</span>
                <span className="text-sm text-gray-600">({vendor.reviews} reviews)</span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {vendor.location}
                </div>
                <div className="text-gray-700 font-semibold">{vendor.price}</div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-3 space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-3 w-3" />
                  {vendor.contact}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3" />
                  {vendor.email}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {vendor.status !== 'Booked' && (
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                    <Check className="h-3 w-3 mr-1" />
                    Book
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit2 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vendor Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-rose-600" />
          Vendor Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Catering', count: 1, icon: '🍽️' },
            { name: 'Decoration', count: 1, icon: '🌸' },
            { name: 'Photography', count: 1, icon: '📸' },
            { name: 'Entertainment', count: 1, icon: '🎵' },
            { name: 'Venue', count: 1, icon: '🏛️' },
            { name: 'Makeup', count: 1, icon: '💄' },
            { name: 'Florist', count: 0, icon: '🌿' },
            { name: 'Invitations', count: 0, icon: '💌' },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200 hover:shadow-md transition-all cursor-pointer text-center"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="font-bold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.count} booked</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
