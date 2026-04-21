'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trash2, Star } from 'lucide-react';
import Image from 'next/image';

const portfolioItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=400&h=300&fit=crop',
    category: 'Decoration',
    title: 'Elegant Mandap Setup',
    featured: true,
    isVideo: false,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'Catering',
    title: 'Wedding Feast',
    featured: true,
    isVideo: false,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516737867257-a35c67f48fa3?w=400&h=300&fit=crop',
    category: 'DJ',
    title: 'Stage Setup',
    featured: true,
    isVideo: true,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502678691888-f65485376000?w=400&h=300&fit=crop',
    category: 'Photography',
    title: 'Bride & Groom',
    featured: false,
    isVideo: true,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519414455038-b751eeb86c59?w=400&h=300&fit=crop',
    category: 'Makeup',
    title: 'Bridal Makeup',
    featured: true,
    isVideo: false,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop',
    category: 'Venue',
    title: 'Grand Ballroom',
    featured: false,
    isVideo: false,
  },
];

const categories = [
  { label: 'Decoration', icon: '🎨' },
  { label: 'Catering', icon: '🍽️' },
  { label: 'DJ', icon: '🎵' },
  { label: 'Photography', icon: '📸' },
  { label: 'Makeup', icon: '💄' },
  { label: 'Venue', icon: '🏛️' },
];

export function VendorPortfolioGallery() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-2">My Portfolio Gallery</h2>
        <p className="text-muted-foreground">Showcase your best work and event highlights</p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        <Button variant="outline" className="rounded-full">All Media</Button>
        {categories.map((cat) => (
          <Button key={cat.label} variant="outline" className="rounded-full">
            {cat.icon} {cat.label}
          </Button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {portfolioItems.map((item, index) => (
          <Card key={item.id} className="overflow-hidden group cursor-pointer">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-video bg-gray-200 overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Play Button for Videos */}
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                  </div>
                </div>
              )}

              {/* Badge Container */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <Badge className="bg-primary/90">{item.category}</Badge>
                {item.featured && (
                  <Badge className="bg-yellow-500/90 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </Badge>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-white/90">
                    {item.isVideo ? '▶ Video' : '📷 Photo'}
                  </Button>
                  <Button size="sm" variant="destructive" className="gap-1">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="p-4">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
