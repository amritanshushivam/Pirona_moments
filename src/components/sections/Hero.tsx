'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');
  const [searchTerm, setSearchTerm] = useState('');

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.15,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          quality={65}
          sizes="100vw"
        />
      )}

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      {/* Floating Decorative Elements - Hidden on Mobile */}
      <motion.div
        className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ y: [0, 20, 0], opacity: 0.15 }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="hidden md:block absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 0.15 }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white leading-tight tracking-tight"
          variants={itemVariants}
        >
          Desi Dil,
          <br />
          <span className="text-gradient">Digital Style</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-3xl font-body leading-relaxed"
          variants={itemVariants}
        >
          Your dream wedding, planned to perfection. Discover vendors, build packages with AI, and celebrate stress-free.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="w-full max-w-2xl"
          variants={itemVariants}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle search
            }}
            className="flex items-center gap-2 p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-colors group"
          >
            <Input
              type="search"
              placeholder="Search services, vendors, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/50 h-12 text-lg font-body"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 w-12 h-12 flex-shrink-0 transition-all group-hover:scale-110"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="font-body font-semibold px-8 bg-primary hover:bg-primary/90"
          >
            Explore Vendors
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-body font-semibold px-8 border-white/30 text-white hover:bg-white/10"
          >
            Try AI Planner
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
