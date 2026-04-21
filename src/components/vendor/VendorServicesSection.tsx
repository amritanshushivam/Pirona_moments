'use client';

import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function VendorServicesSection() {
  const services = [
    { id: 1, name: 'Catering - Veg Menu', category: 'Catering', price: '₹800/plate', rating: 4.8, bookings: 12, status: 'Active' },
    { id: 2, name: 'Catering - Non-Veg Menu', category: 'Catering', price: '₹1000/plate', rating: 4.7, bookings: 8, status: 'Active' },
    { id: 3, name: 'Wedding Decoration Package', category: 'Decoration', price: '₹50,000', rating: 4.9, bookings: 15, status: 'Active' },
    { id: 4, name: 'Premium DJ Services', category: 'Entertainment', price: '₹30,000', rating: 4.6, bookings: 20, status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Services</h1>
          <p className="text-gray-600">Manage your service packages and pricing</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                <Badge className="bg-blue-100 text-blue-800">{service.category}</Badge>
              </div>
              <Badge className="bg-green-200 text-green-800">{service.status}</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-2xl font-bold text-gray-900">{service.price}</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{service.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{service.bookings} bookings</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
