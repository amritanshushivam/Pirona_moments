'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trash2, Award } from 'lucide-react';

export function AdminVendorsSection() {
  const vendors = [
    {
      id: 1,
      name: 'Deluxe Catering',
      owner: 'Arjun Mehta',
      email: 'arjun@deluxe.com',
      rating: 4.8,
      bookings: 45,
      status: 'verified',
    },
    {
      id: 2,
      name: 'Elegant Decorations',
      owner: 'Meera Singh',
      email: 'meera@elegant.com',
      rating: 4.6,
      bookings: 32,
      status: 'verified',
    },
    {
      id: 3,
      name: 'Photography Pro',
      owner: 'Rohan Kapoor',
      email: 'rohan@photopro.com',
      rating: 4.9,
      bookings: 58,
      status: 'pending',
    },
    {
      id: 4,
      name: 'Music Matters',
      owner: 'Neha Sharma',
      email: 'neha@musicmatters.com',
      rating: 4.5,
      bookings: 28,
      status: 'verified',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Vendor Management</h2>
        <p className="text-slate-400">Manage service providers and verify accounts</p>
      </div>

      {/* Vendors Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{vendor.name}</CardTitle>
                    <p className="text-sm text-slate-400 mt-1">by {vendor.owner}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    vendor.status === 'verified'
                      ? 'bg-green-400/20 text-green-300'
                      : 'bg-amber-400/20 text-amber-300'
                  }`}>
                    {vendor.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                  <div>
                    <span className="text-sm">{vendor.bookings} bookings</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{vendor.email}</p>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                    onClick={() => alert('View vendor: ' + vendor.name)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:bg-red-400/20"
                    onClick={() => alert('Remove vendor: ' + vendor.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
