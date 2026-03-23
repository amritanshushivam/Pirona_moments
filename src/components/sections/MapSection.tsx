'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export function MapSection() {
  const locations = [
    { name: 'Patna', coords: 'top-1/3 left-1/3' },
    { name: 'Gaya', coords: 'top-2/3 left-1/4' },
    { name: 'Muzaffarpur', coords: 'top-1/4 left-1/2' },
    { name: 'Darbhanga', coords: 'top-1/3 right-1/4' },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Available Across Bihar
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Premium wedding services available in major cities across Bihar
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative w-full max-h-96 bg-gradient-to-br from-secondary to-secondary/50 rounded-3xl overflow-hidden shadow-premium-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Map SVG (Simplified Bihar outline) */}
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path
              d="M 80 50 L 320 50 L 350 200 L 320 350 L 80 350 L 50 200 Z"
              fill="url(#mapGrad)"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
            />
          </svg>

          {/* Location Markers */}
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              className={`absolute ${location.coords} transform -translate-x-1/2 -translate-y-1/2`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.3 }}
              viewport={{ once: true }}
            >
              {/* Pulse Effect */}
              <motion.div
                className="absolute w-8 h-8 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Marker Pin */}
              <div className="relative flex flex-col items-center">
                <MapPin className="w-6 h-6 text-primary fill-primary" />
                <motion.div
                  className="mt-2 bg-white px-3 py-2 rounded-lg shadow-premium whitespace-nowrap text-sm font-body font-semibold text-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {location.name}
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Map Label */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full font-body font-semibold text-foreground">
            🇮🇳 Bihar Map
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { icon: '📍', title: 'Multi-City Coverage', desc: 'Available in all major cities' },
            { icon: '🚀', title: 'Fast Service', desc: 'Quick vendor connections' },
            { icon: '⭐', title: 'Local Experts', desc: 'Know the regional vendors' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-premium"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-headline font-bold text-lg text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-muted-foreground font-body text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="font-body font-semibold px-8 bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => window.location.href = '/services'}
          >
            Find Vendors in Your City
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
